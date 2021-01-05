import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserDetails, isUserOwner } from '../../helpers/request'
import './profile.css'


function Profile() {

    const { userId } = useParams()

    // STATE
    const [userData, setUserData] = useState({ user: {}, loading: true })

    useEffect(() => {
        const findUser = async () => {
            const user = await getUserDetails(userId)
            setUserData({
                user,
                loading: false
            })
        }
        findUser()
    }, [])

    return (
        <div className="main-container">
            <div className="top-detail-container user-detail-container">
                <div className="profile-details">
                {
                    userData.loading
                        ? 'loading...'
                        : (
                            <>
                                <UserAvatarBig letter={userData.user.username.charAt(0)} />
                                <div className="user-info">
                                    <p className="username">
                                        {`${userData.user.username}`}
                                    </p>
                                    {
                                        isUserOwner(userData.user.id)
                                        ? ( <p className="user-email">
                                                <i className="fa fa-envelope"></i>
                                                {userData.user.email}
                                            </p>
                                        )
                                        :  <></>
                                    }
                                </div>
                            </>
                        )
                }
                </div>
            </div>
        </div>
    )
}


export function UserAvatarBig({ letter }) {
    return (
        <h3 className='avatar avatar-big'>{letter.toUpperCase()}</h3>
    )
}

export function UserAvatarSmall({ letter }) {
    return (
        <h3 className='avatar'>{letter.toUpperCase()}</h3>
    )
}


export default Profile
