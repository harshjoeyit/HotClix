import React from 'react'
import ImageItem from './OverlayImage'
import './gallery.css'

import one from '../../Images/one.jpg'
import two from '../../Images/two.jpg'
import three from '../../Images/three.jpg'
import four from '../../Images/four.jpg'
import five from '../../Images/five.jpg'
import six from '../../Images/six.jpg'

function Gallery() {
    return (
        <div className="image-gallery">
            <div className="gallery-row">
                <div className="gallery-column">
                    <ImageItem src={one} />
                    <ImageItem src={three} />
                    <ImageItem src={five} />
                    <ImageItem src={four} />
                    <ImageItem src={six} />
                    <ImageItem src={one} />
                </div>
                <div className="gallery-column">
                    <ImageItem src={five} />
                    <ImageItem src={four} />
                    <ImageItem src={three} />
                    <ImageItem src={one} />
                    <ImageItem src={six} />
                    <ImageItem src={two} />
                </div>
                <div className="gallery-column">
                    <ImageItem src={four} />
                    <ImageItem src={three} />
                    <ImageItem src={six} />
                    <ImageItem src={five} />
                    <ImageItem src={one} />
                    <ImageItem src={one} />
                </div>
                <div className="gallery-column">
                    <ImageItem src={six} />
                    <ImageItem src={one} />
                    <ImageItem src={four} />
                    <ImageItem src={one} />
                    <ImageItem src={three} />
                    <ImageItem src={five} />
                </div>
            </div>
        </div>
    )
}

export default Gallery
