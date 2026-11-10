// Outil de sondage servi sur survey.immer-executive.com.
// API JSON sous /api/*, application React (dist/survey/index.html) pour tout le reste.

const RETENTION_DAYS = 60;
const SESSION_DAYS = 30;
const COOKIE = 'immer_survey';
const MAIL_FROM = 'IMMER Executive · Sondages <contact@immer-executive.com>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const ID_CHARS = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function isSurveyHost(url, env) {
    return url.hostname.startsWith('survey.') || env.SURVEY_LOCAL === '1';
}

export async function handleSurvey(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
        try {
            return await handleApi(request, env, ctx, url);
        } catch (err) {
            if (err instanceof HttpError) return json({ error: err.message }, err.status);
            console.error('Erreur API sondages', err);
            return json({ error: 'Une erreur est survenue. Réessayez dans un instant.' }, 500);
        }
    }

    // Fichiers statiques (scripts, polices, images) : servis tels quels.
    if (/\.[a-z0-9]+$/i.test(url.pathname)) {
        return env.ASSETS.fetch(request);
    }

    // Toute autre adresse affiche l'application de sondage.
    const page = new URL('/survey/', url);
    return env.ASSETS.fetch(new Request(page, request));
}

// Suppression des sondages sans action depuis 60 jours (tâche planifiée quotidienne).
export async function purgeExpired(env) {
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 86400000).toISOString();
    const old = await env.SURVEY_DB.prepare('SELECT id FROM polls WHERE last_action_at < ?').bind(cutoff).all();
    for (const { id } of old.results) await deletePoll(env, id);
    return old.results.length;
}

/* ---------------------------------------------------------------- API */

async function handleApi(request, env, ctx, url) {
    if (!env.SURVEY_DB) throw new HttpError(503, 'La base des sondages n\'est pas configurée.');
    const parts = url.pathname.replace(/\/+$/, '').split('/').slice(2); // après /api
    const method = request.method;
    const team = await isTeam(request, env);

    // Session de l'équipe
    if (parts[0] === 'session' && parts.length === 1) {
        if (method === 'GET') return json({ team });
        if (method === 'POST') return login(request, env, url);
        if (method === 'DELETE') return json({ team: false }, 200, { 'Set-Cookie': cookie('', 0, url) });
    }

    if (parts[0] !== 'polls') throw new HttpError(404, 'Adresse inconnue.');
    const [, pollId, sub, subId] = parts;

    if (!pollId) {
        if (method === 'GET') return listPolls(env, requireTeam(team));
        if (method === 'POST') return createPoll(request, env, requireTeam(team));
        throw methodNotAllowed();
    }

    if (!sub) {
        if (method === 'GET') return json(await loadPoll(env, pollId, team));
        if (method === 'DELETE') {
            requireTeam(team);
            await getPollRow(env, pollId);
            await deletePoll(env, pollId);
            return json({ success: true });
        }
        throw methodNotAllowed();
    }

    if (sub === 'close' && method === 'POST') return closePoll(request, env, pollId, requireTeam(team));
    if (sub === 'reopen' && method === 'POST') return reopenPoll(env, pollId, requireTeam(team));

    if (sub === 'responses') {
        if (!subId && method === 'POST') return saveResponse(request, env, ctx, pollId, null, team);
        if (subId && method === 'PUT') return saveResponse(request, env, ctx, pollId, subId, team);
        if (subId && method === 'DELETE') return deleteResponse(env, ctx, pollId, subId, team);
    }

    throw new HttpError(404, 'Adresse inconnue.');
}

/* ------------------------------------------------------------ Session */

async function login(request, env, url) {
    if (!env.SURVEY_PASSWORD) throw new HttpError(503, 'Le mot de passe de l\'équipe n\'est pas configuré.');
    const body = await readJson(request);
    const given = String(body.password || '');
    // Petit délai constant pour freiner les essais en série.
    await new Promise(r => setTimeout(r, 400));
    if (!(await safeEqual(given, env.SURVEY_PASSWORD))) {
        throw new HttpError(401, 'Mot de passe incorrect.');
    }
    const exp = Date.now() + SESSION_DAYS * 86400000;
    const token = `${exp}.${await sign(String(exp), env)}`;
    return json({ team: true }, 200, { 'Set-Cookie': cookie(token, SESSION_DAYS * 86400, url) });
}

