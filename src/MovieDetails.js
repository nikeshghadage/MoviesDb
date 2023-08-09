import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ApiKey from './ApiKey.json';
import { useLocation } from 'react-router-dom';
import './MovieDetails.css';
import dateFormat from 'dateformat';

function MovieDetails() {
    const location = useLocation();
    const [movieDetail, setMovieDetails] = useState([]);
    const [castDetails, setCastDetails] = useState([]);
    const [genersDetails, setGenersDetails] = useState([]);

    useEffect(() => {
        let movieId = location.state;
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${ApiKey.Key}&language=en-US`;
        let castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${ApiKey.Key}&language=en-US`;
        getMovieDetails(url);
        getMovieCastDetails(castUrl);
    }, [])

    const getMovieDetails = (url) => {
        axios.get(url).then(res => {
            res.data.img = `${ApiKey.domainKey}${res.data.backdrop_path}`;
            res.data.moviePoster = `${ApiKey.domainKey}${res.data.poster_path}`;
            setMovieDetails(res.data);
            setGenersDetails(res.data.genres);
        })
    }
    
    const getMovieCastDetails = (url) => {
        axios.get(url).then(res => {
            res.data.cast.forEach(a => {
                a.img = `${ApiKey.domainKey}${a.profile_path}`;
            })
            setCastDetails(res.data.cast);
        })
    }

    return (
        <div className='movieDetails'>
            <div class="card">
                <div class="card__content">
                    <div class="split-screen">
                        <div class="split-screen__half">
                            <div className='movie_detail_info'>
                                <div className='movie_poster'>
                                    <img src={movieDetail.moviePoster} alt={"movies"} />
                                </div>
                                <div >
                                    <p className='movie_title'>{movieDetail.title}</p>
                                    <h3 className='rating'>Rating:{movieDetail.vote_average}</h3>
                                    <p className='text_color'>{movieDetail.runtime} min {genersDetails.map((item) => (
                                            <div style={{display:'inline-block',padding:'2px',color:'red'}}> {item.name}, </div>
                                    )
                                    )
                                    } </p>
                                    <p className='text_color'>Release Date: {dateFormat(movieDetail.release_date, "ddd, mmmm dS, yyyy")}<br /></p>
                                </div>
                            </div>
                            <div className='overview_details'>
                                <h1 className='movie_title'>Overview</h1>
                                <p className='text_color'>
                                    {movieDetail.overview}
                                </p>
                            </div>
                        </div>
                        <div class="split-screen__half">
                            <img className='backgroundImage' src={movieDetail.img} alt={"movies"} />
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='text_color'>Cast</h1>
            <div className='cast_details'>
                {
                    castDetails.map((item) => (
                        <div>
                            <img className="cast_image" src={item.img} alt={"cast"} />
                            <p className='poster_text'>{item.original_name}</p>
                            <p className='poster_text'> character : {item.character}</p>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}
export default MovieDetails