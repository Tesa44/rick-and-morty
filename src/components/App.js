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

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [numResults, setNumResults] = useState("");

  useEffect(
    function () {
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
          setNumResults(data.info.count);
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
          setNumResults(data.info.count);
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
        <NumResults num={numResults}></NumResults>
      </NavBar>

      <Main>
        <Box className={"box-character-list"}>
          {isLoading && <Loader></Loader>}
          {!isLoading && !error && (
            <>
              <CharacterList
                characters={characters}
                onSelectCharacter={setSelectedCharacter}
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
