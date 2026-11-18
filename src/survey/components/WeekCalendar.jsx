import { useState } from 'react';
import { DAYS, MONTHS, addDays, dayKey, hour, mondayOf, optionShort } from '../format.js';

export const DURATIONS = [
    { id: 30, label: '30 min' },
    { id: 60, label: '1 h' },
    { id: 90, label: '1 h 30' },
    { id: 120, label: '2 h' },
    { id: 240, label: '4 h' },
    { id: 'day', label: 'Journée' },
    { id: 'custom', label: 'Définir' },
];

// Durée libre (« Définir ») : en minutes, par pas de 5.
const CUSTOM_MIN = 5;
const CUSTOM_MAX = 720;

const START = 8 * 60;
const END = 20 * 60;
const STEP = 30;
const ROWS = (END - START) / STEP;

export function sameSlot(a, b) {
    return a.kind === b.kind && a.day === b.day && a.start === b.start && a.end === b.end;
}

export function sortSlots(list) {
    const rank = s => (s.kind === 'day' ? -1 : s.start);
    return list.slice().sort((a, b) => a.day.localeCompare(b.day) || rank(a) - rank(b));
}

export default function WeekCalendar({ slots, onChange }) {
    const thisWeek = mondayOf(new Date());
    const today = dayKey(new Date());
    const [week, setWeek] = useState(thisWeek);
    const [dur, setDur] = useState(60);
    const [custom, setCustom] = useState(45);
    const customValid = Number.isInteger(custom) && custom >= CUSTOM_MIN && custom <= CUSTOM_MAX;
    const days = [0, 1, 2, 3, 4].map(i => addDays(week, i));
    const keys = days.map(dayKey);

    const add = (slot) => {
        if (slots.some(s => sameSlot(s, slot))) return;
        onChange(sortSlots([...slots, slot]));
    };
    const remove = (slot) => onChange(slots.filter(s => !sameSlot(s, slot)));

    const clickCell = (day, minute) => {
        if (dur === 'day') return add({ kind: 'day', day });
        const length = dur === 'custom' ? custom : dur;
        if (dur === 'custom' && !customValid) return;
        // Un créneau peut finir après 20 h (affiché jusqu'au bas de l'agenda), jamais après minuit.
        add({ kind: 'time', day, start: minute, end: Math.min(24 * 60, minute + length) });
    };

    const last = days[4];
    const first = days[0];
    const range = first.getMonth() === last.getMonth()
        ? `${first.getDate()} – ${last.getDate()} ${MONTHS[last.getMonth()]} ${last.getFullYear()}`
        : `${first.getDate()} ${MONTHS[first.getMonth()]} – ${last.getDate()} ${MONTHS[last.getMonth()]} ${last.getFullYear()}`;

    const cells = [];
    for (let r = 0; r < ROWS; r++) {
        const minute = START + r * STEP;
        if (minute % 60 === 0) {
            cells.push(<div key={`h${r}`} className="hl" style={{ gridColumn: 1, gridRow: r + 3 }}>{hour(minute)}</div>);
        }
        keys.forEach((key, i) => {
            cells.push(
                <button
                    key={`${key}-${minute}`}
                    type="button"
                    className={`cell ${minute % 60 === 0 ? 'hour' : ''}`}
                    style={{ gridColumn: i + 2, gridRow: r + 3 }}
                    disabled={key < today}
                    aria-label={`Ajouter un créneau le ${DAYS[days[i].getDay()]} ${days[i].getDate()} à ${hour(minute)}`}
                    onClick={() => clickCell(key, minute)}
                />,
            );
        });
    }

    const visible = slots.filter(s => keys.includes(s.day));

    return (
        <div>
            <div className="cal-head">
                <div>
                    <p style={{ fontWeight: 700, fontSize: 13 }}>Créneaux proposés</p>
                    <p className="hint">Choisissez une durée, puis cliquez sur l’agenda. Cliquez sur un créneau pour le retirer.</p>
                </div>
                <div className="cal-nav">
                    <button type="button" aria-label="Semaine précédente" disabled={week <= thisWeek} onClick={() => setWeek(addDays(week, -7))}>‹</button>
                    <span>{range}</span>
                    <button type="button" aria-label="Semaine suivante" onClick={() => setWeek(addDays(week, 7))}>›</button>
                </div>
            </div>
            <div className="chips" role="group" aria-label="Durée du créneau" style={{ marginBottom: 14 }}>
                {DURATIONS.map(d => (
                    <button key={d.id} type="button" className="chip" aria-pressed={dur === d.id} onClick={() => setDur(d.id)}>{d.label}</button>
                ))}
                {dur === 'custom' && (
                    <span className="custom-dur">
                        <input type="number" min={CUSTOM_MIN} max={CUSTOM_MAX} step={5} value={Number.isNaN(custom) ? '' : custom} aria-label="Durée du créneau en minutes" autoFocus
                            onChange={e => setCustom(e.target.value === '' ? NaN : Math.floor(Number(e.target.value)))} />
                        <span className="hint">min</span>
                    </span>
                )}
            </div>
            {dur === 'custom' && !customValid && <p className="error" style={{ marginTop: -6, marginBottom: 12 }}>Indiquez une durée entre {CUSTOM_MIN} et {CUSTOM_MAX} minutes.</p>}
            <div className="scroll">
                <div className="cal" style={{ gridTemplateRows: `auto 34px repeat(${ROWS}, 22px)` }}>
                    <div style={{ gridColumn: 1, gridRow: 1 }} />
                    {days.map((d, i) => (
                        <div key={keys[i]} className={`dh ${keys[i] < today ? 'past' : ''}`} style={{ gridColumn: i + 2, gridRow: 1 }}>
                            {DAYS[d.getDay()]}<strong>{d.getDate()}</strong>
                        </div>
                    ))}
                    <div className="hl day" style={{ gridColumn: 1, gridRow: 2 }}>jour</div>
                    {keys.map((key, i) => (
                        <button
                            key={`all-${key}`}
                            type="button"
                            className="allday"
                            style={{ gridColumn: i + 2, gridRow: 2 }}
                            disabled={key < today}
                            aria-label={`Ajouter la journée du ${DAYS[days[i].getDay()]} ${days[i].getDate()}`}
                            onClick={() => add({ kind: 'day', day: key })}
                        />
                    ))}
                    {cells}
                    {visible.map(s => {
                        const col = keys.indexOf(s.day) + 2;
                        if (s.kind === 'day') {
                            return <button key={`s-${s.day}-day`} type="button" className="slot" style={{ gridColumn: col, gridRow: 2 }} onClick={() => remove(s)} aria-label={`Retirer ${optionShort(s)}`}>Journée</button>;
                        }
                        const from = Math.max(START, s.start), to = Math.min(END, s.end);
                        if (to <= from) return null;
                        const row = 3 + Math.floor((from - START) / STEP);
                        const span = Math.max(1, Math.ceil((to - from) / STEP));
                        return (
                            <button key={`s-${s.day}-${s.start}-${s.end}`} type="button" className="slot" style={{ gridColumn: col, gridRow: `${row} / span ${span}` }} onClick={() => remove(s)} aria-label={`Retirer ${optionShort(s)}`}>
                                {hour(s.start)} – {hour(s.end)}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="slots-list">
                {slots.length === 0 && <span className="hint">Aucun créneau pour l’instant.</span>}
                {slots.map(s => (
                    <span className="tag" key={`t-${s.kind}-${s.day}-${s.start}-${s.end}`} style={s.day < today ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
                        {optionShort(s)}{s.day < today ? ' (passé)' : ''}
                        <button type="button" aria-label={`Retirer ${optionShort(s)}`} onClick={() => remove(s)}>×</button>
                    </span>
                ))}
            </div>
            {slots.some(s => s.day < today) && <p className="error" style={{ marginTop: 8 }}>Certains créneaux repris du sondage d’origine sont passés : retirez-les avant de créer le sondage.</p>}
        </div>
    );
}

