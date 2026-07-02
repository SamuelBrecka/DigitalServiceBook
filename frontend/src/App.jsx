import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Login from './features/auth/Login.jsx';
import Register from './features/auth/Register.jsx';
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
        const firstName = localStorage.getItem('userFirstName') || sessionStorage.getItem('userFirstName');
        const lastName = localStorage.getItem('userLastName') || sessionStorage.getItem('userLastName');

        if (token && email && firstName && lastName) {
            setUser({ email, firstName, lastName });
        }
    }, []);

    const handleLoginSuccess = (userData, rememberMe) => {
        setUser({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
        });
        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem('token', userData.token);
        storage.setItem('userEmail', userData.email);
        storage.setItem('userFirstName', userData.firstName);
        storage.setItem('userLastName', userData.lastName);

        storage.setItem('remembered', rememberMe ? 'local' : 'session');
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
        sessionStorage.clear();
    };

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />

            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route
                    path="/login"
                    element={
                        <ProtectedRoute user={user} guestOnly={true}>
                            <Login onLogin={handleLoginSuccess} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute user={user} guestOnly={true}>
                            <Register />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute user={user}>
                            <div className="pt-24 p-8">Tu bude tvoja super garáž!</div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;