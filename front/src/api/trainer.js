export async function getTrainer() {
    const url = `http://localhost:3001/api/trainer/`;
    const token = localStorage.getItem("jwt");

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération du dresseur :", error);
        return error;
    }
}
