import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrainer } from "../api/trainer";

function Trainer() {
  const [trainer, setTrainer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getTrainer();
      if (data) {
        setTrainer(data.trainer);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <p>Bonjour</p>
      <p><b>Trainer :</b> {trainer.trainerName}</p>

      <button onClick={() => navigate("/dashboard")}>Retour à la dashboard</button>
    </>
  )
}

export default Trainer
