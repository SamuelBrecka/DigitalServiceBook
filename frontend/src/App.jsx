import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './Users';
import Cars from './Cars';
import Login from './Login';
import Register from "./Register.jsx";

function App() {
    return (
        <Router>
            <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>

                {/* HEADER SEKCOA */}
                <header style={{
                    backgroundColor: '#282c34',
                    padding: '40px 20px',
                    color: 'white',
                    textAlign: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Digital Service Book</h1>
                    <p style={{ opacity: 0.8 }}>Správa tvojho vozového parku jednoducho a rýchlo</p>

                    {/* TLAČIDLÁ POD NÁPISOM */}
                    <div style={{ marginTop: '20px' }}>
                        <Link to="/cars" style={buttonStyle}>🚗 Autá</Link>
                        <Link to="/users" style={buttonStyle}>👥 Používatelia</Link>
                        <Link to="/login" style={{ ...buttonStyle, backgroundColor: '#61dafb', color: '#282c34' }}>🔑 Login</Link>
                        <Link to="/register" style={{ ...buttonStyle, backgroundColor: '#61dafb', color: '#282c34' }}>🔑 Register</Link>
                    </div>
                </header>

                {/* OBSAH STRÁNKY */}
                <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                    <Routes>
                        <Route path="/cars" element={<Cars />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login onLogin={() => console.log('Prihlásený!')} />} />
                        <Route path="/" element={
                            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                <h2>Vitaj! Vyber si sekciu v menu hore.</h2>
                            </div>
                        } />
                    </Routes>
                </main>

            </div>
        </Router>
    );
}

// Pomocný štýl pre tlačidlá (aby sme ho nemuseli furt vypisovať)
const buttonStyle = {
    textDecoration: 'none',
    padding: '12px 25px',
    margin: '0 10px',
    borderRadius: '5px',
    backgroundColor: '#4a90e2',
    color: 'white',
    fontWeight: 'bold',
    display: 'inline-block',
    transition: 'transform 0.2s'
};

export default App;