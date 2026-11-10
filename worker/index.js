// Worker du site : traite le formulaire de contact (/api/contact),
// sert l'outil de sondage sur survey.immer-executive.com
// et laisse les fichiers statiques du site à la configuration [assets].

import { handleSurvey, isSurveyHost, purgeExpired } from './survey.js';

const CONTACT_TO = 'contact@immer-executive.com';
const CONTACT_FROM = 'Site Immer Executive <contact@immer-executive.com>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (isSurveyHost(url, env)) {
            return handleSurvey(request, env, ctx);
        }

        // L'application de sondage ne s'ouvre que sur son sous-domaine.
        if (url.pathname === '/survey' || url.pathname.startsWith('/survey/')) {
            return Response.redirect('https://survey.immer-executive.com/', 302);
        }

        if (url.pathname === '/api/contact') {
            if (request.method !== 'POST') {
                return json({ error: 'Méthode non autorisée.' }, 405, { Allow: 'POST' });
            }
            return handleContact(request, env);
        }

        return env.ASSETS.fetch(request);
    },

    // Tâche quotidienne : suppression des sondages inactifs depuis 60 jours.
    async scheduled(event, env, ctx) {
        if (env.SURVEY_DB) ctx.waitUntil(purgeExpired(env));
    },
};

async function handleContact(request, env) {
    let payload;
    try {
        payload = await request.json();
    } catch {
        return json({ error: 'Requête invalide.' }, 400);
    }

    const name = String(payload.name || '').trim().slice(0, 200);
    const email = String(payload.email || '').trim().slice(0, 200);
    const message = String(payload.message || '').trim().slice(0, 5000);

    // Champ piège invisible : rempli seulement par les robots.
    if (payload.website) {
        return json({ success: true });
    }
    if (!name || !email || !message) {
        return json({ error: 'Merci de remplir tous les champs.' }, 400);
    }
    if (!EMAIL_RE.test(email)) {
        return json({ error: 'Adresse email invalide.' }, 400);
    }
    if (!env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY absente : envoi impossible.');
        return json({ error: 'L\'envoi est momentanément indisponible. Écrivez-nous à contact@immer-executive.com.' }, 503);
    }

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: CONTACT_FROM,
            to: CONTACT_TO,
            reply_to: email,
            subject: `Demande de contact · ${name}`,
            text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
            html: `
                <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
                <p><strong>Email :</strong> ${escapeHtml(email)}</p>
                <p><strong>Message :</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
            `,
        }),
    });

    if (!res.ok) {
        console.error('Erreur Resend', res.status, await res.text());
        return json({ error: 'L\'envoi a échoué. Écrivez-nous à contact@immer-executive.com.' }, 502);
    }

    return json({ success: true });
}

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function json(data, status = 200, headers = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', ...headers },
    });
}
