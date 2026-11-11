import { useState } from 'react';
import { api } from '../api.js';
import { dayKey, dayLong, duration, fromTimeInput, optionLong, optionShort, pollUrl, sinceLabel, slotRange, toTimeInput } from '../format.js';
import { copyText } from './copy.js';

// Sondage « Entretien candidat » : page de réservation (candidats) et gestion des créneaux (équipe).

function Header({ poll, label }) {
    return (
        <div className="head" style={{ marginBottom: 20 }}>
            <div>
                <p className="libelle">{label}</p>
                <h1 style={{ marginTop: 8 }}>{poll.title}</h1>
                <div className="filet" />
                <div className="poll-meta">
                    {poll.place && <span><b>Lieu</b> · {poll.place}</span>}
                    {poll.duration && <span><b>Durée</b> · {duration(poll.duration)}</span>}
                    <span><b>Organisé par</b> · {poll.organizerName}, Immer Executive</span>
                </div>
            </div>
        </div>
    );
}

export default function InterviewPage({ poll, setPoll, team, navigate, notify }) {
    const [preview, setPreview] = useState(false);
    const refresh = () => api.getPoll(poll.id).then(({ poll: p }) => setPoll(p)).catch(() => {});

    if (!team) return <Booking poll={poll} refresh={refresh} />;

    // Aperçu de la page candidat depuis l'espace équipe : mêmes règles que côté candidat.
    const today = dayKey(new Date());
    const candidateView = {
        ...poll,
        options: poll.closed ? [] : poll.options.filter(o => !o.booking && o.day >= today).map(({ booking: _booking, ...o }) => o),
    };

    return (
        <>
            <div className="chips" role="group" aria-label="Affichage" style={{ marginBottom: 22 }}>
                <button type="button" className="chip" aria-pressed={!preview} onClick={() => setPreview(false)}>Vue équipe</button>
                <button type="button" className="chip" aria-pressed={preview} onClick={() => setPreview(true)}>Aperçu de la page candidat</button>
            </div>
            {preview
                ? <Booking key="preview" poll={candidateView} refresh={refresh} />
                : <TeamView poll={poll} setPoll={setPoll} navigate={navigate} notify={notify} />}
        </>
    );
}

/* ------------------------------------------------------------ Candidat */

