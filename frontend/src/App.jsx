import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Users from './Users';
import Login from './Login';
import Register from "./Register.jsx";
import ProtectedRoute from './ProtectedRoute';
import MyGarage from "./MyGarage.jsx";
import EditCar from "./EditCar.jsx";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <Router>
            <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>

                <header style={{
                    position: 'relative',
                    backgroundColor: '#282c34',
                    padding: '40px 20px',
                    color: 'white',
                    textAlign: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>

                    {user && (
                        <div style={{ position: 'absolute', top: '20px', right: '30px', textAlign: 'right' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {user.firstName} {user.lastName}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#61dafb' }}>
                                @{user.userName}
                            </div>
                        </div>
                    )}

                    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Digital Service Book</h1>
                    <p style={{ opacity: 0.8 }}>Správa tvojho vozového parku jednoducho a rýchlo</p>

                    <div style={{ marginTop: '20px' }}>
                        <Link to="/" style={buttonStyle}>Domov</Link>

                        {!user ? (
                            <>
                                <Link to="/login" style={{ ...buttonStyle, backgroundColor: '#61dafb', color: '#282c34' }}>🔑 Login</Link>
                                <Link to="/register" style={{ ...buttonStyle, backgroundColor: '#61dafb', color: '#282c34' }}>📝 Register</Link>
                            </>
                        ) : (
                            <>
                            <Link to="/garage" style={buttonStyle}>Moje auta</Link>

                            <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: '#ff4d4f', border: 'none', cursor: 'pointer' }}>
                                🚪 Odhlásiť
                            </button>
                            </>
                        )}
                    </div>
                </header>

                <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
                        <Route path="/" element={
                            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                <h2>Vitaj! Vyber si sekciu v menu hore.</h2>
                                <h2 className="text-primary">Vitaj! Vyber si sekciu v menu hore.</h2>
                                <h2 className="text-secondary">Vitaj! Vyber si sekciu v menu hore.</h2>

                            </div>
                        } />

                        <Route path="/users" element={
                            <ProtectedRoute user={user}>
                                <Users />
                            </ProtectedRoute>
                        } />
                        <Route path="/garage" element={
                            <ProtectedRoute user={user}>
                                <MyGarage />
                            </ProtectedRoute>
                        } />
                        <Route path="/edit-car/:id" element={
                            <ProtectedRoute user={user}>
                                <EditCar />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

const buttonStyle = {
    textDecoration: 'none',
    padding: '12px 25px',
    margin: '0 10px',
    borderRadius: '5px',
    backgroundColor: '#4a90e2',
    color: 'white',
    fontWeight: 'bold',
    display: 'inline-block',
    transition: 'transform 0.2s',
    fontSize: '16px'
};

export default App;