import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register( {onRegister } ) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('http://localhost:8080/users/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { firstName, lastName, userName, password })
        });

        if (res.ok) {
            navigate('/login');
        } else {
            setError('Použivatel už existuje');
        }
    }

    return (
        <div style={{ maxWidth: '300px', margin: '100px auto', textAlign: 'center' }}>
            <h2>Prihlásenie</h2>
            <form onSubmit={handleRegister} style={{ display: 'grid', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Zadaj krstné meno"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Zadaj priezvisko"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Zadaj používateľské meno"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Zadaj heslo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}>
                    Vstúpiť
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
} export default Register;