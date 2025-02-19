import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrainer, updateTrainer, deleteTrainer, createTrainer } from "../api/trainer";

function Trainer() {
  const [trainer, setTrainer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrainer, setEditedTrainer] = useState({});
  const [newTrainer, setNewTrainer] = useState({ trainerName: '', imgUrl: '' });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTrainer();
        if (data?.trainer) {
          setTrainer(data.trainer);
          setEditedTrainer(data.trainer);
        } else {
          setTrainer(null); 
        }
      } catch {
        setTrainer(null);
      }
    }
  
    fetchData();
  }, []);
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedTrainer({ ...editedTrainer, [e.target.name]: e.target.value });
  };

  const handleCreateInputChange = (e) => {
    setNewTrainer({ ...newTrainer, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    try {
      await updateTrainer(editedTrainer);
      setTrainer(editedTrainer);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  const handleCreateClick = async () => {
    try {
      const createdTrainer = await createTrainer(newTrainer);
      window.location.reload();
    } catch (error) {
      console.error("Error creating trainer:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteTrainer(trainer._id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  return (
    <div>
      <p>Bonjour</p>

      {/* If no trainer exists, show the create trainer form */}
      {!trainer ? (
        <div>
          <h2>Créer un nouveau Trainer</h2>
          <label>
            Nom du Trainer:
            <input
              type="text"
              name="trainerName"
              value={newTrainer.trainerName}
              onChange={handleCreateInputChange}
            />
          </label>
          <br />
          <label>
            Image URL:
            <input
              type="text"
              name="imgUrl"
              value={newTrainer.imgUrl}
              onChange={handleCreateInputChange}
            />
          </label>
          <br />
          <button onClick={handleCreateClick}>Créer le Trainer</button>
        </div>
      ) : (
        <>
          {/* If the trainer exists, show the trainer info */}
          {isEditing ? (
            <>
              <label>
                Nom du trainer:
                <input
                  type="text"
                  name="trainerName"
                  value={editedTrainer.trainerName || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Image URL:
                <input
                  type="text"
                  name="imgUrl"
                  value={editedTrainer.imgUrl || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button onClick={handleSaveClick}>Sauvegarder</button>
            </>
          ) : (
            <>
              <p><b>Trainer :</b> {trainer.trainerName}</p>
              <div style={{ borderRadius: "100px", border: "2px solid white", height: "100px", width: "100px", margin: "auto" }}>
                <img src={trainer.imgUrl} alt={trainer.trainerName} width="100" />
              </div>
              <p><b>Pokémon capturé:</b> {trainer.pkmnCatch ? trainer.pkmnCatch.length : 0}</p>
              <p><b>Pokémon vu:</b> {trainer.pkmnSeen ? trainer.pkmnSeen.length : 0}</p>
            </>
          )}

          {!isEditing && <button onClick={handleEditClick}>Modifier le trainer</button>}
          <button onClick={handleDeleteClick}>Supprimer le trainer</button>
          <button onClick={() => navigate("/")}>Retour à la liste</button>
        </>
      )}
    </div>
  );
}

export default Trainer;
