import React from 'react'
import { Link } from 'react-router-dom'
import { titleCase } from '../../../helpers'
import './galleryCard.css'

function GalleryCard({ id, name, username, totalPhotos }) {
    return (
        <Link to={`../gallery/${id}`}>
            <div className="gallery-card">
                <div className="card-row">
                    <div
                        className="gallery-name" >
                        {titleCase(name)}
                    </div>
                    <p className="card-username">
                        by {username}
                    </p>
                </div>
                <div className="card-row">
                    <p className="photo-cnt">
                        {`${totalPhotos} photos`}
                        <i className="fa fa-angle-double-right"></i>
                    </p>
                </div>
            </div>
        </Link>
    )
}
    
export function GallerySelectCard({ id, name, totalPhotos, active, updateSelected }) {
    return (
        <div 
            className={`gallery-select-card ${active ? 'gallery-active': '' }`}
            onClick={() => { updateSelected(id) }}
        >
            <div className="card-row">
                <div
                    className="gallery-name" >
                    {titleCase(name)}
                </div>
            </div>
            <div className="card-row">
                <p className="photo-cnt">
                    {`${totalPhotos} photos`}
                    <i className="fa fa-angle-double-right"></i>
                </p>
            </div>
        </div>
    )
}

export default GalleryCard
