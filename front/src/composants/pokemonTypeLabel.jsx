function PokemonTypeLabel({ type }) {
  return (
    <span
      className="pokemon-type-label d-flex align-items-center justify-content-center"
      style={{ backgroundColor: `var(--type-${type.toLowerCase()})` }}
    >
      {type}
    </span>
  );
}

export default PokemonTypeLabel;
