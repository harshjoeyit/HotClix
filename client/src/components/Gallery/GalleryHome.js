import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Gallery from '../ImageGallery/Gallery'
import { UserAvatarSmall } from '../UserProfile/Profile'
import { getGalleryDetails, getImages, isUserOwner } from '../../helpers/request'
import { titleCase } from '../../helpers'
import './galleryHome.css'

function UserGallery() {

    const { galleryId } = useParams()

    // STATES
    const [galleryData, setGalleryData] = useState({ gallery: {}, loading: true })
    const [galleryImages, setGalleryImages] = useState({ images: [], loading: true })

    useEffect(() => {

        // GALLERY DATA 

        getGalleryDetails(galleryId)
            .then(gallery => {
                console.log(gallery)
                setGalleryData({
                    gallery: gallery,
                    loading: false
                })
            })
            .catch(console.log)

        // GALLERY IMAGES 

        getImages(undefined, galleryId)
            .then(images => {
                console.log(images)
                setGalleryImages({
                    images: images,
                    loading: false
                })
            })
            .catch(console.log)

    }, [galleryId])

    // TODO 
    // enable download 
    // Show delete option only when user's gallery

    return (
        <div className="main-container">
            <div className="top-detail-container gallery-detail-container">
                <div className="gallery-details">
                    <div className="gallery-and-user">
                        <div className="gallery-title">
                            {
                                galleryData.loading
                                    ? 'loading...'
                                    : titleCase(galleryData.gallery.name)
                            }
                        </div>
                        <div className="gallery-user">
                            <UserAvatarSmall
                                letter={
                                    galleryData.loading
                                        ? '.'
                                        : galleryData.gallery.created_by_username.charAt(0)
                                }
                            />
                            <p>
                                {
                                    galleryData.loading
                                        ? 'loading...'
                                        : galleryData.gallery.created_by_username
                                }
                            </p>
                        </div>
                    </div>
                    <div className="gallery-options">
                        <p>
                            {
                                galleryData.loading
                                    ? '... photos'
                                    : `${galleryData.gallery.total_photos} photos`
                            }
                        </p>
                        <button>Download</button>
                        {
                            galleryData.loading
                                ? <></>
                                : isUserOwner(galleryData.gallery.created_by)
                                    ? <button>Delete</button>
                                    : <></>
                        }
                    </div>
                </div>
            </div>
            <Gallery />
        </div>
    )
}


export default UserGallery
