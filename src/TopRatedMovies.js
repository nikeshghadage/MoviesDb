import React, { useEffect, useState } from 'react';
import ApiKey from './ApiKey.json';
import axios from 'axios';
import './TopRatedMovies.css';
import { useNavigate } from 'react-router-dom';

function TopRatedMovies() {
    const [topRatedMovies, setTopRatedMoviesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${ApiKey.Key}&language=en-US&page=1`;
        getTopRatedMovies(url);
    }, [])

    const getTopRatedMovies = (url) => {
        axios.get(url).then(res => {
            res.data.results.forEach(a => {
                a.img = `${ApiKey.domainKey}${a.poster_path}`;
            })
            setTopRatedMoviesData(res.data.results);
        })
    }

    const onMovie = (item) => {
        console.log(item);
        navigate('/details', { state: item.id });
    }
    return (
        <div className='topRatedMovies'>
            {
                topRatedMovies.map((item) => (
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
export default TopRatedMovies