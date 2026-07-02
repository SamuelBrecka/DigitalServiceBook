const API_URL = 'http://localhost:8080';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Nesprávny email alebo heslo.');
            }

            return await response.json();
        } catch (error) {
            console.error("Chyba pri prihlasovaní:", error);
            throw error;
        }
    },

    async register(firstName, lastName, email, password) {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Registrácia zlyhala. Skontrolujte zadané údaje.');
        }

        return await response.json();
    }
};