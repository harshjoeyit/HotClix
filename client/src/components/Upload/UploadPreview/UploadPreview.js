import React from 'react'
import './uploadPreview.css'

function UploadPreview({ previewData }) {
    return (
        <div className="preview-container">
            <h2 className="select-gallery-title">Preview</h2>
            <div className="gallery-container">
                {
                    previewData.map((src, index) => (
                        <div className="preview-img" key={index}>
                            <img src={src} alt="preview-img" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UploadPreview
