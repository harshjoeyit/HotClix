
import axios from 'axios'   
import getHeaders from '.'


// GET USER DETAILS

export const getUserDetails = async (userId) => {
    try {
        const res = await axios.get(`/api/users/${userId}`)
        return res.data.user
    }
    catch (err) {
        console.log('error in fetching user details')
        return err
    }
}


// GET AUTHENTICATED USER DETAILS 

export const getAuthenticatedUser = async () => {
    const token = localStorage.getItem('auth-token')
    const user = JSON.parse(atob(token.split('.')[1]))
    return await getUserDetails(user.id)
}


// SHOW EMAIL IF LOGGED IN USER IS SAME AS REQUESTING USER 

export const isUserOwner = (userId) => {
    const token = localStorage.getItem('auth-token')
    const user = JSON.parse(atob(token.split('.')[1]))
    return userId === user.id
}


// GET IMAGE DETAILS

export const getImageDetails = async (imageId) => {
    try {
        const res = await axios.get(`/api/images/${imageId}`)
        return res.data.image
    }
    catch (err) {
        console.log('error in fetching image details')
        return err
    }
}


// GET ALL IMAGES, BY USER, FROM A GALLERY

export const getImages = async(userId, galleryId) => {
    try {
        let requestUri = `/api/images`
        if(userId) {
            requestUri += `?userId=${userId}`
        }
        else if(galleryId) {
            requestUri += `?galleryId=${galleryId}`
        }
        const res = await axios.get(requestUri)
        return res.data.images
    }
    catch (err) {
        console.log('error in fetching images')
        return err
    }
}


// GET GALLERY DETAILS

export const getGalleryDetails = async (galleryId) => {
    try {
        const res = await axios.get(`/api/gallery/${galleryId}`)
        return res.data.gallery
    }
    catch (err) {
        console.log('error in fetching gallery details')
        return err
    }
}


// GET USER'S GALLERIES 

export const getUsersGalleries = async (userId) => {
    try {
        const res = await axios.get(`/api/gallery?userId=${userId}`)
        return res.data.galleries
    }
    catch (err) {
        console.log('error in fetching galleries')
        return err
    }
}


// GET GALLERY IMAGES 

export const getGalleryImages = async (galleryId) => {
    try {
        const res = await axios.get(`/api/images?galleryId=${galleryId}`)
        return res.data.images
    }
    catch (err) {
        console.log('error in fetching gallery images')
        return err
    }
}