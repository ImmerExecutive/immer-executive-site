import { useCallback, useEffect, useState } from 'react';
import { api } from './api.js';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import PollList from './components/PollList.jsx';
import CreatePoll from './components/CreatePoll.jsx';
import PollPage from './components/PollPage.jsx';
import Toast from './components/Toast.jsx';

function currentRoute() {
    const { pathname, search } = window.location;
    const poll = pathname.match(/^\/s\/([A-Za-z0-9]+)\/?$/);
    if (poll) return { page: 'poll', id: poll[1] };
    if (pathname === '/connexion') return { page: 'login' };
    if (pathname === '/nouveau') return { page: 'create', from: new URLSearchParams(search).get('depuis') };
    if (pathname === '/' || pathname === '') return { page: 'list' };
    return { page: 'missing' };
}

const TEAM_PAGES = ['list', 'create'];

export default function App() {
    const [route, setRoute] = useState(currentRoute);
    const [team, setTeam] = useState(null); // null : session en cours de vérification
    const [toast, setToast] = useState(null);

    const navigate = useCallback((path) => {
        window.history.pushState({}, '', path);
        setRoute(currentRoute());
        window.scrollTo(0, 0);
    }, []);

    const notify = useCallback((text) => setToast({ text, at: Date.now() }), []);
    const clearToast = useCallback(() => setToast(null), []);

    useEffect(() => {
        const onPop = () => setRoute(currentRoute());
        window.addEventListener('popstate', onPop);
        api.session().then(s => setTeam(!!s.team)).catch(() => setTeam(false));
        return () => window.removeEventListener('popstate', onPop);
    }, []);

    useEffect(() => {
        const titles = { list: 'Tous les sondages', create: 'Nouveau sondage', login: 'Espace équipe' };
        if (titles[route.page]) document.title = `${titles[route.page]} · IMMER Executive`;
    }, [route]);

    const logout = async () => {
        await api.logout().catch(() => {});
        setTeam(false);
        navigate('/connexion');
    };

    let content;
    if (team === null) {
        content = <p className="muted">Chargement…</p>;
    } else if (route.page === 'poll') {
        content = <PollPage key={route.id} id={route.id} team={team} navigate={navigate} notify={notify} />;
    } else if (route.page === 'login' || (TEAM_PAGES.includes(route.page) && !team)) {
        content = (
            <Login
                onLogin={() => {
                    setTeam(true);
                    if (route.page === 'login') navigate('/');
                }}
            />
        );
    } else if (route.page === 'list') {
        content = <PollList navigate={navigate} notify={notify} />;
    } else if (route.page === 'create') {
        content = <CreatePoll key={route.from || 'new'} from={route.from} navigate={navigate} notify={notify} />;
    } else {
        content = (
            <div className="notice">
                <h1>Page introuvable</h1>
                <div className="filet" />
                <p className="muted">Vérifiez le lien qui vous a été transmis par le cabinet.</p>
            </div>
        );
    }

    return (
        <>
            <Header team={!!team} navigate={navigate} onLogout={logout} />
            <main><div className="wrap">{content}</div></main>
            <footer className="foot"><div className="wrap">IMMER EXECUTIVE · 66 AVENUE DES CHAMPS-ÉLYSÉES · 75008 PARIS · IMMER-EXECUTIVE.COM</div></footer>
            {toast && <Toast key={toast.at} text={toast.text} onDone={clearToast} />}
        </>
    );
}
