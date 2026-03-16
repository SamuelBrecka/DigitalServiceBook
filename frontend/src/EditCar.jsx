import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EditCar() {
    // Získa ID z URL adresy (budeš potrebovať na fetch z backendu)
    const { id } = useParams();

    // Mock dáta, ktoré by si neskôr natiahol z backendu podľa ID
    const [carData, setCarData] = useState({
        vin: 'TMBXXXXXX12345678',
        licensePlate: 'BL-123XY',
        brand: 'Škoda',
        model: 'Octavia',
        manufactureYear: 2018,
        engineCapacity: 2.0,
        fuelType: 'DIESEL',
        color: 'Biela',
        mileage: 154000,
        lastServiceDate: '2023-10-10',
        nextStkDate: '2025-10-15'
    });

    // Tu si neskôr dopíšeš funkciu na ukladanie zmien
    const handleSave = (e) => {
        e.preventDefault();
        console.log("Ukladám dáta: ", carData);
    };

    return (
        <div className="min-h-screen bg-base-100 p-8 text-neutral">

            {/* Navigácia späť */}
            <div className="mb-6">
                <Link to="/garage" className="btn btn-ghost btn-sm text-secondary">
                    &larr; Späť do garáže
                </Link>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border-t-8 border-primary">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h2 className="text-3xl font-bold text-primary">Detail vozidla</h2>
                    <div className="badge badge-accent badge-lg font-bold">{carData.licensePlate}</div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">

                    {/* Sekcia 1: Základné údaje */}
                    <div>
                        <h3 className="text-xl font-semibold text-secondary mb-4">Základné údaje</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Značka</span></label>
                                <input type="text" value={carData.brand} className="input input-bordered input-primary w-full" readOnly />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Model</span></label>
                                <input type="text" value={carData.model} className="input input-bordered input-primary w-full" readOnly />
                            </div>
                            <div className="form-control md:col-span-2">
                                <label className="label"><span className="label-text font-bold">VIN číslo</span></label>
                                <input type="text" value={carData.vin} className="input input-bordered input-primary w-full font-mono bg-base-200" readOnly />
                            </div>
                        </div>
                    </div>

                    {/* Sekcia 2: Technické a prevádzkové údaje (Upraviteľné) */}
                    <div>
                        <h3 className="text-xl font-semibold text-secondary mb-4 mt-8">Technické a prevádzkové údaje</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">EČV (ŠPZ)</span></label>
                                <input type="text" value={carData.licensePlate} onChange={(e) => setCarData({...carData, licensePlate: e.target.value})} className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Rok výroby</span></label>
                                <input type="number" value={carData.manufactureYear} onChange={(e) => setCarData({...carData, manufactureYear: e.target.value})} className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Nájazd (km)</span></label>
                                <input type="number" value={carData.mileage} onChange={(e) => setCarData({...carData, mileage: e.target.value})} className="input input-bordered w-full" />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Objem motora (l)</span></label>
                                <input type="number" step="0.1" value={carData.engineCapacity} onChange={(e) => setCarData({...carData, engineCapacity: e.target.value})} className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Palivo</span></label>
                                <select value={carData.fuelType} onChange={(e) => setCarData({...carData, fuelType: e.target.value})} className="select select-bordered w-full">
                                    <option value="PETROL">Benzín (Petrol)</option>
                                    <option value="DIESEL">Nafta (Diesel)</option>
                                    <option value="ELECTRIC">Elektrina</option>
                                    <option value="HYBRID">Hybrid</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Farba</span></label>
                                <input type="text" value={carData.color} onChange={(e) => setCarData({...carData, color: e.target.value})} className="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Sekcia 3: Dátumy */}
                    <div>
                        <h3 className="text-xl font-semibold text-secondary mb-4 mt-8">Termíny a servis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Posledný servis</span></label>
                                <input type="date" value={carData.lastServiceDate} onChange={(e) => setCarData({...carData, lastServiceDate: e.target.value})} className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-bold">Platnosť STK/EK do</span></label>
                                <input type="date" value={carData.nextStkDate} onChange={(e) => setCarData({...carData, nextStkDate: e.target.value})} className="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Tlačidlá akcií */}
                    <div className="flex justify-between items-center mt-10 pt-6 border-t">
                        <button type="button" className="btn btn-error btn-outline hover:text-white">
                            Odstrániť vozidlo
                        </button>
                        <button type="submit" className="btn btn-primary px-8">
                            Uložiť zmeny
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditCar;