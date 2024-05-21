import React, { useEffect, useState } from 'react'
import './Banner.css';
import axios from '../../axios';
import { Api_Key, image_url } from '../../Constants/constants'
import YouTube from 'react-youtube';
import Modal from 'react-modal';
const customStyles = {
    content: {
      width:'70%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px 20px 20px 20px',
    },
  };
function Banner() {
    const [movie, setMovie] = useState()
    const [urlId, setUrlId] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        axios.get(`trending/all/week?api_key=${Api_Key}&language=en-US`).then((Response) => {
            console.log(Response.data.results[0])
            setMovie(Response.data.results[0])
        })
    }, [])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    const getYoutube = (id) => {
        axios.get(`/movie/${id}/videos?language=en-US&api_key=${Api_Key}`).then(Response => {
            if (Response.data.results.length !== 0) {
                console.log(id)
                setIsOpen(true);
                setUrlId(Response.data.results[0])
            } else {
                alert("not found")
            }
        })

    }
    function closeModal() {
        setIsOpen(false);
      }
    return (
        <div style={{ backgroundImage: `url(${movie ? image_url + movie.backdrop_path : ""})` }} className='banner'>
            <div className='content'>
                <h1 className='title'>{movie ? movie.title : null}</h1>
                <div className='banner-buttons'>
                    <button className='button' onClick={() => getYoutube(movie.id)}>Play</button>
                    <button className='button'>MyList</button>
                    
                </div>
                <h1 className='description'>{movie ? movie.overview : null}</h1>
                <div className='fade-bottom'></div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                    <button className='closeButton' onClick={closeModal}>Close</button>
                    <>
                        {urlId && <YouTube opts={opts} videoId={urlId.key} />}
                    </>
                </Modal>
            </div>
        </div>
    )
}

export default Banner
