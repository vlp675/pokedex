import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/user";

function User() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getUser();
    if (data) {
      setUser(data.user);
    }
  }

  return (
    <div className="user-container">
      <p><b>User :</b> {user.userName}</p>
      <p><b>Email :</b> {user.email}</p>
      <p><b>Role :</b> {user.role}</p>
      <button onClick={() => navigate("/")}>Retour à la liste</button>
    </div>
  );
}

export default User;
