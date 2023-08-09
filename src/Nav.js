import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import ApiKey from './ApiKey.json';
import axios from 'axios';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serchedResult, setSerchedResult] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const navigate = useNavigate();

  const onChangeSearch = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }

  const onSearch = () => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey.Key}&language=en-US&query=${searchValue}&page=1`;
    getSearchedMovies(url);
  }

  const getSearchedMovies = (url) => {
    axios.get(url).then(res => {
      res.data.results.forEach(a => {
        a.img = `${ApiKey.domainKey}${a.poster_path}`;
      })
      setSerchedResult(res.data.results);
      onMovie(res.data.results)
    })
  }

  const onMovie = (data) => {
    console.log(data);
    navigate('/search', { state: data });
  }

  return (
    <nav>
      <Link to="/" className='title'>Movies DB</Link>
      <div className="menu" onClick={() => {
        setMenuOpen(!menuOpen);
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/popular">Popular</NavLink>
        </li>
        <li>
          <NavLink to="/topRated">Top Rated</NavLink>
        </li>
        <li>
          <NavLink to="/upcoming">Upcoming</NavLink>
        </li>
        <li>
          <input type="search" id="gSearch" name="gSearch" onChange={onChangeSearch} />
        </li>
        <li>
          <button type="button" onClick={() => { onSearch() }}>Search</button>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;