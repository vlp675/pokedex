export async function getUser() {
    const url = `http://localhost:3001/api/users/`;
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

export async function addUser(userName, email, password) {
    const url = `http://localhost:3001/api/users/`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName, email, password })
        });

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        return { success: true, message: await response.json() };
    } catch (error) {
        console.error("Erreur lors de l'inscription de l'user :", error);
        return { success: false, message: error.message };
    }
}

export async function checkUser() {
    const url = `http://localhost:3001/api/users/check_user`;
    const token = localStorage.getItem("jwt");

    if (!token) {
        return { isAuthenticated: false };
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        return { isAuthenticated: response.ok };
    } catch (error) {
        console.error("Erreur lors de la vérification de l'user :", error);
        return { isAuthenticated: false };  
    }
}
