import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ firstName: '', lastName: '' })

  const fetchUsers = () => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
        .then(res => {
          if (!res.ok) {
            throw new Error('Chyba pri načítaní dát');
          }
          return res.json();
        })
        .then(data => setUsers(data))
        .catch(err => console.error("Fetch error:", err));
  }

  useEffect(() => { fetchUsers() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      fetchUsers()
      setFormData({ firstName: '', lastName: ''})
    } else {
      console.error("Nepodarilo sa pridať používateľa");
    }
  }

  return (
      <div>
        <h2>Správa používateľov</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Meno" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
          <input placeholder="Priezvisko" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
          <button type="submit">Pridať</button>
        </form>
        <ul>
          {users.map(u => <li key={u.id}>{u.firstName} {u.lastName} ({u.userName})</li>)}
        </ul>
      </div>
  )
}

export default Users;