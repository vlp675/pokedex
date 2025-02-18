function PokemonTypeLabel ({ type }) {
    const getTypeColor = (type) => {
      switch (type) {
        case "NORMAL": return "#A8A77A";
        case "FIRE": return "#EE8130";
        case "WATER": return "#6390F0";
        case "GRASS": return "#7AC74C";
        case "ELECTRIC": return "#F7D02C";
        case "ICE": return "#96D9D6";
        case "FIGHTING": return "#C22E28";
        case "POISON": return "#A33EA1";
        case "GROUND": return "#E2BF65";
        case "FLYING": return "#A98FF3";
        case "PSYCHIC": return "#F95587";
        case "BUG": return "#A6B91A";
        case "ROCK": return "#B6A136";
        case "GHOST": return "#735797";
        case "DRAGON": return "#6F35FC";
        case "DARK": return "#705746";
        case "STEEL": return "#B7B7CE";
        case "FAIRY": return "#D685AD";
        default: return "#000";
      }
    };
  
    return (
      <span 
        style={{
          backgroundColor: getTypeColor(type),
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          marginRight: "5px",
          fontWeight: "bold",
        }}
      >
        {type}
      </span>
    );
  };
  
  export default PokemonTypeLabel;
  