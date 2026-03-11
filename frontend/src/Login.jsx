import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Zatiaľ overíme užívateľa len tak, že skúsime nájsť niekoho s týmto priezviskom
        const res = await fetch('http://localhost:8080/users');
        const users = await res.json();

        const userFound = users.find(u => u.lastName.toLowerCase() === lastName.toLowerCase());

        if (userFound) {
            onLogin(); // Zmení stav v App.jsx na prihlásený
            navigate('/users');
        } else {
            setError('Užívateľ s týmto priezviskom neexistuje!');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '100px auto', textAlign: 'center' }}>
            <h2>Prihlásenie</h2>
            <form onSubmit={handleLogin} style={{ display: 'grid', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Zadaj priezvisko (napr. Novak)"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}>
                    Vstúpiť
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;