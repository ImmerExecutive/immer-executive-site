import { Fragment, useEffect, useState } from 'react';
import { api } from '../api.js';
import { DAYS, MONTHS, duration, optionLong, optionShort, parseDay, pollUrl, slotRange } from '../format.js';
import { copyText } from './copy.js';
import InterviewPage, { SlotEditor } from './InterviewPage.jsx';

const LABELS = { y: 'Oui', m: 'Si nécessaire', n: 'Non' };
const GLYPHS = { y: '✓', m: '(✓)', n: '' };
const cls = v => (v === 'y' ? 'yes' : v === 'm' ? 'maybe' : 'no');

function tally(options, responses) {
    return options.map(o => ({
        y: responses.filter(r => r.votes[o.id] === 'y').length,
        m: responses.filter(r => r.votes[o.id] === 'm').length,
    }));
}

function ColumnHead({ poll, option, full }) {
    if (option.kind === 'text') {
        return (
            <div className="colh">
                <div className="n txt">{option.label}</div>
                {full && <div className="full">Complet</div>}
            </div>
        );
    }
    const d = parseDay(option.day);
    return (
        <div className="colh">
            <div className="d">{DAYS[d.getDay()]}</div>
            <div className="n">{d.getDate()}</div>
            <div className="d">{MONTHS[d.getMonth()]}</div>
            <div className="h">{slotRange(option)}</div>
            {full && <div className="full">Complet · {poll.limit}/{poll.limit}</div>}
        </div>
    );
}

