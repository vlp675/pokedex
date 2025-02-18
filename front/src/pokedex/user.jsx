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
      <p><b>Trainer :</b> {user.userName}</p>

      <button onClick={() => navigate("/dashboard")}>Retour à la dashboard</button>
    </>
  )
}

export default User
