import React, { useEffect, useState } from 'react'
import { getUsersGalleries } from '../../../helpers/request'
import { GallerySelectContainer } from '../../Gallery/GalleryContainer/GalleryContainer'
import FileUploader from '../Uploader/FileUploader'
import './uploadHome.css'


function UploadHome() {

    const initState = {
        galleries: [],
        loading: true,
        selected: -1
    }

    // STATES

    const [galleryData, setGalleryData] = useState(initState)


    useEffect(() => {

        // GET USER'S GALLERIES

        getUsersGalleries()
            .then(galleries => {
                setGalleryData({
                    ...galleryData,
                    galleries: galleries,
                    loading: false
                })
            })
            .catch(console.log)
    }, [])

    const handleSelect = (selected) => {
        setGalleryData(pr => ({
            ...pr,
            selected
        }))
    }

    return (
        <div className="main-container upload-container">
            <div className="select-gallery-title">
                Select a gallery to upload images
            </div>
            <GallerySelectContainer
                galleries={galleryData.galleries}
                selected={galleryData.selected}
                updateSelected={handleSelect}
            />
            <FileUploader 
                galleryId = { galleryData.selected }
            />
        </div>
    )
}

export default UploadHome
