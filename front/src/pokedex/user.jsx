import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../api/user";

function User() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getUser();
      if (data) {
        setUser(data.user);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <p>Bonjour</p>
      <p><b>User :</b> {user.userName}</p>
      <p><b>Email :</b> {user.email}</p>
      <p><b>Role :</b> {user.role}</p>

      <button onClick={() => navigate("/")}>Retour à la liste</button>
    </>
  )
}

export default User
