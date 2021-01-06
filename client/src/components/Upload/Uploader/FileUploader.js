import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import UploadPreview from '../UploadPreview/UploadPreview'
import axios from 'axios'
import './fileUploader.css'


function FileUploader({ galleryId }) {

    const history = useHistory()
    const initState = {
        images: [],
        progress: 0,
        uploading: false
    }

    // STATES

    const [error, setError] = useState('')
    const [state, setState] = useState(initState)
    const [previewData, setPreviewData] = useState([])

    // UPLOAD FUNCTION

    const uploadFiles = () => {

        // VALIDATIONS
        const files = state.images

        if (files.length === 0) {
            setError('No files selected!')
            return;
        }
        if (galleryId === -1) {
            setError('No gallery selected!')
            return;
        }

        setError('')
        setState(pr => ({
            ...pr,
            progress: 0,
            uploading: true
        }));

        // APPEND ALL FILES & GALLERY

        const formData = new FormData();

        files.forEach((file) => {
            formData.append('images', file, file.name);
        });
        formData.append('galleryId', galleryId)

        // MAKE REQUEST 

        axios
            .post('/api/images/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                onUploadProgress: (progressEvent) => {
                    console.log(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                    // setState(pr => ({
                    //     ...pr,
                    //     progress: parseInt(
                    //         Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    //     ),
                    // }));
                },
            })
            .then((res) => {
                setState(pr => ({
                    ...pr,
                    uploading: false
                }))

                // REDIRECT TO GALLERY WHERE THE IMAGE UPLOADED

                history.push(`/gallery/${galleryId}`)
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };


    // GET IMAGES FOR PREVIEW 

    const prepareImagesForPreview = (files) => {

        files = Array.from(files)
        setState(pr => ({
            ...pr,
            images: files
        }))

        if (files.length > 0) {

            const getPreviewUrls = (file) => {
                const reader = new FileReader();
                reader.addEventListener("load", function () {
                    setPreviewData(pr => ([...pr, this.result]))
                })
                reader.readAsDataURL(file)
            }

            files.forEach(file => {
                getPreviewUrls(file)
            })
        }
        else {
            setPreviewData([])
        }
       
    }

    // UPLOAD BY CLICK

    const handleInputByClick = (e) => {
        prepareImagesForPreview(e.target.files)
    }

    // UPLOAD BY DRAG AND DROP

    const handleDrop = (e) => {
        e.preventDefault();
        prepareImagesForPreview(e.dataTransfer.files)
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // CLEAR SELECTION

    const handleClearSelection = () => {
        setPreviewData([]) 
        setState(pr => ({
            ...pr,
            images: []
        }))
    }


    return (
        <>
            <div className="upload-form-container" style={{marginTop: '50px'}}>
                <div
                    className='drop-region-container'
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className='drop-region'>
                        <i className="fa fa-upload" aria-hidden="true"></i>
                        <h2>Drag and Drop or Click to Upload</h2>
                        <input
                            type='file'
                            multiple
                            name="files"
                            className="custom-file-input"
                            onChange={handleInputByClick}
                        />
                    </div>
                </div>
                {
                    (error.length > 0) 
                    ? (
                        <p  
                            style={{margin: '10px 0'}} 
                            className="error">
                            {error}
                        </p>
                    ) : ''
                }
            </div>

            {
                (previewData.length > 0)
                    ? (<UploadPreview previewData={previewData} />)
                    : (<></>)
            }

            <div className="upload-form-container">
                <div className="upload-btn">
                    {
                        state.uploading
                            ? (
                                <p className="uploading-images">
                                    Uploading
                                    <i className="fa fa-spinner rotating"></i>
                                </p>
                            )
                            : (
                                <button
                                    type="submit"
                                    onClick={() => { uploadFiles() }}
                                > Upload </button>
                            )
                    }
                    {
                        (!state.uploading && previewData.length > 0)
                            ? (
                                <button
                                    type="button"
                                    onClick={ handleClearSelection }
                                > Clear Selection </button>
                            )
                            : (<></>)
                    }
                </div>

                {/* <h3>Upload progress</h3>

            <div className='progress'>
                <div
                    className='progress-bar progress-bar-striped bg-info'
                    role='progressbar'
                    aria-valuenow='40'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: `${state.progress}%` }}
                >
                    {state.progress}%
                </div>
            </div> */}
            </div>
        </>
    )
}

export default FileUploader
