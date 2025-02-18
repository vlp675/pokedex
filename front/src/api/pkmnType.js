export async function getPokemonTypes() {
    const url = `http://localhost:3001/api/pkmn/types`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des types de Pokémons :", error);
        return error;
    }
}