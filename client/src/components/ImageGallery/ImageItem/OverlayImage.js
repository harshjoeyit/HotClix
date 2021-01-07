import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getUserDetails } from '../../../helpers/request'
import { requestDownload } from '../../../helpers/request'
import './overlayImage.css'


function OverlayImage({ image }) {

    const history = useHistory()

    // STATE
    const [userData, setUserData] = useState({ user: {}, loading: true })

    useEffect(() => {
        // GET USER DATA 
        getUserDetails(image.uploaded_by)
            .then(user => {
                setUserData({
                    user,
                    loading: false
                })
            })
            .catch(console.log)
    }, [])

    const handleUsernameClick = (e) => {
        e.preventDefault(); 
        history.push(`/profile/${userData.user.id}`)
    }

    const handleDownloadClick = (e) => {
        e.preventDefault();
        requestDownload(image.file_url, image.name, 'jpg') 
    }

    return (
        <Link to={`/image/${image.id}`}>
            <div className="overlay-image-item">
                <img
                    src={image.thumbnail_url}
                    alt='img'
                    className='overlay-image'
                />
                <div className='overlay overlay-bottom'>
                    <div className="image-info-overlay">
                        <p onClick={handleUsernameClick}> 
                        {
                            userData.loading  ? '...' : userData.user.username
                        }
                        </p>
                        <p onClick={handleDownloadClick}>
                            <i className="fa fa-download"></i>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OverlayImage
