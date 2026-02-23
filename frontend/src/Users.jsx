import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '' })

  const fetchUsers = () => {
    fetch('http://localhost:8080/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }

  useEffect(() => { fetchUsers() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      fetchUsers()
      setFormData({ firstName: '', lastName: '', age: '' })
    }
  }

  return (
    <div>
      <h2>Správa používateľov</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Meno" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
        <input placeholder="Priezvisko" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
        <input type="number" placeholder="Vek" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
        <button type="submit">Pridať</button>
      </form>
      <ul>
        {users.map(u => <li key={u.id}>{u.firstName} {u.lastName} ({u.age}r)</li>)}
      </ul>
    </div>
  )
}

export default Users