function getStatusEmoji(status) {
  if (status === "Alive") return "🟢";

  if (status === "Dead") return "🔴";
  else return "⚫";
}

export default function CharacterDetails({ character }) {
  return (
    <div className="character-details">
      <img src={character.image} alt={character.name}></img>
      <div>
        <h2>{character.name}</h2>
        <p>
          {`${getStatusEmoji(character.status)} ${character.status} - ${
            character.species
          }`}
        </p>
      </div>
      <div>
        <span>Last known location:</span>
        <p>{character.location.name}</p>
      </div>
      <div>
        <span>First seen in:</span>
        <p>{character.origin.name}</p>
      </div>
    </div>
  );
}
