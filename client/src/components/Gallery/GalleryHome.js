import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ImageGallery from '../ImageGallery/Gallery'
import { UserAvatarSmall } from '../UserProfile/Profile'
import {
    getGalleryDetails, getImages,
    isUserOwner, deleteGallery
} from '../../helpers/request'
import { titleCase } from '../../helpers'
import './galleryHome.css'

function UserGallery() {

    const history = useHistory()
    const { galleryId } = useParams()

    // STATES
    const [galleryData, setGalleryData] = useState({ gallery: {}, loading: true })
    const [galleryImages, setGalleryImages] = useState({ images: [], loading: true })

    useEffect(() => {

        // GALLERY DATA 

        getGalleryDetails(galleryId)
            .then(gallery => {
                // console.log(gallery)
                setGalleryData({
                    gallery: gallery,
                    loading: false
                })
            })
            .catch(console.log)

        // GALLERY IMAGES 

        getImages(undefined, galleryId)
            .then(images => {
                // console.log(images)
                setGalleryImages({
                    images: images,
                    loading: false
                })
            })
            .catch(console.log)

    }, [galleryId])


    const handleDelete = (e) => {
        e.preventDefault()
        const conf = window.confirm(`Do you want to delete the gallery?\nAll the images of this gallery will be removed`)

        if (conf) {
            deleteGallery(galleryData.gallery.id)
                .then(res => {
                    if (res.data === "") {
                        const token = localStorage.getItem('auth-token')
                        const user = JSON.parse(atob(token.split('.')[1]))
                        history.push(`/profile/${user.id}`)
                    }
                })
                .catch(console.log)
        }
    }

    // TODO 
    // enable download 

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
                                    : `${galleryData.gallery.total_photos} 
                                        photo${galleryData.gallery.total_photos > 1 ? 's' : ''}`
                            }
                        </p>
                        <button>Download</button>
                        {
                            galleryData.loading
                                ? <></>
                                : isUserOwner(galleryData.gallery.created_by)
                                    ? <button onClick={handleDelete}>Delete</button>
                                    : <></>
                        }
                    </div>
                </div>
            </div>
            {
                galleryImages.loading
                    ? <></>
                    : <ImageGallery images={galleryImages.images} />
            }
        </div>
    )
}


export default UserGallery
