import React, { useEffect, useState } from 'react'
import { arrangeImagesInColumns } from '../../helpers'
import ImageItem from './ImageItem/OverlayImage'
import './gallery.css'


function Gallery({ images }) {

    const initState = { 
        columns: [], 
        screenWidth: window.innerWidth,
        loading: true 
    }

    // STATE
    const [state, setState] = useState(initState)

    useEffect(() => {
        const res = arrangeImagesInColumns(images, state.screenWidth)
        setState(pr => ({
            ...pr,
            columns: res,
            loading: false
        }))

    }, [state.screenWidth])

    useEffect(() => {

        const updateScreenSize = () => {
            setState(pr => ({
                ...pr, 
                screenWidth: window.innerWidth
            }))
        }

        // ADD EVENT LISTENER 
        window.addEventListener('resize', updateScreenSize);

        return () => {
            window.removeEventListener('resize', updateScreenSize)
        }
    }, [])

    return (
        <div className="image-gallery">
            <div className="gallery-row">
                {
                    state.loading
                        ? 'Loading...'
                        : (
                            <>
                                <div className="gallery-column">
                                    {
                                        state.columns[0].map(image => (
                                            <ImageItem key={image.id} image={image} />
                                        ))
                                    }
                                </div>
                                <div className="gallery-column">
                                    {
                                        state.columns[1].map(image => (
                                            <ImageItem key={image.id} image={image} />
                                        ))
                                    }
                                </div>
                                <div className="gallery-column">
                                    {
                                        state.columns[2].map(image => (
                                            <ImageItem key={image.id} image={image} />
                                        ))
                                    }
                                </div>
                                <div className="gallery-column">
                                    {
                                        state.columns[3].map(image => (
                                            <ImageItem key={image.id} image={image} />
                                        ))
                                    }
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    )
}

export default Gallery
