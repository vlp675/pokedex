export async function getUser() {
    const url = `http://localhost:3001/api/user/`;
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
        console.error("Erreur lors de la récupération de l'user :", error);
        return error;
    }
}
