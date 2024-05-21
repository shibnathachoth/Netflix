import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import './RowPost.css';
import axios from '../../axios';
import { Api_Key, image_url } from '../../Constants/constants';
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
function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        axios.get(props.url).then(Response => {
            console.log(Response.data)
            setMovies(Response.data.results)
        }).catch(err => {
            // alert('Network error')
        })
    }, []

    )
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
        <div className='row'>
            <h2 className='title'>{props.title}</h2>
            <div className='posters'>

                {movies.map((obj) =>

                    < img onClick={() => getYoutube(obj.id)} className={props.isSmall ? 'smallposter' : 'poster'} src={`${image_url + obj.backdrop_path}`} alt='poster' />
                )}

            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
            <button className='closeButton' onClick={closeModal}>Close</button>

                <>
                    {urlId && <YouTube opts={opts} videoId={urlId.key} />}
                </>
            </Modal>
        </div>
    )
}

export default RowPost
