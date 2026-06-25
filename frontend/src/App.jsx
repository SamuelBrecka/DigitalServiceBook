import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from "./LandingPage.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login onLogin={(userData) => console.log('Login úspešný:', userData)} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;