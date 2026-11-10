// Mise en forme des dates et créneaux (heures locales, sans conversion de fuseau).

export const DAYS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
export const DAYS_LONG = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
export const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
export const MONTHS_LONG = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export function hour(min) {
    const h = Math.floor(min / 60), m = min % 60;
    return `${h} h${m ? ' ' + String(m).padStart(2, '0') : ''}`;
}

export function duration(min) {
    if (min == null) return '';
    if (min < 60) return `${min} min`;
    const h = Math.floor(min / 60), m = min % 60;
    return `${h} h${m ? ' ' + String(m).padStart(2, '0') : ''}`;
}

// « 2026-11-17 » ↔ Date locale à minuit.
export function parseDay(day) {
    const [y, m, d] = day.split('-').map(Number);
    return new Date(y, m - 1, d);
}

export function dayKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function addDays(date, n) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}

export function mondayOf(date) {
    const offset = (date.getDay() + 6) % 7;
    return addDays(date, -offset);
}

export function slotRange(o) {
    return o.kind === 'day' ? 'Journée' : `${hour(o.start)} – ${hour(o.end)}`;
}

export function optionShort(o) {
    if (o.kind === 'text') return o.label;
    const d = parseDay(o.day);
    return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} · ${slotRange(o)}`;
}

export function optionLong(o) {
    if (o.kind === 'text') return o.label;
    const d = parseDay(o.day);
    const head = `${DAYS_LONG[d.getDay()]} ${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
    return o.kind === 'day' ? `${head}, journée entière` : `${head}, ${hour(o.start)} – ${hour(o.end)}`;
}

export function daysSince(iso) {
    return Math.max(0, Math.floor((Date.now() - Date.parse(iso)) / 86400000));
}

export function sinceLabel(iso) {
    const n = daysSince(iso);
    return n === 0 ? 'aujourd’hui' : n === 1 ? 'hier' : `il y a ${n} j`;
}

export function pollUrl(id) {
    return `${window.location.origin}/s/${id}`;
}
