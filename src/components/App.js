import NavBar from "./NavBar";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import Main from "./Main";
import CharacterList from "./CharacterList";
import Box from "./Box";

const tempCharacters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Earth",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    url: "https://rickandmortyapi.com/api/character/2",
    created: "2017-11-04T18:50:21.651Z",
  },
  {
    id: 183,
    name: "Johnny Depp",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-500A)",
      url: "https://rickandmortyapi.com/api/location/23",
    },
    location: {
      name: "Earth (C-500A)",
      url: "https://rickandmortyapi.com/api/location/23",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/183.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/8"],
    url: "https://rickandmortyapi.com/api/character/183",
    created: "2017-12-29T18:51:29.693Z",
  },
];

function getStatusEmoji(status) {
  if (status === "Alive") return "🟢";

  if (status === "Dead") return "🔴";
  else return "⚫";
}

export default function App() {
  return (
    <div>
      <NavBar>
        <Logo></Logo>
        <Search></Search>
        <NumResults></NumResults>
      </NavBar>

      <Main>
        <Box className={"grid--all-rows"}>
          <CharacterList characters={tempCharacters}></CharacterList>
        </Box>
        <Box>
          <CharacterDetails character={tempCharacters[0]}></CharacterDetails>
        </Box>
      </Main>
    </div>
  );
}

function CharacterDetails({ character }) {
  return (
    <div className="character-details">
      <img src={character.image} alt={character.name}></img>
      <div className="details-container">
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
    </div>
  );
}
