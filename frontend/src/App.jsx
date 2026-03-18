import React from 'react';

// Predpokladáme, že máš v main.css alebo app.css importovaný Tailwind a daisyUI,
// a na <html> alebo <body> tagu máš data-theme="mytheme".

const AutoLogHome = () => {
    // Mock dáta pre ukážku "Moje vozidlá" sekcie
    const myVehicles = [
        { id: 1, name: 'Škoda Octavia Combi', plate: 'BL-123XY', nextService: '15. 10. 2024', status: 'ok' },
        { id: 2, name: 'Volkswagen Golf MK8', plate: 'KE-987AB', nextService: '01. 05. 2024', status: 'warning' },
    ];

    return (
        <div className="min-h-screen bg-base-100 text-base-content font-sans">
            {/* --- NAVBAR (vylepšený, BEZ bielych rámikov, tmavý hover) --- */}
            <div className="navbar bg-base-100 sticky top-0 z-50 px-4 md:px-10">
                <div className="flex-1">
                    <a className="text-2xl font-bold text-primary flex items-center gap-2 cursor-pointer no-underline hover:no-underline">
                        {/* Ikona auta (Heroicons) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-1.58-.713-3.185-2.011-4.016L14.97 5.251a6 6 0 0 0-6.942 0L5.04 7.234C3.741 8.065 3 9.67 3 11.25v3M19.5 18.75h-1.125a1.125 1.125 0 0 1-1.125-1.125V14.25m-14.25 0h15" />
                        </svg>
                        Auto<span className="font-light">Log</span>
                    </a>
                </div>
                <div className="flex-none gap-2">
                    {/* Odkazy s tmavým hoverom */}
                    <a className="text-sm font-medium text-base-content/80 hover:text-primary cursor-pointer px-3 py-2 rounded-btn hover:bg-base-200 transition-colors">Ako to funguje?</a>
                    <a className="text-sm font-medium text-base-content/80 hover:text-primary cursor-pointer px-3 py-2 rounded-btn hover:bg-base-200 transition-colors">Cenník</a>
                    <div className="border-l border-base-300 h-6 mx-2"></div>
                    {/* Hlavné tlačidlo: BEZ bieleho rámika, tmavší hover */}
                    <button className="btn btn-primary btn-sm rounded-btn text-white border-transparent hover:bg-primary/90 hover:border-transparent no-animation">Vytvoriť účet</button>
                </div>
            </div>

            {/* --- HERO SEKICA (Tlačidlá BEZ rámikov, tmavý hover) --- */}
            <div className="hero bg-base-200 py-20 px-4">
                <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl">
                    <div className="mockup-window border bg-base-100 shadow-2xl w-full lg:w-1/2 border-base-300">
                        <div className="flex justify-center px-4 py-16 bg-base-200 border-t border-base-300">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-accent">SK</div>
                                <div className="mt-2 text-xl">Digitálna Knižka</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:pr-12 text-center lg:text-left">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight">
                            Vaša servisná história <br />
                            <span className="text-secondary">vždy po ruke a online.</span>
                        </h1>
                        <p className="py-8 text-xl text-base-content/80 max-w-2xl mx-auto lg:mx-0">
                            Zabudnite na stratené papierové knižky. Evidujte opravy, tankovania a termíny STK na jednom bezpečnom mieste. Zvýšte hodnotu svojho vozidla pri predaji.
                        </p>
                        <div className="flex gap-4 justify-center lg:justify-start">
                            {/* Primárne tlačidlo: BEZ rámika, tmavší hover */}
                            <button className="btn btn-primary btn-lg rounded-btn shadow-lg text-white border-transparent hover:bg-primary/90 hover:border-transparent">Začať zadarmo</button>
                            {/* Ghost tlačidlo: tmavší hover */}
                            <button className="btn btn-ghost btn-lg text-primary gap-2 hover:bg-base-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                </svg>
                                Pozrieť demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FUNKCIE (Grid, nezmenené) --- */}
            <div className="py-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-primary">Všetko pre vaše auto na jednom mieste</h2>
                    <p className="text-lg text-base-content/70 mt-4">Jednoduché nástroje pre moderného vodiča.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-accent transition-all duration-300 rounded-box">
                        <figure className="px-8 pt-8 text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 bg-accent/20 p-3 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83m0 0a2.652 2.652 0 11-3.748-3.748 2.652 2.652 0 013.748 3.748zm-4.963-4.963L4.5 1.5M1.5 4.5l6.736 6.736" />
                            </svg>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h3 className="card-title text-primary text-2xl">História opráv</h3>
                            <p>Zaznamenávajte každý servisný úkon, výmenu oleja alebo opravu. Nahrajte faktúry a fotky.</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-accent transition-all duration-300 rounded-box">
                        <figure className="px-8 pt-8 text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 bg-accent/20 p-3 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.7c0 2.016-.673 3.993-1.857 5.579a7.952 7.952 0 01-1.183 1.226 2.25 2.25 0 001.423 3.69h12.048a2.25 2.25 0 001.423-3.69z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5a1.5 1.5 0 01-3 0" />
                            </svg>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h3 className="card-title text-primary text-2xl">Pripomienky</h3>
                            <p>Už nikdy nezabudnete na STK, EK, zmenu pneumatík alebo ročnú prehliadku. Upozorníme vás včas.</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-accent transition-all duration-300 rounded-box">
                        <figure className="px-8 pt-8 text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 bg-accent/20 p-3 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m1.5-1.5h.75m1.5 0h.75m1.5 0h.75m1.5 0h.75M6 1.5h12a3 3 0 013 3 3 3 0 01-3 3H6a3 3 0 01-3-3 3 3 0 013-3z" />
                            </svg>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h3 className="card-title text-primary text-2xl">Spotreba a náklady</h3>
                            <p>Sledujte svoje výdavky na palivo a prevádzku. Získajte prehľadné štatistiky a grafy.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DASHBOARD MOCKUP (Tlačidlá BEZ rámikov, tmavý hover) --- */}
            <div className="py-24 bg-base-300 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/3 text-center md:text-left">
                            <div className="badge badge-accent badge-lg rounded-badge font-semibold text-accent-content mb-4">Dashboard</div>
                            <h2 className="text-4xl font-bold text-primary mb-6">Majte prehľad o celom vozovom parku</h2>
                            <p className="text-lg text-base-content/80 mb-8">Či už máte jedno auto alebo firmu s viacerými vozidlami, naše rozhranie sa vám prispôsobí.</p>
                            {/* Sekundárne tlačidlo: BEZ rámika, tmavší hover */}
                            <button className="btn btn-secondary rounded-btn text-white border-transparent hover:bg-secondary/90 hover:border-transparent">Vyskúšať rozhranie</button>
                        </div>

                        <div className="md:w-2/3 w-full bg-base-100 p-6 shadow-2xl rounded-box border border-base-300">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-primary">Moje vozidlá</h3>
                                {/* Primárne tlačidlo: BEZ rámika, tmavší hover */}
                                <button className="btn btn-primary btn-sm rounded-btn gap-2 text-white border-transparent hover:bg-primary/90 hover:border-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Pridať auto
                                </button>
                            </div>

                            <div className="space-y-4">
                                {myVehicles.map(car => (
                                    <div key={car.id} className="flex items-center gap-4 p-4 bg-base-200 rounded-btn border border-base-300 hover:bg-base-300 transition-colors cursor-pointer relative overflow-hidden group">
                                        <div className="avatar placeholder">
                                            <div className="bg-primary text-primary-content rounded-full w-12 h-12">
                                                <span className="text-xl">{car.name.substring(0,1)}</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-2 items-center z-10">
                                            <div>
                                                <div className="font-bold text-primary">{car.name}</div>
                                                <div className="text-sm opacity-70">{car.plate}</div>
                                            </div>
                                            <div className="text-sm">
                                                <span className="opacity-70">Najbližší servis:</span> <br />
                                                <span className="font-semibold">{car.nextService}</span>
                                            </div>
                                            <div>
                                                {car.status === 'ok' && <div className="badge badge-success badge-sm rounded-badge text-white">V poriadku</div>}
                                                {car.status === 'warning' && <div className="badge badge-warning badge-sm rounded-badge text-warning-content">Blíži sa servis</div>}
                                            </div>
                                            <div className="text-right">
                                                {/* Ghost tlačidlo: tmavší hover */}
                                                <button className="btn btn-ghost btn-xs text-secondary hover:bg-base-300 group-hover:bg-base-300 transition-colors">Detail</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CTA (Tlačidlo BEZ rámika, tmavý hover) --- */}
            <div className="py-24 px-4 bg-primary text-primary-content text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Pripravený prejsť na digitál?</h2>
                    <p className="text-xl opacity-90 mb-10">Vytvorenie účtu trvá menej ako minútu. Prvé vozidlo máte navždy zadarmo.</p>
                    {/* Accent tlačidlo: BEZ rámika, tmavý hover */}
                    <button className="btn btn-accent btn-lg rounded-btn shadow-lg px-12 text-accent-content border-transparent hover:bg-primary hover:text-white hover:border-transparent transition-colors">Zaregistrovať sa bezplatne</button>
                </div>
            </div>

            {/* --- FOOTER (Nezmenený, horizontálne rozloženie) --- */}
            <footer className="footer px-4 md:px-10 py-16 bg-base-200 text-base-content border-t border-base-300">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 w-full">

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <a className="text-3xl font-bold text-primary flex items-center gap-2 cursor-pointer no-underline hover:no-underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-secondary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-1.58-.713-3.185-2.011-4.016L14.97 5.251a6 6 0 0 0-6.942 0L5.04 7.234C3.741 8.065 3 9.67 3 11.25v3M19.5 18.75h-1.125a1.125 1.125 0 0 1-1.125-1.125V14.25m-14.25 0h15" />
                            </svg>
                            Auto<span className="font-light">Log</span>
                        </a>
                        <p className="text-base-content/80 max-w-sm">Moderná evidencia pre vaše vozidlá. Zvýšte hodnotu svojho auta pri predaji.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-primary mb-1">Produkt</span>
                        <a className="link link-hover text-base-content/80 text-sm">Funkcie</a>
                        <a className="link link-hover text-base-content/80 text-sm">Cenník</a>
                        <a className="link link-hover text-base-content/80 text-sm">Zabezpečenie</a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-primary mb-1">Firma</span>
                        <a className="link link-hover text-base-content/80 text-sm">O nás</a>
                        <a className="link link-hover text-base-content/80 text-sm">Blog</a>
                        <a className="link link-hover text-base-content/80 text-sm">Kontakt</a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-primary mb-1">Právne</span>
                        <a className="link link-hover text-base-content/80 text-sm">Obchodné podmienky</a>
                        <a className="link link-hover text-base-content/80 text-sm">GDPR</a>
                        <a className="link link-hover text-base-content/80 text-sm">Reklamácie</a>
                    </div>
                </div>
            </footer>

            {/* --- SPODNÁ ČASŤ FOOTERA (Copyright a sociálne siete) --- */}
            <footer className="footer px-4 md:px-10 py-6 border-t bg-base-200 text-base-content border-base-300">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 w-full text-sm text-base-content/70">
                    <div>
                        <p>© 2023 - Vytvorené s ❤️ na Slovensku. Všetky práva vyhradené.</p>
                    </div>
                    <div className="flex gap-5">
                        <a className="cursor-pointer hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-secondary"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                        <a className="cursor-pointer hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-secondary"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                        <a className="cursor-pointer hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-secondary"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AutoLogHome;