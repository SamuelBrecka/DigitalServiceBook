const API_URL = "http://localhost:8080";

const getAuthHeader = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const garageService = {
  getCars: async () => {
    try {
      const response = await fetch(`${API_URL}/api/cars`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return [];
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Nepodarilo sa načítať vozidlá.");
      }

      return await response.json();
    } catch (error) {
      console.error("Chyba pri načítavaní vozidiel:", error);
      throw error;
    }
  },

  getCar: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/cars/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Nepodarilo sa načítať vozidlo.");
      }

      return await response.json();
    } catch (error) {
      console.error("Chyba pri načítavaní vozidla:", error);
      throw error;
    }
  },

  createCar: async (carData) => {
    try {
      const response = await fetch(`${API_URL}/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Chyba servera (${response.status}):`, errorText);
        throw new Error(
          `Server vrátil kód ${response.status}: ${errorText || response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Chyba pri vytváraní vozidla:", error);
      throw error;
    }
  },

  updateCar: async (id, carData) => {
    try {
      const response = await fetch(`${API_URL}/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Nepodarilo sa aktualizovať vozidlo.",
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Chyba pri aktualizácii vozidla:", error);
      throw error;
    }
  },

  deleteCar: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Nepodarilo sa odstrániť vozidlo.",
        );
      }

      return true;
    } catch (error) {
      console.error("Chyba pri odstraňovaní vozidla:", error);
      throw error;
    }
  },
};
