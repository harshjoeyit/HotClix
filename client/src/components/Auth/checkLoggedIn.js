
const checkLoggedIn = () => {
    const auth_token = localStorage.getItem('auth-token')
    if(auth_token) {
        return true
    }
    return false
}

export default checkLoggedIn