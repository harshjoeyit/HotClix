import React from 'react'
import { Link } from 'react-router-dom'
import { requestDownload } from '../../../helpers/request'
import './overlayImage.css'

function OverlayImage({ src }) {

    // IN PARAMS RECIEVE FULL IMAGE DATA 
    // FROM THAT QUERY THE USER
    // FROM USER FETCH MORE IMAGE FROM THIS USER 

    const handleUsernameClick = (e) => {
        e.preventDefault(); console.log('profile')
    }

    return (
        <Link to="#">
            <div className="overlay-image-item">
                <img
                    src={src}
                    alt='img'
                    className='overlay-image'
                />
                <div className='overlay overlay-bottom'>
                    <div className="image-info-overlay">
                        <p onClick={handleUsernameClick}> @username</p>
                        <p onClick={() => { requestDownload(src, 'new_file', 'jpg') }}>
                            <i className="fa fa-download"></i>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OverlayImage
