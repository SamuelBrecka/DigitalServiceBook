import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './Users'; // Tvoj pôvodný kód pre userov
import Cars from './Cars';   // Tvoj nový kód pre autá

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>

        {/* NAVIGÁCIA (MENU) */}
        <nav style={{
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#282c34',
          borderRadius: '8px'
        }}>
          <Link to="/users" style={{ color: 'white', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>
            👥 Používatelia
          </Link>
          <Link to="/cars" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            🚗 Autá
          </Link>
        </nav>

        {/* OBSAH STRÁNKY */}
        <div style={{ background: 'black', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/cars" element={<Cars />} />
            {/* Úvodná stránka */}
            <Route path="/" element={<h2>Vitaj v Digitálnej servisnej knižke! Vyber si sekciu v menu hore.</h2>} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;