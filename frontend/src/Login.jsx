import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logiku API volania (fetch) si sem už dopíšeš sám
        console.log("Odosielam login:", { email, password });

        // Príklad volania callbacku po úspešnom prihlásení:
        // onLogin(userData);
    };

    return (
        <div className="bg-base-100 min-h-screen flex flex-col font-body-md antialiased text-on-surface">

            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 bg-surface border-b border-base-300 shadow-sm">
                <div className="flex justify-between items-center px-margin-md md:px-margin-lg h-16 max-w-[1280px] mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-3xl">directions_car</span>
                        <span className="font-headline-md text-headline-md font-bold text-primary">AutoLog</span>
                    </div>
                    <div className="flex items-center gap-stack-md">
                        <div className="flex items-center gap-4">
                            <Link className="font-label-md text-label-md text-primary hover:text-secondary transition-colors duration-200" to="/login">
                                Sign In
                            </Link>
                            <Link className="font-label-md text-label-md text-white bg-primary px-4 py-2 rounded-lg hover:bg-secondary transition-colors duration-200" to="/register">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content: Login Canvas */}
            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-margin-sm">
                <div className="w-full max-w-md bg-white rounded-lg p-8 login-card">

                    {/* Logo and Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-container rounded-full mb-4">
                            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>dataset</span>
                        </div>
                        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Prihlásenie</h1>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Vitajte späť vo vašej digitálnej servisnej knižke.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">mail</span>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-body-md text-body-md text-on-surface"
                                    id="email"
                                    type="email"
                                    placeholder="vas@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Heslo</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">lock</span>
                                <input
                                    className="w-full pl-10 pr-12 py-3 bg-white border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-body-md text-body-md text-on-surface"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input className="peer appearance-none w-5 h-5 border border-base-300 rounded bg-white checked:bg-primary checked:border-primary transition-all" type="checkbox" />
                                    <span className="material-symbols-outlined absolute text-white text-[16px] opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">check</span>
                                </div>
                                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface">Zapamätať si ma</span>
                            </label>
                            <a className="font-label-md text-label-md text-primary hover:text-secondary transition-colors" href="#">Zabudli ste heslo?</a>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full py-4 bg-primary-container text-white rounded-lg font-label-md text-label-md hover:bg-primary transition-all active:scale-[0.98] shadow-sm" type="submit">
                            Prihlásiť sa
                        </button>
                    </form>

                    {/* Registration Footer */}
                    <div className="mt-8 pt-6 border-t border-base-200 text-center">
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Ešte nemáte účet?
                            <Link className="font-label-md text-label-md text-primary hover:underline ml-1" to="/register">Zaregistrujte sa</Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-surface-container border-t border-base-300 mt-auto"></footer>
        </div>
    );
}

export default Login;