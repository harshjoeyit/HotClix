import React from 'react'
import { Link } from 'react-router-dom'
import './overlayImage.css'

function OverlayImage({ src }) {
    return (
        <Link to="#">
            <div className="overlay-image-item">
                <img
                    src={src}
                    alt='img'
                    className='overlay-image'
                />
                <div className='overlay overlay-bottom'>
                    <div className="image-info">
                        <p>@username</p>
                        <p>Download</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OverlayImage
