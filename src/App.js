import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Nav';
import PopularMovies from './PopularMovies';
import TopRatedMovies from './TopRatedMovies';
import UpcomingMovies from './UpcomingMovies';
import MovieDetails from './MovieDetails';
import SearchResult from './SearchResult';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<PopularMovies />} />
          <Route path='/popular' element={<PopularMovies />} />
          <Route path='/topRated' element={<TopRatedMovies />} />
          <Route path='/upcoming' element={<UpcomingMovies />} />
          <Route path='/details' element={<MovieDetails />} />
          <Route path='/search' element={<SearchResult />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;