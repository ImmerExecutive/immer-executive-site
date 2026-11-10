// Appels à l'API des sondages (même origine, cookie de session de l'équipe).

async function call(method, path, body) {
    let res;
    try {
        res = await fetch('/api' + path, {
            method,
            credentials: 'same-origin',
            headers: body ? { 'Content-Type': 'application/json' } : {},
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new ApiError(0, 'Connexion impossible. Vérifiez votre réseau et réessayez.');
    }
    let data = {};
    try { data = await res.json(); } catch { /* réponse vide */ }
    if (!res.ok) throw new ApiError(res.status, data.error || 'Une erreur est survenue. Réessayez dans un instant.');
    return data;
}

export class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export const api = {
    session: () => call('GET', '/session'),
    login: password => call('POST', '/session', { password }),
    logout: () => call('DELETE', '/session'),
    listPolls: () => call('GET', '/polls'),
    getPoll: id => call('GET', `/polls/${encodeURIComponent(id)}`),
    createPoll: poll => call('POST', '/polls', poll),
    deletePoll: id => call('DELETE', `/polls/${encodeURIComponent(id)}`),
    closePoll: (id, optionId) => call('POST', `/polls/${encodeURIComponent(id)}/close`, { optionId }),
    reopenPoll: id => call('POST', `/polls/${encodeURIComponent(id)}/reopen`),
    addResponse: (id, response) => call('POST', `/polls/${encodeURIComponent(id)}/responses`, response),
    updateResponse: (id, rid, response) => call('PUT', `/polls/${encodeURIComponent(id)}/responses/${encodeURIComponent(rid)}`, response),
    deleteResponse: (id, rid) => call('DELETE', `/polls/${encodeURIComponent(id)}/responses/${encodeURIComponent(rid)}`),
};
