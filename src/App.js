import "./index.css";

export default function App() {
  return (
    <div>
      <NavBar>
        <Logo></Logo>
        <Search></Search>
        <NumResults></NumResults>
      </NavBar>
    </div>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🥼</span>
      <h1>Rick & Morty</h1>
    </div>
  );
}

function Search() {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search characters..."
    ></input>
  );
}

function NumResults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}
