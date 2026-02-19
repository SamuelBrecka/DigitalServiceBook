import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch volá tvoj bežiaci Spring Boot
    fetch('http://localhost:8080/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Backend asi spinká:", err))
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Môj Fullstack Projekt 🚀</h1>
      <h3>Používatelia vytiahnutí zo SQLite cez Spring Boot:</h3>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {users.map(user => (
          <div key={user.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
            background: '#f9f9f9',
            color: 'black'
          }}>
            <strong>{user.firstName} {user.lastName}</strong>
            <p>Vek: {user.age}</p>
          </div>
        ))}
      </div>
      {users.length === 0 && <p>Žiadni používatelia v DB. Skús pridať cez Postman!</p>}
    </div>
  )
}

export default App