async function isTeam(request, env) {
    if (!env.SURVEY_PASSWORD) return false;
    const raw = (request.headers.get('Cookie') || '').split(/;\s*/).find(c => c.startsWith(COOKIE + '='));
    if (!raw) return false;
    const [exp, sig] = raw.slice(COOKIE.length + 1).split('.');
    if (!exp || !sig || Number(exp) < Date.now()) return false;
    return safeEqual(sig, await sign(exp, env));
}

function requireTeam(team) {
    if (!team) throw new HttpError(401, 'Connectez-vous à l\'espace équipe.');
    return team;
}

function cookie(value, maxAge, url) {
    const secure = url.protocol === 'https:' ? '; Secure' : '';
    return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

// La clé de signature dérive du mot de passe : le changer ferme toutes les sessions.
async function sign(data, env) {
    const key = await crypto.subtle.importKey(
        'raw', new TextEncoder().encode('immer-survey-session:' + env.SURVEY_PASSWORD),
        { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
    );
    const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
    return btoa(String.fromCharCode(...new Uint8Array(mac))).replace(/[+/=]/g, c => ({ '+': '-', '/': '_', '=': '' }[c]));
}

async function safeEqual(a, b) {
    const enc = new TextEncoder();
    const [ha, hb] = await Promise.all([crypto.subtle.digest('SHA-256', enc.encode(a)), crypto.subtle.digest('SHA-256', enc.encode(b))]);
    const x = new Uint8Array(ha), y = new Uint8Array(hb);
    let diff = 0;
    for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
    return diff === 0;
}

/* ------------------------------------------------------------ Sondages */

async function listPolls(env) {
    await purgeExpired(env);
    const { results } = await env.SURVEY_DB.prepare(`
        SELECT p.*, (SELECT COUNT(*) FROM poll_responses r WHERE r.poll_id = p.id) AS response_count
        FROM polls p ORDER BY p.last_action_at DESC
    `).all();
    const closedIds = results.map(p => p.closed_option).filter(Boolean);
    const closedOptions = {};
    if (closedIds.length) {
        const rows = await env.SURVEY_DB.prepare(
            `SELECT * FROM poll_options WHERE id IN (${closedIds.map(() => '?').join(',')})`,
        ).bind(...closedIds).all();
        for (const o of rows.results) closedOptions[o.id] = publicOption(o);
    }
    const durations = await env.SURVEY_DB.prepare(
        'SELECT poll_id, kind, start_min, end_min FROM poll_options',
    ).all();
    const byPoll = {};
    for (const o of durations.results) (byPoll[o.poll_id] ||= []).push(o);

    return json({
        retentionDays: RETENTION_DAYS,
        polls: results.map(p => ({
            id: p.id,
            type: p.type,
            title: p.title,
            organizerName: p.organizer_name,
            allowMaybe: !!p.allow_maybe,
            limit: p.slot_limit,
            responseCount: p.response_count,
            createdAt: p.created_at,
            lastActionAt: p.last_action_at,
            duration: commonDuration(byPoll[p.id] || []),
            closedOption: p.closed_option ? closedOptions[p.closed_option] || null : null,
        })),
    });
}

async function createPoll(request, env) {
    const b = await readJson(request);
    const type = b.type === 'choix' ? 'choix' : 'reunion';
    const title = text(b.title, 200);
    const place = type === 'reunion' ? text(b.place, 200) : '';
    const organizerName = text(b.organizerName, 100);
    const organizerEmail = text(b.organizerEmail, 200);
    const limit = b.limit == null || b.limit === '' ? null : Math.floor(Number(b.limit));
    const allowMaybe = !!b.allowMaybe && limit !== 1;

    if (!title) throw new HttpError(400, 'Indiquez un titre.');
    if (!organizerName) throw new HttpError(400, 'Indiquez votre nom.');
    if (!EMAIL_RE.test(organizerEmail)) throw new HttpError(400, 'Indiquez un email valide pour recevoir les réponses.');
    if (limit !== null && (!Number.isFinite(limit) || limit < 1 || limit > 500)) throw new HttpError(400, 'Le nombre de participants par créneau doit être compris entre 1 et 500.');

    const raw = Array.isArray(b.options) ? b.options : [];
    const options = [];
    const seen = new Set();
    for (const o of raw) {
        let opt;
        if (type === 'choix') {
            const label = text(o.label, 120);
            if (!label) continue;
            opt = { kind: 'text', day: null, start_min: null, end_min: null, label };
        } else if (o.kind === 'day') {
            if (!DAY_RE.test(o.day || '')) throw new HttpError(400, 'Date de créneau invalide.');
            opt = { kind: 'day', day: o.day, start_min: null, end_min: null, label: null };
        } else {
            const start = Math.floor(Number(o.start)), end = Math.floor(Number(o.end));
            if (!DAY_RE.test(o.day || '') || !(start >= 0 && end <= 1440 && end > start)) throw new HttpError(400, 'Horaires de créneau invalides.');
            opt = { kind: 'time', day: o.day, start_min: start, end_min: end, label: null };
        }
        const key = [opt.kind, opt.day, opt.start_min, opt.end_min, opt.label].join('|');
        if (seen.has(key)) continue;
        seen.add(key);
        options.push(opt);
    }
    if (options.length < 2) throw new HttpError(400, type === 'choix' ? 'Proposez au moins deux options.' : 'Proposez au moins deux créneaux.');
    if (options.length > 80) throw new HttpError(400, 'Un sondage est limité à 80 créneaux.');

    if (type === 'reunion') {
        // Par jour, la journée entière d'abord, puis par heure de début.
        const rank = o => (o.kind === 'day' ? -1 : o.start_min);
        options.sort((a, c) => a.day.localeCompare(c.day) || rank(a) - rank(c));
    }

    const id = randomId(10);
    const now = new Date().toISOString();
    const stmts = [
        env.SURVEY_DB.prepare(`INSERT INTO polls (id, type, title, place, organizer_name, organizer_email, allow_maybe, slot_limit, created_at, last_action_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(id, type, title, place, organizerName, organizerEmail, allowMaybe ? 1 : 0, limit, now, now),
        ...options.map((o, i) => env.SURVEY_DB.prepare(`INSERT INTO poll_options (id, poll_id, position, kind, day, start_min, end_min, label)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(randomId(12), id, i, o.kind, o.day, o.start_min, o.end_min, o.label)),
    ];
    await env.SURVEY_DB.batch(stmts);
    return json({ id }, 201);
}

async function closePoll(request, env, pollId) {
    await getPollRow(env, pollId);
    const { optionId } = await readJson(request);
    const opt = await env.SURVEY_DB.prepare('SELECT id FROM poll_options WHERE id = ? AND poll_id = ?').bind(String(optionId || ''), pollId).first();
    if (!opt) throw new HttpError(400, 'Choisissez le créneau retenu.');
    await env.SURVEY_DB.prepare('UPDATE polls SET closed_option = ?, last_action_at = ? WHERE id = ?').bind(opt.id, new Date().toISOString(), pollId).run();
    return json(await loadPoll(env, pollId, true));
}

async function reopenPoll(env, pollId) {
    await getPollRow(env, pollId);
    await env.SURVEY_DB.prepare('UPDATE polls SET closed_option = NULL, last_action_at = ? WHERE id = ?').bind(new Date().toISOString(), pollId).run();
    return json(await loadPoll(env, pollId, true));
}

async function deletePoll(env, id) {
    await env.SURVEY_DB.batch([
        env.SURVEY_DB.prepare('DELETE FROM poll_responses WHERE poll_id = ?').bind(id),
        env.SURVEY_DB.prepare('DELETE FROM poll_options WHERE poll_id = ?').bind(id),
        env.SURVEY_DB.prepare('DELETE FROM polls WHERE id = ?').bind(id),
    ]);
}

async function getPollRow(env, id) {
    const poll = await env.SURVEY_DB.prepare('SELECT * FROM polls WHERE id = ?').bind(String(id)).first();
    if (!poll || expired(poll)) throw new HttpError(404, 'Ce sondage n\'existe pas ou a été supprimé.');
    return poll;
}

async function loadPoll(env, id, team) {
    const poll = await getPollRow(env, id);
    const [opts, resp] = await env.SURVEY_DB.batch([
        env.SURVEY_DB.prepare('SELECT * FROM poll_options WHERE poll_id = ? ORDER BY position').bind(id),
        env.SURVEY_DB.prepare('SELECT * FROM poll_responses WHERE poll_id = ? ORDER BY created_at, id').bind(id),
    ]);
    return {
        team,
        retentionDays: RETENTION_DAYS,
        poll: {
            id: poll.id,
            type: poll.type,
            title: poll.title,
            place: poll.place,
            organizerName: poll.organizer_name,
            ...(team ? { organizerEmail: poll.organizer_email } : {}),
            allowMaybe: !!poll.allow_maybe,
            limit: poll.slot_limit,
            closedOptionId: poll.closed_option,
            createdAt: poll.created_at,
            lastActionAt: poll.last_action_at,
            duration: commonDuration(opts.results),
            options: opts.results.map(publicOption),
            responses: resp.results.map(r => ({ id: r.id, name: r.name, votes: parseVotes(r.votes), updatedAt: r.updated_at })),
        },
    };
}

/* ------------------------------------------------------------ Réponses */

async function saveResponse(request, env, ctx, pollId, responseId, team) {
    const poll = await getPollRow(env, pollId);
    if (poll.closed_option) throw new HttpError(409, 'Ce sondage est clôturé : les réponses ne peuvent plus être modifiées.');
    const b = await readJson(request);
    const name = text(b.name, 100);
    if (!name) throw new HttpError(400, 'Indiquez votre nom.');

    const [opts, resp] = await env.SURVEY_DB.batch([
        env.SURVEY_DB.prepare('SELECT * FROM poll_options WHERE poll_id = ? ORDER BY position').bind(pollId),
        env.SURVEY_DB.prepare('SELECT * FROM poll_responses WHERE poll_id = ?').bind(pollId),
    ]);
    const existing = responseId ? resp.results.find(r => r.id === responseId) : null;
    if (responseId && !existing) throw new HttpError(404, 'Cette réponse a été supprimée entre-temps.');

    const votes = {};
    const given = b.votes && typeof b.votes === 'object' ? b.votes : {};
    for (const o of opts.results) {
        const v = given[o.id];
        if (v === 'y' || (v === 'm' && poll.allow_maybe)) votes[o.id] = v;
    }

    // Plafond par créneau : seuls les « oui » sont comptés.
    if (poll.slot_limit) {
        const others = resp.results.filter(r => r.id !== responseId).map(r => parseVotes(r.votes));
        const previous = existing ? parseVotes(existing.votes) : {};
        for (const o of opts.results) {
            if (votes[o.id] !== 'y' || previous[o.id] === 'y') continue;
            const taken = others.filter(v => v[o.id] === 'y').length;
            if (taken >= poll.slot_limit) {
                throw new HttpError(409, `Le créneau ${optionText(publicOption(o))} est complet. Choisissez-en un autre.`);
            }
        }
    }

    const now = new Date().toISOString();
    const id = responseId || randomId(12);
    const write = responseId
        ? env.SURVEY_DB.prepare('UPDATE poll_responses SET name = ?, votes = ?, updated_at = ? WHERE id = ? AND poll_id = ?').bind(name, JSON.stringify(votes), now, id, pollId)
        : env.SURVEY_DB.prepare('INSERT INTO poll_responses (id, poll_id, name, votes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)').bind(id, pollId, name, JSON.stringify(votes), now, now);
    await env.SURVEY_DB.batch([write, touch(env, pollId, now)]);

    const data = await loadPoll(env, pollId, team);
    ctx.waitUntil(notify(env, poll, data.poll, responseId ? 'update' : 'new', { name, previousName: existing?.name, votes }));
    return json(data, responseId ? 200 : 201);
}

async function deleteResponse(env, ctx, pollId, responseId, team) {
    const poll = await getPollRow(env, pollId);
    if (poll.closed_option) throw new HttpError(409, 'Ce sondage est clôturé : les réponses ne peuvent plus être modifiées.');
    const row = await env.SURVEY_DB.prepare('SELECT name FROM poll_responses WHERE id = ? AND poll_id = ?').bind(responseId, pollId).first();
    if (!row) throw new HttpError(404, 'Cette réponse a déjà été supprimée.');
    const now = new Date().toISOString();
    await env.SURVEY_DB.batch([
        env.SURVEY_DB.prepare('DELETE FROM poll_responses WHERE id = ? AND poll_id = ?').bind(responseId, pollId),
        touch(env, pollId, now),
    ]);
    const data = await loadPoll(env, pollId, team);
    ctx.waitUntil(notify(env, poll, data.poll, 'delete', { name: row.name }));
    return json(data);
}

function touch(env, pollId, now) {
    return env.SURVEY_DB.prepare('UPDATE polls SET last_action_at = ? WHERE id = ?').bind(now, pollId);
}

/* ------------------------------------------------------- Notifications */

async function notify(env, row, poll, kind, { name, previousName, votes }) {
    if (!env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY absente : notification non envoyée.');
        return;
    }
    const link = `https://survey.immer-executive.com/s/${poll.id}`;
    const heads = {
        new: ['Nouvelle réponse', `${name} a répondu à votre sondage`],
        update: ['Réponse modifiée', previousName && previousName !== name ? `La réponse de ${previousName} a été modifiée (désormais au nom de ${name})` : `La réponse de ${name} a été modifiée`],
        delete: ['Réponse supprimée', `La réponse de ${name} a été supprimée`],
    }[kind];
    const word = { y: 'oui', m: 'si nécessaire' };
    const lines = kind === 'delete' ? [] : poll.options.map(o => `${optionText(o)} : ${word[votes[o.id]] || 'non'}`);
    const n = poll.responses.length;

    const best = bestOption(poll);
    const summary = `Le sondage compte désormais ${n} réponse${n > 1 ? 's' : ''}.` +
        (best ? ` ${poll.type === 'reunion' ? 'Le créneau' : 'L\'option'} le plus favorable à ce stade : ${optionText(best.option)} (${best.y} oui${poll.allowMaybe ? `, ${best.m} si nécessaire` : ''}).` : '');

    const text = [heads[1] + '.', '', ...(lines.length ? ['Disponibilités indiquées :', ...lines.map(l => '· ' + l), ''] : []), summary, '', link].join('\n');
    const html = `
<div style="font-family:Lato,Helvetica,Arial,sans-serif;color:#0F1A2E;max-width:560px;line-height:1.6">
  <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5F6573;font-weight:bold;margin:0 0 8px">${esc(heads[0])}</p>
  <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;color:#1A3870;font-size:26px;line-height:1.2;margin:0">${esc(heads[1])}</h1>
  <p style="margin:6px 0 0;color:#5F6573">${esc(poll.title)}</p>
  <div style="width:32px;border-top:1px solid #1A3870;margin:16px 0"></div>
  ${lines.length ? `<p style="margin:0 0 6px">Disponibilités indiquées :</p><ul style="margin:0 0 16px;padding-left:18px">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}
  <p style="margin:0 0 20px">${esc(summary)}</p>
  <p style="margin:0 0 28px"><a href="${link}" style="display:inline-block;background:#1A3870;color:#fff;text-decoration:none;padding:10px 18px;border-radius:2px">Voir le sondage</a></p>
  <p style="font-size:10px;letter-spacing:.12em;color:#5F6573;border-top:1px solid #D9E3EF;padding-top:12px;margin:0">IMMER EXECUTIVE · 66 AVENUE DES CHAMPS-ÉLYSÉES · 75008 PARIS · IMMER-EXECUTIVE.COM</p>
</div>`;

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: MAIL_FROM, to: row.organizer_email, subject: `${heads[0]} · ${poll.title}`, text, html }),
    });
    if (!res.ok) console.error('Erreur Resend (sondage)', res.status, await res.text());
}

function bestOption(poll) {
    let best = null;
    for (const option of poll.options) {
        const y = poll.responses.filter(r => r.votes[option.id] === 'y').length;
        const m = poll.responses.filter(r => r.votes[option.id] === 'm').length;
        const score = y * 2 + m;
        if (score > 0 && (!best || score > best.score)) best = { option, y, m, score };
    }
    return best;
}

/* ---------------------------------------------------------------- Outils */

const DAYS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

function publicOption(o) {
    if (o.kind === 'text') return { id: o.id, kind: 'text', label: o.label };
    return { id: o.id, kind: o.kind, day: o.day, start: o.start_min, end: o.end_min };
}

function optionText(o) {
    if (o.kind === 'text') return o.label;
    const [y, m, d] = o.day.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    const head = `${DAYS[date.getUTCDay()]} ${d} ${MONTHS[m - 1]}`;
    return o.kind === 'day' ? `${head}, journée` : `${head}, ${hour(o.start)} – ${hour(o.end)}`;
}

function hour(min) {
    const h = Math.floor(min / 60), m = min % 60;
    return `${h} h${m ? ' ' + String(m).padStart(2, '0') : ''}`;
}

// Durée affichée : celle des créneaux horaires quand ils ont tous la même.
function commonDuration(options) {
    const lengths = new Set(options.filter(o => o.kind === 'time').map(o => o.end_min - o.start_min));
    if (lengths.size !== 1 || options.some(o => o.kind === 'day')) return null;
    const [len] = lengths;
    return len;
}

function expired(poll) {
    return Date.parse(poll.last_action_at) < Date.now() - RETENTION_DAYS * 86400000;
}

function parseVotes(raw) {
    try { return JSON.parse(raw) || {}; } catch { return {}; }
}

function text(value, max) {
    return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function randomId(length) {
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, b => ID_CHARS[b % ID_CHARS.length]).join('');
}

async function readJson(request) {
    try {
        return await request.json();
    } catch {
        throw new HttpError(400, 'Requête invalide.');
    }
}

function esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c]));
}

function methodNotAllowed() {
    return new HttpError(405, 'Méthode non autorisée.');
}

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

function json(data, status = 200, headers = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
    });
}
