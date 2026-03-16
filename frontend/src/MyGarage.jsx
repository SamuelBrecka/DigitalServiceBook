import { useState } from 'react';
import { Link } from 'react-router-dom';

function MyGarage() {
    // Mock dáta presne podľa tvojej Car.java entity
    const [cars, setCars] = useState([
        {
            id: 1,
            brand: 'Škoda',
            model: 'Octavia',
            licensePlate: 'BL-123XY',
            manufactureYear: 2018,
            mileage: 154000,
            fuelType: 'DIESEL',
            nextStkDate: '2025-10-15'
        },
        {
            id: 2,
            brand: 'Volkswagen',
            model: 'Golf',
            licensePlate: 'KE-456AB',
            manufactureYear: 2020,
            mileage: 82000,
            fuelType: 'PETROL',
            nextStkDate: '2026-03-20'
        }
    ]);

    return (
        <div className="min-h-screen bg-base-100 p-8 text-neutral">

            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-2">Moja Garáž</h2>
                    <p className="text-secondary font-semibold">Tvoje vozidlá na jednom mieste.</p>
                </div>

                <button className="btn btn-primary shadow-lg hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Pridať auto
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {cars.map((car) => (
                    <div key={car.id} className="card bg-white shadow-xl border-t-4 border-primary hover:shadow-2xl transition-all">
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-primary justify-between">
                                {car.brand} {car.model}
                                <div className="badge badge-accent badge-lg font-bold">{car.licensePlate}</div>
                            </h2>

                            <div className="flex flex-col gap-2 mt-4">
                                <div className="flex justify-between text-sm border-b pb-1">
                                    <span className="font-semibold text-neutral">Rok výroby:</span>
                                    <span>{car.manufactureYear}</span>
                                </div>
                                <div className="flex justify-between text-sm border-b pb-1">
                                    <span className="font-semibold text-neutral">Nájazd:</span>
                                    <span>{car.mileage.toLocaleString()} km</span>
                                </div>
                                <div className="flex justify-between text-sm border-b pb-1">
                                    <span className="font-semibold text-neutral">Palivo:</span>
                                    <span>{car.fuelType}</span>
                                </div>
                                <div className="flex justify-between text-sm pb-1 text-error font-semibold">
                                    <span>Platnosť STK:</span>
                                    <span>{car.nextStkDate}</span>
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-6">
                                {/* Odkaz na novú stránku s ID auta */}
                                <Link to={`/edit-car/${car.id}`} className="btn btn-sm btn-outline btn-primary">
                                    Upraviť
                                </Link>
                                <button className="btn btn-sm btn-secondary text-white">Servisná knižka</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyGarage;