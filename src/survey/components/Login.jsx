import { useState } from 'react';
import { api } from '../api.js';

export default function Login({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
            await api.login(password);
            onLogin();
        } catch (err) {
            setError(err.message);
            setBusy(false);
        }
    };

    return (
        <div className="login">
            <div>
                <p className="libelle">Espace équipe</p>
                <h1 style={{ marginTop: 8 }}>Accéder aux sondages</h1>
                <div className="filet" />
            </div>
            <p className="muted">
                Cet espace est réservé aux membres du cabinet. Les participants n’en ont pas besoin :
                ils répondent depuis le lien que vous leur transmettez.
            </p>
            <form onSubmit={submit}>
                <div className="field">
                    <label htmlFor="pw">Mot de passe de l’équipe</label>
                    <input id="pw" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" autoFocus required />
                </div>
                {error && <p className="error" role="alert">{error}</p>}
                <div><button className="btn" type="submit" disabled={busy}>{busy ? 'Vérification…' : 'Entrer'}</button></div>
            </form>
            <p className="hint">Mot de passe unique, commun à toute l’équipe. La session reste ouverte 30 jours sur cet appareil.</p>
        </div>
    );
}