function Booking({ poll, refresh }) {
    const [chosen, setChosen] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [done, setDone] = useState(null);

    if (done) return <Confirmation poll={poll} done={done} />;

    const options = poll.options;
    if (!options.length) {
        return (
            <>
                <Header poll={poll} label="Entretien candidat" />
                <div className="notice" style={{ paddingBlock: 8 }}>
                    <h2>Plus de créneaux disponibles. Contactez le cabinet.</h2>
                    <div className="filet" />
                    <p className="muted">{poll.organizerName}, Immer Executive</p>
                </div>
            </>
        );
    }

    const byDay = [];
    for (const o of options) {
        const last = byDay[byDay.length - 1];
        if (last && last.day === o.day) last.items.push(o); else byDay.push({ day: o.day, items: [o] });
    }
    const selected = options.find(o => o.id === chosen);
    const set = patch => setForm(cur => ({ ...cur, ...patch }));

    const submit = async (e) => {
        e.preventDefault();
        if (!selected) return setError('Choisissez un créneau.');
        setBusy(true);
        setError('');
        try {
            const res = await api.book(poll.id, { optionId: selected.id, ...form });
            setDone({ ...res.booking, ics: res.ics });
            refresh();
            window.scrollTo(0, 0);
        } catch (err) {
            setError(err.message);
            if (err.status === 409) {
                setChosen(null);
                refresh();
            }
        } finally {
            setBusy(false);
        }
    };

    return (
        <>
            <Header poll={poll} label="Entretien candidat" />
            {poll.description && <p className="desc">{poll.description}</p>}
            <div className="book">
                <div className="days">
                    <p className="libelle">Choisissez votre créneau</p>
                    {byDay.map(group => (
                        <div className="day" key={group.day}>
                            <h3>{dayLong(group.day)}</h3>
                            <div className="picks">
                                {group.items.map(o => (
                                    <button key={o.id} type="button" className="pick" aria-pressed={o.id === chosen} onClick={() => { setChosen(o.id); setError(''); }}>
                                        {slotRange(o)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <form className="side" onSubmit={submit}>
                    <p className="libelle">Votre réservation</p>
                    <p className="chosen-slot">{selected ? optionLong(selected) : <span className="muted" style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>Aucun créneau choisi</span>}</p>
                    <div className="field">
                        <label htmlFor="b-name">Nom et prénom</label>
                        <input id="b-name" type="text" maxLength={100} autoComplete="name" required value={form.name} onChange={e => set({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label htmlFor="b-email">Email</label>
                        <input id="b-email" type="email" maxLength={200} autoComplete="email" required value={form.email} onChange={e => set({ email: e.target.value })} />
                    </div>
                    <div className="field">
                        <label htmlFor="b-phone">Téléphone</label>
                        <input id="b-phone" type="tel" maxLength={40} autoComplete="tel" required value={form.phone} onChange={e => set({ phone: e.target.value })} />
                    </div>
                    {error && <p className="error" role="alert">{error}</p>}
                    <div><button className="btn" type="submit" disabled={busy}>{busy ? 'Réservation…' : 'Valider ce créneau'}</button></div>
                    <p className="hint">Une fois validé, le créneau ne peut plus être modifié de votre côté. Pour tout changement, contactez le cabinet.</p>
                </form>
            </div>
        </>
    );
}

function downloadIcs(content) {
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'entretien.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Confirmation({ poll, done }) {
    return (
        <>
            <Header poll={poll} label="Entretien candidat" />
            <div className="confirm-box">
                <p className="libelle">Créneau confirmé</p>
                <p className="when">{optionLong(done.option)}</p>
                <dl className="kv">
                    {poll.place && <><dt>Lieu</dt><dd>{poll.place}</dd></>}
                    <dt>Nom</dt><dd>{done.name}</dd>
                    <dt>Email</dt><dd>{done.email}</dd>
                    <dt>Téléphone</dt><dd>{done.phone}</dd>
                </dl>
                <p>Un email de confirmation vous a été envoyé à {done.email}.</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button type="button" className="btn" onClick={() => downloadIcs(done.ics)}>Ajouter à mon agenda (.ics)</button>
                    <span className="hint">Fichier compatible Outlook, Google Agenda et Apple Calendrier.</span>
                </div>
                <p className="hint">Pour toute modification, contactez le cabinet : {poll.organizerName}, Immer Executive.</p>
            </div>
        </>
    );
}

/* ------------------------------------------------------------ Équipe */

function SlotEditor({ initial, onSave, onCancel, booked, busy }) {
    const [day, setDay] = useState(initial.day || dayKey(new Date()));
    const [allDay, setAllDay] = useState(initial.kind === 'day');
    const [start, setStart] = useState(toTimeInput(initial.start ?? 600));
    const [end, setEnd] = useState(toTimeInput(initial.end ?? 660));
    const save = () => onSave(allDay ? { kind: 'day', day } : { kind: 'time', day, start: fromTimeInput(start), end: fromTimeInput(end) });
    return (
        <div className="inline-edit">
            <input type="date" aria-label="Date" value={day} onChange={e => setDay(e.target.value)} />
            <label className="check" style={{ alignItems: 'center' }}>
                <input type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} style={{ marginTop: 0 }} />
                <span>Journée</span>
            </label>
            {!allDay && (
                <>
                    <input type="time" aria-label="Heure de début" step={300} value={start} onChange={e => setStart(e.target.value)} />
                    <span>à</span>
                    <input type="time" aria-label="Heure de fin" step={300} value={end} onChange={e => setEnd(e.target.value)} />
                </>
            )}
            <button type="button" className="btn small" onClick={save} disabled={busy}>Enregistrer</button>
            <button type="button" className="link" onClick={onCancel}>Annuler</button>
            {booked && <span className="hint" style={{ flexBasis: '100%' }}>{booked} a réservé ce créneau : la réservation suit le nouvel horaire et le candidat reçoit un email avec le nouvel horaire.</span>}
        </div>
    );
}

function TeamView({ poll, setPoll, navigate, notify }) {
    const [editing, setEditing] = useState(null); // id du créneau modifié, ou 'new'
    const [confirm, setConfirm] = useState(null); // { id, action: 'free' | 'delete' }
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const run = async (action, message) => {
        setBusy(true);
        setError('');
        try {
            const { poll: p } = await action();
            setPoll(p);
            setEditing(null);
            setConfirm(null);
            if (message) notify(message);
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    const taken = poll.options.filter(o => o.booking).length;
    const url = pollUrl(poll.id);

    return (
        <>
            <Header poll={poll} label="Entretien candidat · vue équipe" />
            {poll.closed && (
                <div className="banner">
                    <div>
                        <p className="libelle">Sondage clôturé</p>
                        <p style={{ marginTop: 4 }}>Les candidats voient le message « Plus de créneaux disponibles. Contactez le cabinet. »</p>
                    </div>
                    <button type="button" className="link" onClick={() => run(() => api.reopenPoll(poll.id), 'Sondage rouvert')}>Rouvrir le sondage</button>
                </div>
            )}
            <div className="under" style={{ margin: '0 0 20px' }}>
                <span><span className="counter">{taken} / {poll.options.length}</span> <span className="muted">créneaux réservés</span></span>
                <span className="hint">
                    Lien à transmettre aux candidats : {url.replace(/^https?:\/\//, '')}{' '}
                    <button type="button" className="link" onClick={async () => notify((await copyText(url)) ? 'Lien copié' : 'Sélectionnez le lien pour le copier')}>Copier</button>
                </span>
            </div>
            {error && <p className="error" role="alert" style={{ marginBottom: 12 }}>{error}</p>}
            <div className="scroll">
                <table className="slots">
                    <thead>
                        <tr><th>Créneau</th><th>Candidat</th><th>Email</th><th>Téléphone</th><th>Réservé</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {poll.options.length === 0 && <tr><td colSpan={6} className="free">Aucun créneau. Ajoutez-en un ci-dessous.</td></tr>}
                        {poll.options.map(o => {
                            if (editing === o.id) {
                                return (
                                    <tr key={o.id} className="edit-row">
                                        <td colSpan={6}>
                                            <SlotEditor initial={o} booked={o.booking?.name} busy={busy} onCancel={() => setEditing(null)}
                                                onSave={slot => run(() => api.updateSlot(poll.id, o.id, slot), 'Créneau modifié')} />
                                        </td>
                                    </tr>
                                );
                            }
                            const b = o.booking;
                            let actions;
                            if (confirm?.id === o.id) {
                                const free = confirm.action === 'free';
                                actions = (
                                    <span className="confirm">
                                        {free ? 'Libérer ce créneau ?' : 'Supprimer ce créneau ?'}
                                        <button type="button" className="link warn" disabled={busy}
                                            onClick={() => run(free ? () => api.releaseBooking(poll.id, b.id) : () => api.deleteSlot(poll.id, o.id), free ? 'Créneau libéré' : 'Créneau supprimé')}>Oui</button>
                                        <button type="button" className="link" onClick={() => setConfirm(null)}>Non</button>
                                        {b && <span className="hint" style={{ flexBasis: '100%' }}>{b.name} recevra un email d’annulation.</span>}
                                    </span>
                                );
                            } else {
                                actions = (
                                    <span className="actions">
                                        {b && <button type="button" className="link" onClick={() => setConfirm({ id: o.id, action: 'free' })}>Libérer</button>}
                                        <button type="button" className="link" onClick={() => { setEditing(o.id); setConfirm(null); }}>Modifier</button>
                                        <button type="button" className="link warn" onClick={() => setConfirm({ id: o.id, action: 'delete' })}>Supprimer</button>
                                    </span>
                                );
                            }
                            return (
                                <tr key={o.id}>
                                    <td className="num">{optionShort(o)}</td>
                                    {b ? (
                                        <>
                                            <td>{b.name}</td>
                                            <td>{b.email}</td>
                                            <td className="num">{b.phone}</td>
                                            <td>{sinceLabel(b.createdAt)}</td>
                                        </>
                                    ) : <td className="free" colSpan={4}>Libre</td>}
                                    <td>{actions}</td>
                                </tr>
                            );
                        })}
                        {editing === 'new' && (
                            <tr className="edit-row">
                                <td colSpan={6}>
                                    <SlotEditor initial={{ kind: 'time' }} busy={busy} onCancel={() => setEditing(null)}
                                        onSave={slot => run(() => api.addSlot(poll.id, slot), 'Créneau ajouté')} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {editing !== 'new' && <div style={{ marginTop: 14 }}><button type="button" className="link" onClick={() => { setEditing('new'); setConfirm(null); }}>Ajouter un créneau</button></div>}
            <div className="under">
                <span className="hint">Libérer remet le créneau à disposition des candidats ; la personne qui l’avait pris reçoit un email d’annulation.</span>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <a className="link" href="/" onClick={e => { e.preventDefault(); navigate('/'); }}>Tous les sondages</a>
                    {!poll.closed && <button type="button" className="btn ghost" onClick={() => run(() => api.closePoll(poll.id), 'Sondage clôturé')}>Clôturer le sondage</button>}
                </div>
            </div>
        </>
    );
}
