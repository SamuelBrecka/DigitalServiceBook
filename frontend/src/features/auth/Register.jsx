import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Pridaný useNavigate import
import { authService } from "../../services/authService.js";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Pridaný stav pre potvrdenie hesla
    const [termsAccepted, setTermsAccepted] = useState(false); // Pridaný stav pre podmienky
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); // Inicializácia navigácie

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Klientská validácia: Zhoda hesiel
        if (password !== confirmPassword) {
            setError('Heslá se nezhodujú.');
            return;
        }

        setIsLoading(true);

        try {
            await authService.register(firstName, lastName, email, password);
            setSuccess(true);

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.message || 'Registrácia zlyhala. Skúste to znova.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background font-body-md antialiased text-on-surface">
            {/* Main Content: Registration Section */}
            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-margin-sm relative">

                {/* Abstract Background element */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary-fixed blur-3xl"></div>
                    <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] rounded-full bg-secondary-fixed blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-md bg-surface-container-lowest border border-base-300 rounded-xl shadow-md p-margin-md md:p-margin-md z-10 transition-all hover:shadow-lg">

                    {/* Brand Identity Header */}
                    <div className="text-center mb-stack-lg">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-container text-white mb-stack-sm">
                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>how_to_reg</span>
                        </div>
                        <h1 className="font-headline-md text-headline-md text-on-surface mb-stack-xs">Vytvoriť účet</h1>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Vaša digitálna servisná knižka vždy po ruke.</p>
                    </div>

                    {/* Zobrazenie chybovej hlášky */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg font-body-sm text-sm flex items-center gap-2 border border-red-200">
                            <span className="material-symbols-outlined text-xl">error</span>
                            {error}
                        </div>
                    )}

                    {/* Zobrazenie úspešnej hlášky */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg font-body-sm text-sm flex items-center gap-2 border border-green-200">
                            <span className="material-symbols-outlined text-xl">check_circle</span>
                            Účet úspešne vytvorený! Presmerovávam...
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">

                        {/* Full Name Field */}
                        <div className="grid grid-cols-2 gap-stack-md">
                            <div className="flex flex-col gap-stack-xs">
                                <label className="font-label-md text-label-md text-on-surface" htmlFor="first-name">Meno</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">person</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-base-300 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                        id="first-name"
                                        type="text"
                                        placeholder="Janko"
                                        required
                                        disabled={isLoading || success}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-stack-xs">
                                <label className="font-label-md text-label-md text-on-surface" htmlFor="last-name">Priezvisko</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">person</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-base-300 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                        id="last-name"
                                        type="text"
                                        placeholder="Hraško"
                                        required
                                        disabled={isLoading || success}
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-stack-xs">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">mail</span>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-base-300 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    id="email"
                                    type="email"
                                    placeholder="vas@email.com"
                                    required
                                    disabled={isLoading || success}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-stack-xs">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Heslo</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">lock</span>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-base-300 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading || success}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="flex flex-col gap-stack-xs">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="confirm-password">Potvrdenie hesla</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">lock_reset</span>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-base-300 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    id="confirm-password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading || success}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-stack-sm mt-stack-xs">
                            <input
                                className="custom-checkbox mt-1 h-4 w-4 rounded border-base-300 text-primary-container focus:ring-secondary"
                                id="terms"
                                type="checkbox"
                                required
                                disabled={isLoading || success}
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label className="font-body-sm text-body-sm text-on-surface-variant select-none cursor-pointer" htmlFor="terms">
                                Súhlasím s <a className="text-primary font-bold hover:underline" href="#">obchodnými podmienkami</a> a spracovaním osobných údajov.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="mt-stack-sm w-full bg-primary-container text-white py-3 px-6 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center justify-center gap-stack-sm disabled:opacity-70 disabled:pointer-events-none"
                            type="submit"
                            disabled={isLoading || success}
                        >
                            {isLoading ? "Vytváram účet..." : "Zaregistrovať sa"}
                            {!isLoading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-stack-lg border-t border-base-300 pt-stack-md">
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Už máte účet?
                            <Link className="text-primary font-bold hover:underline ml-1" to="/login">Prihláste sa</Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-surface-container dark:bg-surface-container-high border-t border-base-300 dark:border-outline-variant"></footer>
        </div>
    );
}

export default Register;