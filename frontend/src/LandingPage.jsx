import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="bg-base-100 text-on-surface font-body-md antialiased min-h-screen">

            {/* TopNavBar */}
            <header className="docked full-width top-0 sticky bg-surface/90 backdrop-blur-md z-50 border-b border-base-300 shadow-sm">
                <nav className="flex justify-between items-center w-full px-margin-sm md:px-margin-lg h-16 max-w-[1280px] mx-auto">
                    <div className="flex items-center gap-8">
                        <span className="font-headline-md text-headline-md font-bold text-primary">AutoLog</span>
                        <div className="hidden md:flex gap-6">
                            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#features">Ako to funguje?</a>
                            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#pricing">Cenník</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link className="font-label-md text-label-md text-on-surface-variant px-4 py-2 hover:bg-surface-container-low transition-colors rounded-lg" to="/login">
                            Prihlásiť sa
                        </Link>
                        <Link className="font-label-md text-label-md bg-primary text-on-primary px-5 py-2.5 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all" to="/register">
                            Vytvoriť účet
                        </Link>
                    </div>
                </nav>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-20 pb-32 px-margin-sm md:px-margin-lg max-w-[1280px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="z-10">
                            <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm mb-6 uppercase tracking-wider">Revolúcia v servise</span>
                            <h1 className="font-headline-xl text-headline-xl md:text-5xl lg:text-6xl text-primary mb-6 leading-tight">
                                Vaša servisná história <br />
                                <span className="text-secondary">vždy po ruke a online</span>
                            </h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
                                Zvýšte hodnotu svojho vozidla pri predaji vďaka transparentnej digitálnej histórii. Už žiadne hľadanie papierových faktúr a stratené servisné knižky.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/register" className="px-10 py-5 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                                    Začať zadarmo
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-secondary/10 rounded-full blur-3xl"></div>
                            <div className="relative glass-card rounded-3xl p-4 shadow-2xl border border-base-300 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="rounded-2xl w-full bg-base-200 aspect-video flex items-center justify-center p-6 border-2 border-dashed border-base-300 shadow-inner">
                                    <div className="text-center">
                                        <span className="material-symbols-outlined text-4xl text-secondary mb-2">dashboard</span>
                                        <p className="font-label-md text-primary font-semibold">Dashboard Preview Placeholder</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Bento Section */}
                <section id="features" className="bg-base-200 py-24 px-margin-sm md:px-margin-lg">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Všetko pre vaše auto na jednom mieste</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                                AutoLog je navrhnutý tak, aby zjednodušil správu vozidla pre jednotlivcov aj správcov vozových parkov.
                            </p>
                        </div>
                        <div className="bento-grid">
                            {/* Feature Card 1 */}
                            <div className="bg-surface rounded-3xl p-8 border border-base-300 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-14 h-14 bg-primary-container/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl" data-icon="build">build</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-primary mb-3">História opráv</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Kompletný prehľad všetkých servisných úkonov, od výmeny oleja až po generálnu opravu motora. S možnosťou nahrať fotografie faktúr.
                                </p>
                            </div>
                            {/* Feature Card 2 */}
                            <div className="bg-surface rounded-3xl p-8 border border-base-300 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl" data-icon="notifications">notifications</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-primary mb-3">Pripomienky</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Nikdy nezmeškáte STK, EK alebo termín výmeny rozvodov. Naša inteligentná notifikácia vás včas upozorní e-mailom alebo správou.
                                </p>
                            </div>
                            {/* Feature Card 3 */}
                            <div className="bg-surface rounded-3xl p-8 border border-base-300 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-14 h-14 bg-tertiary-container/10 text-tertiary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl" data-icon="analytics">analytics</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-primary mb-3">Spotreba a náklady</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Sledujte svoje reálne náklady na prevádzku. Automatické grafy spotreby paliva a prehľad celkových investícií do vozidla.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dashboard Preview Section */}
                <section className="py-24 px-margin-sm md:px-margin-lg max-w-[1280px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/3">
                            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Moje vozidlá</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                                Váš digitálny vozový park prehľadne a na jednom mieste. Sledujte stav každého auta jediným pohľadom.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-white border border-base-300 rounded-xl">
                                    <span className="material-symbols-outlined text-success" data-icon="check_circle">check_circle</span>
                                    <div>
                                        <p className="font-label-md text-label-md">Pripravené na jazdu</p>
                                        <p className="text-[12px] text-on-surface-variant">Všetky termíny sú aktuálne</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white border border-base-300 rounded-xl">
                                    <span className="material-symbols-outlined text-warning" data-icon="warning">warning</span>
                                    <div>
                                        <p className="font-label-md text-label-md">Vyžaduje pozornosť</p>
                                        <p className="text-[12px] text-on-surface-variant">Blížiaci sa termín servisu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-2/3 w-full">
                            <div className="bg-surface border border-base-300 rounded-3xl overflow-hidden shadow-xl">
                                <div className="bg-white px-6 py-4 border-b border-base-300 flex justify-between items-center">
                                    <h4 className="font-label-md text-label-md text-primary">Zoznam vozidiel</h4>
                                    <button className="text-secondary flex items-center gap-1 font-label-sm text-label-sm">
                                        <span className="material-symbols-outlined text-sm" data-icon="add">add</span> Pridať vozidlo
                                    </button>
                                </div>
                                <div className="divide-y divide-base-300">
                                    {/* Vehicle 1 */}
                                    <div className="p-6 flex items-center justify-between hover:bg-base-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 bg-base-200 rounded-lg flex items-center justify-center overflow-hidden text-gray-400">
                                                <span className="material-symbols-outlined">directions_car</span>
                                            </div>
                                            <div>
                                                <h5 className="font-label-md text-label-md text-on-surface">Škoda Octavia Combi</h5>
                                                <p className="font-label-sm text-label-sm text-on-surface-variant">BA-123XY • 142,500 km</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 rounded-full bg-success/10 text-success font-label-sm text-label-sm flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>fiber_manual_record</span>
                                                V poriadku
                                            </span>
                                            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary" data-icon="more_vert">more_vert</button>
                                        </div>
                                    </div>
                                    {/* Vehicle 2 */}
                                    <div className="p-6 flex items-center justify-between hover:bg-base-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 bg-base-200 rounded-lg flex items-center justify-center overflow-hidden text-gray-400">
                                                <span className="material-symbols-outlined">directions_car</span>
                                            </div>
                                            <div>
                                                <h5 className="font-label-md text-label-md text-on-surface">Volkswagen Golf MK8</h5>
                                                <p className="font-label-sm text-label-sm text-on-surface-variant">BL-999ZZ • 24,100 km</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 rounded-full bg-warning/10 text-warning font-label-sm text-label-sm flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>fiber_manual_record</span>
                                                STK o 14 dní
                                            </span>
                                            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary" data-icon="more_vert">more_vert</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="pricing" className="py-24 px-margin-sm md:px-margin-lg bg-primary text-on-primary text-center">
                    <div className="max-w-[1280px] mx-auto">
                        <h2 className="font-headline-xl text-headline-xl mb-6">Pripravený prejsť na digitál?</h2>
                        <p className="font-body-lg text-body-lg text-primary-fixed-dim mb-10 max-w-xl mx-auto opacity-90">
                            Pridajte sa k tisícom spokojných majiteľov áut, ktorí majú svoju servisnú históriu pod kontrolou.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/register" className="px-10 py-4 bg-white text-primary rounded-xl font-label-md text-label-md shadow-lg hover:scale-105 transition-transform">
                                Založiť účet zadarmo
                            </Link>
                            <button className="px-10 py-4 border border-primary-fixed-dim text-white rounded-xl font-label-md text-label-md hover:bg-white/10 transition-colors">
                                Kontaktovať podporu
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-margin-md px-margin-sm md:px-margin-lg bg-base-100 border-t border-base-300">
                <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
                    <div className="col-span-2">
                        <span className="font-headline-sm text-headline-sm font-bold text-primary mb-4 block">AutoLog</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 max-w-xs">
                            Váš dôveryhodný partner pre správu vozidiel. Budujeme budúcnosť automobilového servisu.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full border border-base-300 flex items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-all" href="#">
                                <span className="material-symbols-outlined text-lg">public</span>
                            </a>
                            <a className="w-10 h-10 rounded-full border border-base-300 flex items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-all" href="#">
                                <span className="material-symbols-outlined text-lg">share</span>
                            </a>
                            <a className="w-10 h-10 rounded-full border border-base-300 flex items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-all" href="#">
                                <span className="material-symbols-outlined text-lg">forum</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">Produkt</h4>
                        <ul className="space-y-2">
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Funkcie</a></li>
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Cenník</a></li>
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Mobilná aplikácia</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">Firma</h4>
                        <ul className="space-y-2">
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">O nás</a></li>
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Kariéra</a></li>
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">Právne</h4>
                        <ul className="space-y-2">
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Ochrana údajov</a></li>
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Podmienky</a></li>
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Cookies</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">Podpora</h4>
                        <ul className="space-y-2">
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Centrum pomoci</a></li>
                            <li><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Kontakt</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">© 2026 AutoLog. Všetky práva vyhradené.</p>
                    <div className="flex items-center gap-6">
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">language</span> Slovenčina
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;