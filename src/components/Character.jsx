export default function Character({ character, onSelectCharacter }) {
  return (
    <li onClick={() => onSelectCharacter(character)}>
      <img src={character.image} alt={character.name}></img>
      <h3>{character.name}</h3>
      <p>From {character.origin.name && character.location.name}</p>
    </li>
  );
}
