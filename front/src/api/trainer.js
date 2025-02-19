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
        return error;
    }
}

export async function updateTrainer(updatedTrainer) {
    const url = `http://localhost:3001/api/trainer/`;
    const token = localStorage.getItem("jwt");

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedTrainer) 
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du dresseur :", error);
        return error;
    }
}

export async function deleteTrainer(id) {
    const url = `http://localhost:3001/api/trainer/`;
    const token = localStorage.getItem("jwt");

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id }) 
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression du dresseur :", error);
        return error;
    }
}

export async function createTrainer(trainer) {
    const url = `http://localhost:3001/api/trainer/`;
    const token = localStorage.getItem("jwt");

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(trainer) 
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du dresseur :", error);
        return error;
    }
}

export async function markPokemon(pokemonId, isCaptured) {
    const url = `http://localhost:3001/api/trainer/mark`;
    const token = localStorage.getItem("jwt");

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ pokemonId, isCaptured })
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la capture du pokémon :", error);
        return error;
    }
}
