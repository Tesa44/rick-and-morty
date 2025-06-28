import Character from "./Character";

export default function CharacterList({ characters }) {
  return (
    <ul className="list list-characters">
      {characters?.map((character) => (
        <Character character={character}></Character>
      ))}
    </ul>
  );
}
