import React from 'react'
import GalleryCard from '../GalleryCard/GalleryCard'
import './galleryContainer.css'

function GalleryContainer({ galleries, username }) {
    return (
        <div className="gallery-container">
        {
            galleries.map(gallery => (
                <GalleryCard 
                    key={ gallery.id }
                    id={ gallery.id }
                    name={ gallery.name }
                    username={ username }
                    totalPhotos={ gallery.total_photos }
                />
            ))
        }
        </div>
    )
}

export default GalleryContainer
