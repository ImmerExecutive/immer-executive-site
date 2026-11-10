import { useEffect } from 'react';

export default function Toast({ text, onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 2600);
        return () => clearTimeout(t);
    }, [onDone]);
    return <div className="toast" role="status">{text}</div>;
}