export default function PollPage({ id, team, navigate, notify }) {
    const [poll, setPoll] = useState(null);
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(null); // id de la réponse modifiée, ou 'new'
    const [draft, setDraft] = useState(null);
    const [formError, setFormError] = useState('');
    const [busy, setBusy] = useState(false);
    const [picking, setPicking] = useState(false);
    const [confirmRow, setConfirmRow] = useState(null);
    const [slotAction, setSlotAction] = useState(null); // { id, action: 'edit' | 'delete' } : créneau modifié ou supprimé par l'équipe
    const [slotBusy, setSlotBusy] = useState(false);
    const [slotError, setSlotError] = useState('');

    useEffect(() => {
        api.getPoll(id)
            .then(({ poll: p }) => { setPoll(p); document.title = `${p.title} · Immer Executive`; })
            .catch(err => setError(err.message));
    }, [id]);

    if (error) {
        return (
            <div className="notice">
                <h1>Sondage introuvable</h1>
                <div className="filet" />
                <p className="muted">{error}</p>
            </div>
        );
    }
    if (!poll) return <p className="muted">Chargement du sondage…</p>;
    if (poll.type === 'entretien') return <InterviewPage poll={poll} setPoll={setPoll} team={team} navigate={navigate} notify={notify} />;

    const options = poll.options;
    const closed = !!poll.closedOptionId;
    const counts = tally(options, poll.responses);
    const others = poll.responses.filter(r => r.id !== edit);
    const othersCounts = tally(options, others);
    const isFull = i => !!poll.limit && counts[i].y >= poll.limit;
    const scores = counts.map(c => c.y * 2 + c.m);
    const top = Math.max(0, ...scores);
    const colClass = i => (closed ? (options[i].id === poll.closedOptionId ? 'chosen' : '') : top > 0 && scores[i] === top ? 'best' : '');
    const noun = poll.type === 'reunion' ? 'créneau' : 'option';

    const startEdit = (response) => {
        setFormError('');
        setConfirmRow(null);
        if (response) {
            setEdit(response.id);
            setDraft({ name: response.name, votes: { ...response.votes } });
        } else {
            setEdit('new');
            setDraft({ name: '', votes: {} });
        }
    };

    const cycle = (option, i) => {
        const order = poll.allowMaybe ? ['n', 'y', 'm'] : ['n', 'y'];
        const current = draft.votes[option.id] || 'n';
        let next = order[(order.indexOf(current) + 1) % order.length];
        if (next === 'y' && poll.limit && othersCounts[i].y >= poll.limit) next = order[(order.indexOf('y') + 1) % order.length];
        const votes = { ...draft.votes };
        if (next === 'n') delete votes[option.id]; else votes[option.id] = next;
        setDraft({ ...draft, votes });
    };

    const save = async () => {
        if (!draft.name.trim()) return setFormError('Indiquez votre nom.');
        setBusy(true);
        setFormError('');
        try {
            const body = { name: draft.name, votes: draft.votes };
            const { poll: p } = edit === 'new' ? await api.addResponse(poll.id, body) : await api.updateResponse(poll.id, edit, body);
            setPoll(p);
            setEdit(null);
            notify('Réponse enregistrée');
        } catch (err) {
            setFormError(err.message);
            if (err.status === 409 || err.status === 404) api.getPoll(poll.id).then(({ poll: p }) => setPoll(p)).catch(() => {});
        } finally {
            setBusy(false);
        }
    };

    const removeRow = async (response) => {
        try {
            const { poll: p } = await api.deleteResponse(poll.id, response.id);
            setPoll(p);
            setConfirmRow(null);
            notify(`Réponse de ${response.name} supprimée`);
        } catch (err) {
            notify(err.message);
        }
    };

    const closeOn = async (option) => {
        try {
            const { poll: p } = await api.closePoll(poll.id, option.id);
            setPoll(p);
            setPicking(false);
            setEdit(null);
            notify('Sondage clôturé');
        } catch (err) {
            notify(err.message);
        }
    };

    const reopen = async () => {
        try {
            const { poll: p } = await api.reopenPoll(poll.id);
            setPoll(p);
            notify('Sondage rouvert');
        } catch (err) {
            notify(err.message);
        }
    };

    // Réunion à planifier : l'équipe peut modifier ou supprimer un créneau tant que le sondage est ouvert.
    const canEditSlots = team && !closed && poll.type === 'reunion';
    const openSlot = (option, action) => {
        setSlotError('');
        setPicking(false);
        setSlotAction({ id: option.id, action });
    };
    const slotTarget = slotAction && options.find(o => o.id === slotAction.id);
    const slotVotes = slotTarget ? poll.responses.filter(r => r.votes[slotTarget.id]).length : 0;
    const runSlot = async (action, message) => {
        setSlotBusy(true);
        setSlotError('');
        try {
            const { poll: p } = await action();
            setPoll(p);
            setSlotAction(null);
            notify(message);
        } catch (err) {
            setSlotError(err.message);
        } finally {
            setSlotBusy(false);
        }
    };

    const editRow = (
        <>
            <tr className="editing">
                <td className="who">
                    <input type="text" maxLength={100} value={draft?.name || ''} placeholder="Votre nom" aria-label="Votre nom" autoFocus
                        onChange={e => setDraft({ ...draft, name: e.target.value })}
                        onKeyDown={e => { if (e.key === 'Enter') save(); }} />
                </td>
                {draft && options.map((o, i) => {
                    const v = draft.votes[o.id] || 'n';
                    const blocked = poll.limit && othersCounts[i].y >= poll.limit && v !== 'y' && !poll.allowMaybe;
                    return (
                        <td key={o.id} className={colClass(i)}>
                            <div className="cellv">
                                {blocked
                                    ? <span className="mark blocked" title={`${noun[0].toUpperCase() + noun.slice(1)} complet`}>·</span>
                                    : <button type="button" className={`mark ${cls(v)}`} aria-label={`${optionShort(o)} : ${LABELS[v]}. Cliquer pour changer.`} onClick={() => cycle(o, i)}>{GLYPHS[v]}</button>}
                            </div>
                        </td>
                    );
                })}
            </tr>
            <tr className="editing">
                <td colSpan={options.length + 1} style={{ padding: '4px 8px 14px' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <button type="button" className="btn small" onClick={save} disabled={busy}>{busy ? 'Enregistrement…' : 'Enregistrer'}</button>
                        <button type="button" className="link" onClick={() => setEdit(null)}>Annuler</button>
                        <span className="hint">Cliquez sur une case pour changer la réponse.</span>
                        {formError && <span className="error" role="alert">{formError}</span>}
                    </div>
                </td>
            </tr>
        </>
    );

    const chosen = options.find(o => o.id === poll.closedOptionId);

    return (
        <>
            <div className="head" style={{ marginBottom: 24 }}>
                <div>
                    <p className="libelle">{poll.type === 'reunion' ? 'Réunion à planifier' : 'Choix à faire'}</p>
                    <h1 style={{ marginTop: 8 }}>{poll.title}</h1>
                    <div className="filet" />
                    <div className="poll-meta">
                        {poll.place && <span><b>Lieu</b> · {poll.place}</span>}
                        {poll.duration && <span><b>Durée</b> · {duration(poll.duration)}</span>}
                        <span><b>Organisé par</b> · {poll.organizerName}, Immer Executive</span>
                        {poll.limit && <span><b>{poll.limit} participant{poll.limit > 1 ? 's' : ''} maximum</b> par {noun}</span>}
                    </div>
                </div>
            </div>

            {closed ? (
                <div className="banner">
                    <div>
                        <p className="libelle">Sondage clôturé</p>
                        <p style={{ marginTop: 4 }}>{poll.type === 'reunion' ? 'Créneau retenu' : 'Option retenue'} : <b>{chosen ? optionLong(chosen) : ''}</b></p>
                    </div>
                    {team && <button type="button" className="link" onClick={reopen}>Rouvrir le sondage</button>}
                </div>
            ) : (
                <p className="muted" style={{ marginBottom: 20, maxWidth: '70ch' }}>
                    Ajoutez votre nom puis indiquez, pour chaque {noun}, votre réponse en cliquant sur la case.
                    Toutes les réponses sont visibles et modifiables par les participants.
                </p>
            )}

            <div className="scroll">
                <table className="grid">
                    <thead>
                        <tr>
                            <th className="name"><span className="libelle">{poll.responses.length} participant{poll.responses.length > 1 ? 's' : ''}</span></th>
                            {options.map((o, i) => (
                                <th key={o.id} className={colClass(i)}>
                                    <ColumnHead poll={poll} option={o} full={isFull(i)} />
                                    {canEditSlots && (
                                        <div className="slot-acts">
                                            <button type="button" className="link" aria-label={`Modifier le créneau ${optionShort(o)}`} onClick={() => openSlot(o, 'edit')}>Modifier</button>
                                            <button type="button" className="link warn" aria-label={`Supprimer le créneau ${optionShort(o)}`} onClick={() => openSlot(o, 'delete')}>Supprimer</button>
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {poll.responses.map(r => (edit === r.id ? <Fragment key={r.id}>{editRow}</Fragment> : (
                            <tr key={r.id}>
                                <td className="who">
                                    <div className="who-row">
                                        <span>{r.name}</span>
                                        {!closed && (confirmRow === r.id ? (
                                            <span className="confirm">
                                                Supprimer ?
                                                <button type="button" className="link warn" onClick={() => removeRow(r)}>Oui</button>
                                                <button type="button" className="link" onClick={() => setConfirmRow(null)}>Non</button>
                                            </span>
                                        ) : (
                                            <span className="acts">
                                                <button type="button" className="link" onClick={() => startEdit(r)}>Modifier</button>
                                                <button type="button" className="link warn" onClick={() => setConfirmRow(r.id)}>Supprimer</button>
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                {options.map((o, i) => {
                                    const v = r.votes[o.id] || 'n';
                                    return <td key={o.id} className={colClass(i)}><div className="cellv"><span className={`mark ${cls(v)}`} aria-label={LABELS[v]}>{GLYPHS[v]}</span></div></td>;
                                })}
                            </tr>
                        )))}
                        {!closed && (edit === 'new' ? editRow : (
                            <tr>
                                <td className="who" colSpan={options.length + 1} style={{ padding: '12px 0' }}>
                                    <button type="button" className="btn small" onClick={() => startEdit(null)}>Ajouter ma réponse</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="who"><span className="libelle">Total</span></td>
                            {counts.map((c, i) => (
                                <td key={options[i].id} className={colClass(i)}>
                                    <span className="y">{c.y}</span> oui{poll.allowMaybe && <><br />{c.m} si néc.</>}
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="legend">
                <span><span className="mark yes">✓</span>Oui</span>
                {poll.allowMaybe && <span><span className="mark maybe">(✓)</span>Si nécessaire</span>}
                <span><span className="mark no" />Non</span>
                {poll.limit && <span><span className="mark blocked">·</span>Complet : le « oui » n’est plus possible</span>}
                {!closed && top > 0 && <span className="ivory">Fond ivoire : le plus de disponibilités</span>}
            </div>

            {canEditSlots && slotTarget && (
                <div className="close-pick slot-panel">
                    {slotAction.action === 'edit' ? (
                        <>
                            <p><b>Modifier le créneau</b> {optionShort(slotTarget)}</p>
                            <SlotEditor key={slotTarget.id} initial={slotTarget} busy={slotBusy} onCancel={() => setSlotAction(null)}
                                note={slotVotes ? `${slotVotes} réponse${slotVotes > 1 ? 's' : ''} déjà donnée${slotVotes > 1 ? 's' : ''} pour ce créneau ser${slotVotes > 1 ? 'ont effacées' : 'a effacée'} si l’horaire change : les participants devront répondre à nouveau pour ce créneau.` : null}
                                onSave={slot => runSlot(() => api.updateSlot(poll.id, slotTarget.id, slot), 'Créneau modifié')} />
                        </>
                    ) : (
                        <>
                            <p><b>Supprimer le créneau</b> {optionShort(slotTarget)} ?{slotVotes ? ` Les ${slotVotes} réponse${slotVotes > 1 ? 's' : ''} données pour ce créneau ser${slotVotes > 1 ? 'ont' : 'a'} effacée${slotVotes > 1 ? 's' : ''}.` : ''}</p>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                                <button type="button" className="btn danger small" disabled={slotBusy} onClick={() => runSlot(() => api.deleteSlot(poll.id, slotTarget.id), 'Créneau supprimé')}>Supprimer</button>
                                <button type="button" className="link" onClick={() => setSlotAction(null)}>Annuler</button>
                            </div>
                        </>
                    )}
                    {slotError && <p className="error" role="alert">{slotError}</p>}
                </div>
            )}

            {team && !closed && (picking ? (
                <div className="close-pick">
                    <p><b>Clôturer le sondage.</b> Choisissez {poll.type === 'reunion' ? 'le créneau retenu' : 'l’option retenue'}. Les réponses seront figées ; aucun email n’est envoyé.</p>
                    <div className="chips">
                        {options.map(o => <button key={o.id} type="button" className="chip" onClick={() => closeOn(o)}>{optionShort(o)}</button>)}
                    </div>
                    <div><button type="button" className="link" onClick={() => setPicking(false)}>Annuler</button></div>
                </div>
            ) : (
                <div className="under">
                    <span className="hint">
                        Lien du sondage : {pollUrl(poll.id).replace(/^https?:\/\//, '')}{' '}
                        <button type="button" className="link" onClick={async () => notify((await copyText(pollUrl(poll.id))) ? 'Lien copié' : 'Sélectionnez le lien pour le copier')}>Copier</button>
                    </span>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                        <a className="link" href="/" onClick={e => { e.preventDefault(); navigate('/'); }}>Tous les sondages</a>
                        <button type="button" className="btn ghost" onClick={() => setPicking(true)}>Clôturer le sondage</button>
                    </div>
                </div>
            ))}
        </>
    );
}
