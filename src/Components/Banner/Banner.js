import React, { useEffect, useState } from 'react'
import './Banner.css';
import axios from '../../axios';
import { Api_Key, image_url } from '../../Constants/constants'
function Banner() {
    const [movie, setMovie] = useState()
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${Api_Key}&language=en-US`).then((Response) => {
            console.log(Response.data.results[0])
            setMovie(Response.data.results[0])
        })
    }, [])
    return (
        <div style={{ backgroundImage: `url(${movie ? image_url + movie.backdrop_path : ""})` }} className='banner'>
            <div className='content'>
                <h1 className='title'>{movie ? movie.title : null}</h1>
                <div className='banner-buttons'>
                    <button className='button'>Play</button>
                    <button className='button'>MyList</button>
                    
                </div>
                <h1 className='description'>{movie ? movie.overview : null}</h1>
                <div className='fade-bottom'></div>
            </div>
        </div>
    )
}

export default Banner
