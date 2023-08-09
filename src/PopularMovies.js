import React, { useEffect, useState } from 'react';
import ApiKey from './ApiKey.json';
import axios from 'axios';
import './PopularMovies.css';
import { useNavigate } from 'react-router-dom';

function PopularMovies(props) {
    const [popularMovies, setPopularMoviesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey.Key}&language=en-US&page=1`;
        getPopularMovies(url);
    }, [])

    const getPopularMovies = (url) => {
        axios.get(url).then(res => {
            res.data.results.forEach(a => {
                a.img = `${ApiKey.domainKey}${a.poster_path}`;
            })
            setPopularMoviesData(res.data.results);
        })
    }

    const onMovie = (item) => {
        console.log(item);
        navigate('/details', { state: item.id });
    }

    return (
        <div className='popularMovies'>
            {
                popularMovies.map((item) => (
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
export default PopularMovies