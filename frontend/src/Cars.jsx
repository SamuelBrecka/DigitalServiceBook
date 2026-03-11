import { useEffect, useState } from 'react';

function Cars() {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]); // Potrebujeme zoznam majiteľov
  const [formData, setFormData] = useState({
    brand: '', model: '', vin: '', licensePlate: '', manufactureYear: '', ownerId: ''
  });

  useEffect(() => {
    // Načítame autá aj používateľov
    fetch('http://localhost:8080/cars').then(res => res.json()).then(setCars);
    fetch('http://localhost:8080/users').then(res => res.json()).then(setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    // Refresh zoznamu áut
    fetch('http://localhost:8080/cars').then(res => res.json()).then(setCars);
  };

  return (
    <div>
      <h2>Pridať nové auto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '300px' }}>
        <input placeholder="Značka" onChange={e => setFormData({...formData, brand: e.target.value})} />
        <input placeholder="Model" onChange={e => setFormData({...formData, model: e.target.value})} />
        <input placeholder="VIN" onChange={e => setFormData({...formData, vin: e.target.value})} />

        <label>Vyber majiteľa:</label>
        <select onChange={e => setFormData({...formData, ownerId: e.target.value})} required>
          <option value="">-- Vyber --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>
          ))}
        </select>

        <button type="submit">Uložiť auto</button>
      </form>

      <hr />
      <h2>Zoznam áut</h2>
      <ul>
        {cars.map(car => (
            <li key={car.id}>
              {car.brand} {car.model}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Cars;