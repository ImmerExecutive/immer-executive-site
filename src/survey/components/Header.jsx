export default function Header({ team, navigate, onLogout }) {
    const go = (path) => (e) => {
        e.preventDefault();
        navigate(path);
    };
    return (
        <header className="top">
            <div className="wrap">
                <a className="brand" href={team ? '/' : 'https://immer-executive.com'} onClick={team ? go('/') : undefined}>
                    <img src="/survey-symbol.svg" alt="" />
                    <span className="name">IMMER EXECUTIVE</span>
                    <span className="sub">Sondages</span>
                </a>
                {team && (
                    <nav aria-label="Espace équipe">
                        <a href="/" onClick={go('/')}>Tous les sondages</a>
                        <a href="/nouveau" onClick={go('/nouveau')}>Nouveau sondage</a>
                        <button className="link" type="button" onClick={onLogout}>Se déconnecter</button>
                    </nav>
                )}
            </div>
        </header>
    );
}
