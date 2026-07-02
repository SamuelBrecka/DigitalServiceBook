import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
        navigate('/');
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-surface dark:bg-surface-dim border-b border-base-300 dark:border-outline-variant shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center px-margin-md md:px-margin-lg h-16 max-w-[1280px] mx-auto">

                {/* Logo / Brand Identity */}
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                        directions_car
                    </span>
                    <Link className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed" to="/">
                        AutoLog
                    </Link>
                </div>

                {/* Dynamické navigačné prvky */}
                <div className="flex items-center gap-stack-md">
                    {user ? (
                        /* PRIHLÁSENÝ POUŽÍVATEĽ */
                        <div className="flex items-center gap-4">
                            <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-xl">account_circle</span>
                                {`${user.firstName} ${user.lastName}`}
                            </span>
                            <button
                                onClick={handleLogoutClick}
                                className="font-label-md text-label-md text-white bg-error px-4 py-2 rounded-lg hover:opacity-90 transition-all active:scale-[0.98] shadow-sm">
                                Odhlásiť sa
                            </button>
                        </div>
                    ) : (
                        /* ANONYMNÝ POUŽÍVATEĽ */
                        <div className="flex items-center gap-4">
                            <Link
                                className="font-label-md text-label-md text-primary hover:text-secondary transition-colors duration-200 px-4 py-2"
                                to="/login"
                            >
                                Sign In
                            </Link>
                            <Link
                                className="font-label-md text-label-md bg-primary text-on-primary hover:opacity-90 transition-opacity px-6 py-2 rounded-lg"
                                to="/register"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
export default Navbar;