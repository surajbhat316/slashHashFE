import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Search from "./Pages/Search/search";
import Favourites from "./Pages/Favourites/favourites";

function App() {
  return (
    <>
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <Link to="/" class="navbar-brand" href="#hello">
              Navbar
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <Link 
                  to="/"
                  class="nav-link active"
                  aria-current="page"
                >
                  Search
                </Link>
                <Link
                  to="/favourites" 
                  class="nav-link">
                  Favourites
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Search/>}></Route>
        <Route path="/favourites" element={<Favourites/>}></Route>
      </Routes>
    </>
  );
}

export default App;
