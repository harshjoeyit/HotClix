import React from 'react'
import { Link } from 'react-router-dom'
import './overlayImage.css'

function OverlayImage({ src }) {
    
    // IN PARAMS RECIEVE FULL IMAGE DATA 
    // FROM THAT QUERY THE USER
    // FROM USER FETCH MORE IMAGE FROM THIS USER 
    
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
                        <Link to={`/profile/5`}>
                            <p>@username</p>
                        </Link>
                        <p>
                            <i className="fa fa-download"></i>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OverlayImage
