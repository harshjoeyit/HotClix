import React from 'react'
import { Link } from 'react-router-dom'
import GalleryCard, { GallerySelectCard } from '../GalleryCard/GalleryCard'
import './galleryContainer.css'

function GalleryContainer({ galleries, username }) {
    return (
        <>
            <div className="gallery-container">
                {
                    galleries.map(gallery => (
                        <GalleryCard
                            key={gallery.id}
                            id={gallery.id}
                            name={gallery.name}
                            username={username}
                            totalPhotos={gallery.total_photos}
                        />
                    ))
                }
            </div>
            <div className="scroll-indicators">
                <span title="scroll-left"> <i className="fa fa-angle-double-left"></i> </span>
                <Link to="/create-gallery">
                    <button>Create New Gallery</button>
                </Link>
                <span title="scroll-right"> <i className="fa fa-angle-double-right"></i>  </span>
            </div>
        </>
    )
}

export function GallerySelectContainer({ galleries, selected, updateSelected }) {

    return (
        <>
            <div className="gallery-container">
                {
                    galleries.map(gallery => (
                        <GallerySelectCard
                            key={gallery.id}
                            id={gallery.id}
                            name={gallery.name}
                            totalPhotos={gallery.total_photos}
                            active={selected === gallery.id}
                            updateSelected={updateSelected}
                        />
                    ))
                }
            </div>
            <div className="scroll-indicators">
                <span title="scroll-left"> <i className="fa fa-angle-double-left"></i> </span>
                <Link to="/create-gallery">
                    <button>Create New Gallery</button>
                </Link>
                <span title="scroll-right"> <i className="fa fa-angle-double-right"></i>  </span>
            </div>
        </>
    )
}

export default GalleryContainer
