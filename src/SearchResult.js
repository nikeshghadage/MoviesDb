import React from 'react'
import { useLocation } from 'react-router-dom';
import './PopularMovies.css';
import { useNavigate } from 'react-router-dom';

function SearchResult() {
    const navigate = useNavigate();
    const location = useLocation();
    var data = location.state;

    const onMovie = (item) => {
        console.log(item);
        navigate('/details', { state: item.id });
    }

    return (
        <div className='popularMovies'>
            {
                data.map((item) => (
                    <div className='poster_title'>
                        <img className="image" src={item.img} alt={"movies"} onClick={() => { onMovie(item) }} />

                        <p className='poster_text'>{item.title}</p>
                        <p className='poster_text'>Rating : {item.vote_average}</p>
                    </div>
                )
                )
            }
        </div>
    )
}
export default SearchResult