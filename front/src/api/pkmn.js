export async function getPokemons(partialName, typeOne, typeTwo, page, size) {
    const params = new URLSearchParams();

    if (partialName) params.append("partialName", partialName);
    if (typeOne) params.append("typeOne", typeOne);
    if (typeTwo) params.append("typeTwo", typeTwo);
    if (page) params.append("page", page);
    if (size) params.append("size", size);

    const url = `http://localhost:3001/api/pkmn?${params.toString()}`;

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
        console.error("Erreur lors de la récupération des Pokémons :", error);
        return error;
    }
}

export async function getPokemon(idOrName) {
    const url = `http://localhost:3001/api/pkmn/${idOrName}`;

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
        console.error("Erreur lors de la récupération du Pokémon :", error);
        return error;
    }
}