import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { dayKey, pollUrl } from '../format.js';
import { copyText } from './copy.js';
import WeekCalendar from './WeekCalendar.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ORGANIZER_KEY = 'immer-survey-organizer';

function rememberedOrganizer() {
    try {
        return JSON.parse(localStorage.getItem(ORGANIZER_KEY)) || {};
    } catch {
        return {};
    }
}

function blank() {
    const who = rememberedOrganizer();
    return {
        type: 'reunion', title: '', place: '', description: '', organizerName: who.name || '', organizerEmail: who.email || '',
        allowMaybe: true, limitOn: false, limit: 1, slots: [], labels: ['', ''],
    };
}

export default function CreatePoll({ from, navigate, notify }) {
    const [f, setF] = useState(blank);
    const [loading, setLoading] = useState(!!from);
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [created, setCreated] = useState(null);

    useEffect(() => {
        if (!from) return;
        api.getPoll(from).then(({ poll }) => {
            setF(cur => ({
                ...cur,
                type: poll.type,
                title: `${poll.title} (copie)`,
                place: poll.place,
                description: poll.description || '',
                allowMaybe: poll.allowMaybe,
                limitOn: !!poll.limit,
                limit: poll.limit || 1,
                slots: poll.type !== 'choix' ? poll.options.map(({ kind, day, start, end }) => (kind === 'day' ? { kind, day } : { kind, day, start, end })) : [],
                labels: poll.type === 'choix' ? poll.options.map(o => o.label) : ['', ''],
            }));
        }).catch(err => setError(err.message)).finally(() => setLoading(false));
    }, [from]);

    const set = (patch) => setF(cur => ({ ...cur, ...patch }));
    const maybeLocked = f.limitOn && Number(f.limit) === 1;
    const interview = f.type === 'entretien';
    const usesSlots = f.type !== 'choix';

    const submit = async () => {
        const today = dayKey(new Date());
        const options = usesSlots ? f.slots : f.labels.map(l => l.trim()).filter(Boolean).map(label => ({ label }));
        const msg = !f.title.trim() ? 'Indiquez un titre.'
            : !f.organizerName.trim() ? 'Indiquez votre nom.'
                : !EMAIL_RE.test(f.organizerEmail.trim()) ? 'Indiquez votre email pour recevoir les réponses.'
                    : options.length < (interview ? 1 : 2) ? (interview ? 'Proposez au moins un créneau.' : `Proposez au moins deux ${usesSlots ? 'créneaux' : 'options'}.`)
                        : usesSlots && f.slots.some(s => s.day < today) ? 'Retirez les créneaux passés.'
                            : '';
        if (msg) return setError(msg);
        setError('');
        setBusy(true);
        try {
            const { id } = await api.createPoll({
                type: f.type,
                title: f.title,
                place: f.place,
                description: interview ? f.description : '',
                organizerName: f.organizerName,
                organizerEmail: f.organizerEmail.trim(),
                allowMaybe: f.allowMaybe && !maybeLocked,
                limit: f.limitOn ? Number(f.limit) : null,
                options,
            });
            try {
                localStorage.setItem(ORGANIZER_KEY, JSON.stringify({ name: f.organizerName.trim(), email: f.organizerEmail.trim() }));
            } catch { /* stockage indisponible */ }
            setCreated(id);
            window.scrollTo(0, 0);
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    const go = (path) => (e) => {
        e.preventDefault();
        navigate(path);
    };

    if (created) {
        const url = pollUrl(created);
        return (
            <>
                <div className="head"><div><p className="libelle">Sondage créé</p><h1 style={{ marginTop: 8 }}>{f.title}</h1><div className="filet" /></div></div>
                <div className="done">
                    <p>{interview
                        ? 'Transmettez ce lien aux candidats. Il est le même pour tous : chacun ne voit que les créneaux encore libres et réserve le sien.'
                        : 'Transmettez ce lien aux participants. Il est le même pour tous : chacun saisit son nom et indique ses réponses.'}</p>
                    <div className="copyline">
                        <code>{url}</code>
                        <button type="button" className="btn" onClick={async () => notify((await copyText(url)) ? 'Lien copié' : 'Sélectionnez le lien pour le copier')}>Copier le lien</button>
                    </div>
                    <p className="hint">{interview ? 'Chaque réservation' : 'Chaque réponse'} vous sera notifiée à {f.organizerEmail}.</p>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                        <a className="btn ghost small" href={`/s/${created}`} onClick={go(`/s/${created}`)}>Ouvrir le sondage</a>
                        <a className="link" href="/" onClick={go('/')}>Revenir à la liste</a>
                    </div>
                </div>
            </>
        );
    }

    if (loading) return <p className="muted">Préparation de la copie…</p>;

    return (
        <>
            <div className="head">
                <div>
                    <p className="libelle">{from ? 'Copie d’un sondage' : 'Nouveau sondage'}</p>
                    <h1 style={{ marginTop: 8 }}>Créer un sondage</h1>
                    <div className="filet" />
                </div>
            </div>
            <div className="create">
                <div className="col">
                    <div className="field">
                        <span className="lbl">Objet du sondage</span>
                        <div className="seg seg3" role="group" aria-label="Objet du sondage">
                            <button type="button" aria-pressed={f.type === 'reunion'} onClick={() => set({ type: 'reunion' })}>Réunion à planifier</button>
                            <button type="button" aria-pressed={f.type === 'choix'} onClick={() => set({ type: 'choix' })}>Choix à faire</button>
                            <button type="button" aria-pressed={interview} onClick={() => set({ type: 'entretien' })}>Entretien candidat</button>
                        </div>
                        {interview && <span className="hint">Chaque créneau est réservé par un seul candidat. Les candidats ne voient ni les autres candidats, ni les créneaux déjà pris.</span>}
                    </div>
                    <div className="field">
                        <label htmlFor="f-title">Titre</label>
                        <input id="f-title" type="text" maxLength={200} value={f.title} onChange={e => set({ title: e.target.value })}
                            placeholder={interview ? 'Entretiens finalistes · Directeur administratif et financier' : f.type === 'reunion' ? 'Comité de sélection · Directeur commercial France' : 'Lieu du séminaire de direction'} />
                    </div>
                    {usesSlots && (
                        <div className="field">
                            <label htmlFor="f-place">Lieu</label>
                            <input id="f-place" type="text" maxLength={200} value={f.place} onChange={e => set({ place: e.target.value })} placeholder="66 avenue des Champs-Élysées, Paris 8e" />
                        </div>
                    )}
                    {interview && (
                        <div className="field">
                            <label htmlFor="f-desc">Description</label>
                            <textarea id="f-desc" maxLength={2000} rows={5} value={f.description} onChange={e => set({ description: e.target.value })}
                                placeholder="Personnes rencontrées, déroulé, consignes d’accueil…" />
                            <span className="hint">Affichée aux candidats au-dessus des créneaux et reprise dans leur email de confirmation.</span>
                        </div>
                    )}
                    <div className="field">
                        <label htmlFor="f-name">Votre nom</label>
                        <input id="f-name" type="text" maxLength={100} value={f.organizerName} onChange={e => set({ organizerName: e.target.value })} autoComplete="name" />
                        <span className="hint">Affiché aux participants comme organisateur.</span>
                    </div>
                    <div className="field">
                        <label htmlFor="f-email">Votre email</label>
                        <input id="f-email" type="email" maxLength={200} value={f.organizerEmail} onChange={e => set({ organizerEmail: e.target.value })} placeholder="prenom.nom@immer-executive.com" autoComplete="email" />
                        <span className="hint">{interview ? 'Vous recevrez un email à chaque réservation.' : 'Vous recevrez un email à chaque nouvelle réponse, modification ou suppression.'}</span>
                    </div>
                    {!interview && <div className="field">
                        <span className="lbl">Réponses</span>
                        <label className="check">
                            <input type="checkbox" checked={f.limitOn} onChange={e => set({ limitOn: e.target.checked })} />
                            <span>Limiter le nombre de participants par {f.type === 'reunion' ? 'créneau' : 'option'}</span>
                        </label>
                        {f.limitOn && (
                            <div className="inline">
                                <input id="f-limit" type="number" min={1} max={500} value={f.limit} aria-label="Nombre maximum de oui"
                                    onChange={e => set({ limit: Math.max(1, Math.floor(Number(e.target.value)) || 1) })} />
                                <span className="hint">« oui » maximum</span>
                            </div>
                        )}
                        <label className={`check ${maybeLocked ? 'off' : ''}`}>
                            <input type="checkbox" checked={f.allowMaybe && !maybeLocked} disabled={maybeLocked} onChange={e => set({ allowMaybe: e.target.checked })} />
                            <span>Autoriser la réponse « si nécessaire »</span>
                        </label>
                        {maybeLocked && <div className="box">Avec un seul participant par {f.type === 'reunion' ? 'créneau' : 'option'}, la réponse « si nécessaire » n’est pas proposée.</div>}
                    </div>}
                </div>

                <div className="col">
                    {usesSlots ? (
                        <WeekCalendar slots={f.slots} onChange={slots => set({ slots })} />
                    ) : (
                        <div className="field">
                            <span className="lbl">Options proposées</span>
                            <div className="options">
                                {f.labels.map((label, i) => (
                                    <div className="row" key={i}>
                                        <input type="text" maxLength={120} value={label} placeholder={`Option ${i + 1}`} aria-label={`Option ${i + 1}`}
                                            onChange={e => set({ labels: f.labels.map((l, k) => (k === i ? e.target.value : l)) })} />
                                        <button type="button" className="btn ghost small" aria-label={`Retirer l’option ${i + 1}`}
                                            onClick={() => set({ labels: f.labels.filter((_, k) => k !== i) })}>×</button>
                                    </div>
                                ))}
                            </div>
                            <div><button type="button" className="link" onClick={() => set({ labels: [...f.labels, ''] })}>Ajouter une option</button></div>
                        </div>
                    )}
                    {error && <p className="error" role="alert">{error}</p>}
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <button type="button" className="btn" onClick={submit} disabled={busy}>{busy ? 'Création…' : 'Créer le sondage'}</button>
                        <a className="btn ghost" href="/" onClick={go('/')}>Annuler</a>
                    </div>
                </div>
            </div>
        </>
    );
}
