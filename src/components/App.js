import NavBar from "./NavBar";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import Main from "./Main";
import CharacterList from "./CharacterList";
import Box from "./Box";
import CharacterDetails from "./CharacterDetails";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import PaginationBar from "./PaginationBar";

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

const PAGES = 42;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [pages, setPages] = useState(1);

  function handleSelectCharacter(character) {
    setSelectedCharacter(character);
  }

  useEffect(
    function () {
      const randomPage = getRandomInt(PAGES - 1) + 1;
      const controller = new AbortController();
      async function fetchCharacters() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${curPage}`,
            { signal: controller.signal }
          );

          const data = await res.json();
          if (!res.ok) throw new Error(data.error);

          setPages(data.info.pages);
          const { results } = data;
          setCharacters(results);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length === 0) fetchCharacters();

      return function () {
        controller.abort();
      };
    },
    [query, curPage]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchSearchCharacters() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${query}&page=${curPage}`,
            { signal: controller.signal }
          );
          const data = await res.json();

          if (!res.ok) throw new Error(data.error);

          setPages(data.info.pages);
          console.log(data);
          const { results } = data;
          setCharacters(results);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setCharacters([]);
        setError("");
        return;
      }
      fetchSearchCharacters();

      return function () {
        controller.abort();
      };
    },
    [query, curPage]
  );

  useEffect(
    function () {
      setCurPage(1);
    },
    [query]
  );

  return (
    <div>
      <NavBar>
        <Logo></Logo>
        <Search query={query} setQuery={setQuery}></Search>
        <NumResults></NumResults>
      </NavBar>

      <Main>
        <Box className={"box-character-list"}>
          {isLoading && <Loader></Loader>}
          {!isLoading && !error && (
            <>
              <CharacterList
                characters={characters}
                onSelectCharacter={handleSelectCharacter}
              ></CharacterList>
              <PaginationBar
                pages={pages}
                curPage={curPage}
                onSetPage={setCurPage}
              ></PaginationBar>
            </>
          )}
          {error && <ErrorMessage message={error}></ErrorMessage>}
        </Box>
        <Box className={"box-details"}>
          {selectedCharacter ? (
            <CharacterDetails character={selectedCharacter}></CharacterDetails>
          ) : (
            <p className="select-character">Select character to view details</p>
          )}
        </Box>
      </Main>
    </div>
  );
}
