import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { TYPE_LABELS, daysSince, duration, optionShort, pollUrl, sinceLabel } from '../format.js';
import { copyText } from './copy.js';

const FILTERS = [['all', 'Tous'], ['open', 'Ouverts'], ['closed', 'Clôturés']];

export default function PollList({ navigate, notify }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [confirm, setConfirm] = useState(null);

    useEffect(() => {
        api.listPolls().then(setData).catch(err => setError(err.message));
    }, []);

    const remove = async (id) => {
        try {
            await api.deletePoll(id);
            setData(d => ({ ...d, polls: d.polls.filter(p => p.id !== id) }));
            setConfirm(null);
            notify('Sondage supprimé');
        } catch (err) {
            notify(err.message);
        }
    };

    const copy = async (id) => notify((await copyText(pollUrl(id))) ? 'Lien copié' : pollUrl(id));

    const go = (path) => (e) => {
        e.preventDefault();
        navigate(path);
    };

    const retention = data?.retentionDays ?? 60;
    const isClosed = p => !!(p.closedOption || p.closed);
    const polls = (data?.polls || []).filter(p => filter === 'all' || (filter === 'open' ? !isClosed(p) : isClosed(p)));

    return (
        <>
            <div className="head">
                <div>
                    <p className="libelle">Espace équipe</p>
                    <h1 style={{ marginTop: 8 }}>Tous les sondages</h1>
                    <div className="filet" />
                    <p className="lead">Sondages de toute l’équipe. Un sondage sans aucune action pendant {retention} jours est supprimé automatiquement.</p>
                </div>
                <a className="btn" href="/nouveau" onClick={go('/nouveau')}>Nouveau sondage</a>
            </div>

            {error && <p className="error" role="alert">{error}</p>}
            {!data && !error && <p className="muted">Chargement des sondages…</p>}

            {data && data.polls.length === 0 && (
                <div className="empty">
                    <h2>Aucun sondage pour l’instant</h2>
                    <p className="muted">Créez un premier sondage : vous obtiendrez un lien à transmettre aux participants.</p>
                    <a className="btn" href="/nouveau" onClick={go('/nouveau')}>Créer un sondage</a>
                </div>
            )}

            {data && data.polls.length > 0 && (
                <>
                    <div className="chips" role="group" aria-label="Filtrer" style={{ marginBottom: 14 }}>
                        {FILTERS.map(([k, label]) => (
                            <button key={k} type="button" className="chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>{label}</button>
                        ))}
                    </div>
                    <div className="scroll">
                        <table className="list">
                            <thead>
                                <tr><th>Sondage</th><th>Organisateur</th><th>Réponses</th><th>Dernière action</th><th>Suppression auto</th><th>Statut</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {polls.map(p => {
                                    const left = Math.max(0, retention - daysSince(p.lastActionAt));
                                    return (
                                        <tr key={p.id}>
                                            <td>
                                                <a className="t-title" href={`/s/${p.id}`} onClick={go(`/s/${p.id}`)}>{p.title}</a>
                                                <div className="t-meta">
                                                    {p.type === 'reunion' ? 'Réunion' : TYPE_LABELS[p.type]}
                                                    {p.duration ? ` · ${duration(p.duration)}` : ''}
                                                    {p.limit && p.type !== 'entretien' ? ` · ${p.limit} participant${p.limit > 1 ? 's' : ''} max. par ${p.type === 'reunion' ? 'créneau' : 'option'}` : ''}
                                                </div>
                                            </td>
                                            <td>{p.organizerName}</td>
                                            <td className="num" style={{ whiteSpace: 'nowrap' }} title={p.type === 'entretien' ? 'Créneaux réservés / créneaux proposés' : undefined}>{p.type === 'entretien' ? `${p.responseCount} / ${p.optionCount}` : p.responseCount}</td>
                                            <td className="num">{sinceLabel(p.lastActionAt)}</td>
                                            <td className={`num ${left <= 10 ? 'soon' : ''}`}>{left === 0 ? 'aujourd’hui' : `dans ${left} j`}</td>
                                            <td>
                                                {isClosed(p)
                                                    ? <><span className="pastille closed">Clôturé</span>{p.closedOption && <div className="t-meta">{optionShort(p.closedOption)}</div>}</>
                                                    : <span className="pastille">Ouvert</span>}
                                            </td>
                                            <td>
                                                {confirm === p.id ? (
                                                    <div className="confirm">
                                                        Supprimer définitivement ?
                                                        <button type="button" className="btn danger small" onClick={() => remove(p.id)}>Supprimer</button>
                                                        <button type="button" className="link" onClick={() => setConfirm(null)}>Annuler</button>
                                                    </div>
                                                ) : (
                                                    <div className="actions">
                                                        <a className="link" href={`/s/${p.id}`} onClick={go(`/s/${p.id}`)}>Ouvrir</a>
                                                        <button type="button" className="link" onClick={() => copy(p.id)}>Copier le lien</button>
                                                        <a className="link" href={`/nouveau?depuis=${p.id}`} onClick={go(`/nouveau?depuis=${p.id}`)}>Dupliquer</a>
                                                        <button type="button" className="link warn" onClick={() => setConfirm(p.id)}>Supprimer</button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <p className="hint" style={{ marginTop: 14 }}>
                        Le compteur « dernière action » repart à zéro à chaque réponse, modification, suppression de ligne ou clôture, quel qu’en soit l’auteur.
                    </p>
                </>
            )}
        </>
    );
}
