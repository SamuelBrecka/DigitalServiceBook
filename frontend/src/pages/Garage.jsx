import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { garageService } from '../services/garageService';

function Garage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        try {
            setLoading(true);
            const data = await garageService.getCars();
            setCars(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'OK') {
            return (
                <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    V poriadku
                </span>
            );
        }
        if (status === 'WARNING') {
            return (
                <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
                    STK o 14 dní
                </span>
            );
        }
        return (
            <span className="px-3 py-1 bg-error/10 text-error rounded-full text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                Vyžaduje pozornosť
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Neuvedené';
        const date = new Date(dateString);
        return date.toLocaleDateString('sk-SK', { day: 'numeric', month: 'numeric', year: 'numeric' });
    };

    const vehicleCount = cars.length;
    const upcomingDeadlines = cars.filter(c => c.status === 'WARNING').length;
    const monthlyExpenses = 0;

    return (
        <div className="flex min-h-screen bg-base-100">
            {/* SideNavBar - Desktop */}
            <aside className="hidden md:flex flex-col h-screen p-4 gap-4 bg-surface-container-low border-r border-base-300 w-64 sticky top-0">
                <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                        <span className="material-symbols-outlined">directions_car</span>
                    </div>
                    <div>
                        <h1 className="font-headline-sm text-headline-sm font-bold text-primary">AutoLog</h1>
                        <p className="text-xs text-outline font-label-sm uppercase tracking-wider">Service Book</p>
                    </div>
                </div>
                <nav className="flex-1 flex flex-col gap-1">
                    <Link
                        to="/garage"
                        className="flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-lg px-4 py-2 font-bold transition-all duration-200"
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                        <span className="font-label-md text-label-md">My Garage</span>
                    </Link>
                    <Link
                        to="/service-history"
                        className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">history</span>
                        <span className="font-label-md text-label-md">Service History</span>
                    </Link>
                    <Link
                        to="/expenses"
                        className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">payments</span>
                        <span className="font-label-md text-label-md">Expenses</span>
                    </Link>
                    <Link
                        to="/notifications"
                        className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-200"
                    >
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="font-label-md text-label-md">Notifications</span>
                    </Link>
                    <div className="mt-auto border-t border-base-300 pt-4 flex flex-col gap-1">
                        <Link
                            to="/settings"
                            className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-200"
                        >
                            <span className="material-symbols-outlined">settings</span>
                            <span className="font-label-md text-label-md">Settings</span>
                        </Link>
                        <Link
                            to="/help"
                            className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-200"
                        >
                            <span className="material-symbols-outlined">help</span>
                            <span className="font-label-md text-label-md">Help</span>
                        </Link>
                    </div>
                </nav>
                <div className="mt-4 px-2">
                    <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md shadow-sm hover:opacity-90 active:scale-[0.98] transition-all">
                        Add Vehicle
                    </button>
                </div>
            </aside>

            {/* Main Content Canvas */}
            <main className="flex-1 min-w-0 bg-base-100 p-6 md:p-10 max-w-[1280px] mx-auto">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-primary">Moja garáž</h2>
                        <p className="text-on-surface-variant font-body-md text-body-md">Prehľad a správa vašich vozidiel.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:shadow-md transition-all">
                        <span className="material-symbols-outlined">add</span>
                        Pridať vozidlo
                    </button>
                </header>

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-8">
                        <p className="font-label-md text-label-md">Chyba pri načítavaní vozidiel: {error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Stats Summary - Bento Grid Pattern */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white p-6 rounded-xl border border-base-300 shadow-sm flex items-center gap-5 hover:border-primary/20 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">directions_car</span>
                                </div>
                                <div>
                                    <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-tight">Počet vozidiel</p>
                                    <p className="text-2xl font-bold text-primary">{vehicleCount}</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-base-300 shadow-sm flex items-center gap-5 hover:border-primary/20 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center text-warning">
                                    <span className="material-symbols-outlined">event_note</span>
                                </div>
                                <div>
                                    <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-tight">Blížiace sa termíny</p>
                                    <p className="text-2xl font-bold text-warning">{upcomingDeadlines}</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-base-300 shadow-sm flex items-center gap-5 hover:border-primary/20 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined">payments</span>
                                </div>
                                <div>
                                    <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-tight">Náklady (mesiac)</p>
                                    <p className="text-2xl font-bold text-primary">{monthlyExpenses} €</p>
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Vehicle List Section */}
                            <div className="xl:col-span-2 space-y-6">
                                <h3 className="font-headline-md text-headline-md text-primary px-1">Vozidlá</h3>

                                {cars.length === 0 ? (
                                    <div className="bg-white p-12 rounded-xl border border-base-300 shadow-sm text-center">
                                        <span className="material-symbols-outlined text-5xl text-outline mb-4">directions_car</span>
                                        <p className="text-on-surface-variant font-label-md text-label-md mb-2">Zatiaľ nemáte žiadne vozidlá</p>
                                        <p className="text-outline font-body-sm text-body-sm mb-6">Pridajte svoje prvé vozidlo a začnite sledovať jeho servisnú históriu.</p>
                                        <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:shadow-md transition-all">
                                            Pridať vozidlo
                                        </button>
                                    </div>
                                ) : (
                                    cars.map((car) => (
                                        <div key={car.id} className="group bg-white rounded-xl border border-base-300 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="md:w-64 h-48 md:h-auto overflow-hidden bg-surface-container">
                                                    {car.imageUrl ? (
                                                        <img
                                                            src={car.imageUrl}
                                                            alt={car.name}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-6xl text-outline">directions_car</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 p-6 flex flex-col justify-between">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h4 className="font-headline-sm text-headline-sm text-primary">{car.name}</h4>
                                                            <p className="text-on-surface-variant font-label-md text-label-md font-bold bg-base-200 inline-block px-2 py-1 rounded mt-1">{car.licensePlate}</p>
                                                        </div>
                                                        {getStatusBadge(car.status)}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-base-200">
                                                        <div>
                                                            <p className="text-xs text-outline uppercase font-label-sm">Ďalší servis</p>
                                                            <p className="font-body-md text-body-md font-semibold">{formatDate(car.nextServiceDate)}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <button className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1 justify-end ml-auto">
                                                                Detaily
                                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Recent Activity Section */}
                            <aside className="space-y-6">
                                <h3 className="font-headline-md text-headline-md text-primary px-1">Nedávna aktivita</h3>
                                <div className="bg-white rounded-xl border border-base-300 p-6 shadow-sm">
                                    <div className="space-y-6">
                                        {cars.length === 0 ? (
                                            <p className="text-on-surface-variant font-body-sm text-body-sm text-center py-4">Žiadna aktivita</p>
                                        ) : (
                                            <div className="flex gap-4">
                                                <div className="mt-1 w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info flex-shrink-0">
                                                    <span className="material-symbols-outlined text-base">receipt_long</span>
                                                </div>
                                                <div>
                                                    <p className="font-label-md text-label-md text-primary">Vitajte v AutoLog!</p>
                                                    <p className="text-xs text-on-surface-variant mt-0.5">Pridajte svoje prvé vozidlo</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button className="w-full mt-8 py-2 text-center text-primary font-label-md text-label-md hover:bg-surface-container transition-colors rounded-lg">
                                        Zobraziť všetko
                                    </button>
                                </div>

                                {/* Small context card */}
                                <div className="bg-primary p-6 rounded-xl text-on-primary shadow-sm relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h4 className="font-headline-sm text-headline-sm mb-2">Pripomenutie</h4>
                                        <p className="text-on-primary/80 font-body-sm text-body-sm mb-4">Nezabudnite nahrať poslednú servisnú faktúru pre lepšie sledovanie nákladov.</p>
                                        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all">
                                            Nahrať teraz
                                        </button>
                                    </div>
                                    <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl opacity-10 rotate-12">description</span>
                                </div>
                            </aside>
                        </div>
                    </>
                )}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-base-300 px-4 py-2 flex justify-between items-center z-50">
                <Link to="/garage" className="flex flex-col items-center gap-1 text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                    <span className="text-[10px] font-bold">Garáž</span>
                </Link>
                <Link to="/service-history" className="flex flex-col items-center gap-1 text-outline">
                    <span className="material-symbols-outlined">history</span>
                    <span className="text-[10px]">Servis</span>
                </Link>
                <Link to="/expenses" className="flex flex-col items-center gap-1 text-outline">
                    <span className="material-symbols-outlined">payments</span>
                    <span className="text-[10px]">Náklady</span>
                </Link>
                <Link to="/notifications" className="flex flex-col items-center gap-1 text-outline">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="text-[10px]">Notif.</span>
                </Link>
                <Link to="/profile" className="flex flex-col items-center gap-1 text-outline">
                    <span className="material-symbols-outlined">account_circle</span>
                    <span className="text-[10px]">Profil</span>
                </Link>
            </nav>
        </div>
    );
}

export default Garage;