import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getImageDetails, getImages } from '../../../helpers/request'
import './imageDetail.css'
import one from '../../../Images/one.jpg'
import two from '../../../Images/two.jpg'
import three from '../../../Images/three.jpg'
import four from '../../../Images/four.jpg'
import { UserAvatarSmall } from '../../UserProfile/Profile'


function ImageDetail() {

    const { imageId } = useParams()
    const initState = {
        image: {},
        moreImages: [],
        loading: true
    }

    // STATES
    const [state, setState] = useState(initState)

    useEffect(() => {

        setState(pr => ({
            ...pr,
            loading: true
        }))

        const getImageAndMore = async () => {
            const image = await getImageDetails(imageId)
            const moreImages = await getImages(image.uploaded_by)
            setState({
                image,
                moreImages,
                loading: false
            })
        }
        getImageAndMore()

    }, [imageId])



    return (
        <div className="image-container">
            <div className="image-info">
                <div className="image-user">
                    {
                        state.loading
                            ? ('Loading...')
                            : (
                                <>
                                    <UserAvatarSmall letter={state.image.username.charAt(0)} />
                                    {state.image.username}
                                </>
                            )
                    }
                </div>
                <div className="image-download">
                    <i className="fa fa-download"></i>
                    Download
                </div>
            </div>
            <div className="image-wrapper">
                {
                    state.loading 
                    ? 'Loading...'
                    : <img src={state.image.file_url} className="img-detail-view" />
                }
                <div className="more-user-images">
                    <h2>
                        More from
                        {state.loading ? ' ...' : state.image.username}
                    </h2>
                    <div className="gallery-container more-image-gallery">
                        {/* <div className="preview-img">
                            <img src={one} className="img-detail-view" />
                        </div>
                        <div className="preview-img">
                            <img src={two} className="img-detail-view" />
                        </div>
                        <div className="preview-img">
                            <img src={three} className="img-detail-view" />
                        </div>
                        <div className="preview-img">
                            <img src={four} className="img-detail-view" />
                        </div>
                        <div className="preview-img">
                            <img src={one} className="img-detail-view" />
                        </div> */}
                        {
                            state.moreImages.map(image => (
                                <Link 
                                    to={`../image/${image.id}`} 
                                    key={image.id}
                                >
                                    <div className="preview-img" >
                                        <img src={image.thumbnail_url} className="img-detail-view" />
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageDetail
