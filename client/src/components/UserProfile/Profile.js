import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    getUserDetails, isUserOwner,
    getUsersGalleries, getImages
} from '../../helpers/request'
import Gallery from '../ImageGallery/Gallery'
import GalleryContainer from '../Gallery/GalleryContainer/GalleryContainer'
import './profile.css'


function Profile() {

    const { userId } = useParams()

    // STATE

    const [userData, setUserData] = useState({ user: {}, loading: true })
    const [galleryData, setGalleryData] = useState({ galleries: [], loading: true })
    const [imagesData, setImagesData] = useState({ images: [], loading: true })
    const [showImages, setShowImages] = useState(true)

    useEffect(() => {

        // GET USER DATA 

        getUserDetails(userId)
            .then(user => {
                setUserData({
                    user,
                    loading: false
                })
            })
            .catch(console.log)

        // GET USER'S GALLERIES

        getUsersGalleries(userId)
            .then(galleries => {
                setGalleryData({
                    galleries: galleries,
                    loading: false
                })
            })
            .catch(console.log)

        // GET USER'S IMAGES

        getImages(userId)
            .then(images => {
                setImagesData({
                    images,
                    loading: false
                })
            })
            .catch(console.log)
    }, [userId])



    return (
        <div className="main-container">
            <div className="top-detail-container user-detail-container">
                <div className="profile-details">
                    {
                        userData.loading
                            ? 'loading...'
                            : (
                                <>
                                    <UserAvatarBig letter={userData.user.username.charAt(0)} />
                                    <div className="user-info">
                                        <p className="username">
                                            {`${userData.user.username}`}
                                        </p>
                                        {
                                            isUserOwner(userData.user.id)
                                                ? (<p className="user-email">
                                                    <i className="fa fa-envelope"></i>
                                                    {userData.user.email}
                                                </p>
                                                )
                                                : <></>
                                        }
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>

            <div className="select-view-btns">
                <button
                    className={showImages ? 'view-active' : ''}
                    onClick={() => { setShowImages(true) }}
                >
                    Photos
                </button>
                <button
                    className={!showImages ? 'view-active' : ''}
                    onClick={() => { setShowImages(false) }}
                >
                    Galleries
                </button>
            </div>
            {
                showImages
                    ? (
                        <Gallery />
                    )
                    : (
                        <GalleryContainer
                            galleries={galleryData.galleries}
                            username={userData.user.username}
                        />
                    )
            }

        </div>
    )
}


export function UserAvatarBig({ letter }) {
    return (
        <h3 className='avatar avatar-big'>{letter.toUpperCase()}</h3>
    )
}

export function UserAvatarSmall({ letter }) {
    return (
        <h3 className='avatar'>{letter.toUpperCase()}</h3>
    )
}


export default Profile
