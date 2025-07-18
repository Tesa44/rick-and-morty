import Character from "./Character";

export default function CharacterList({ characters, onSelectCharacter }) {
  return (
    <ul className="list list-characters">
      {characters?.map((character) => (
        <Character
          character={character}
          key={character.id}
          onSelectCharacter={onSelectCharacter}
        ></Character>
      ))}
    </ul>
  );
}
