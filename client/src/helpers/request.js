
import axios from 'axios'   
import getHeaders from '../helpers/getHeaders'


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
        const headers = getHeaders()
        const res = await axios.get(`/api/images/${imageId}`, { headers: headers })
        return res.data.image
    }
    catch (err) {
        console.log('error in fetching image details')
        return err
    }
}