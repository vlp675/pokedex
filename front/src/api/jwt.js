export async function login(email, password) {
    const url = `http://localhost:3001/api/login`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      localStorage.setItem("jwt", data.token);
      return data;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }