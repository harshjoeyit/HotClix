const getHeaders = () => ({
    'auth-token': localStorage.getItem('auth-token'),
    'Content-Type': 'application/json',
    accept: 'application/json',
})

export default getHeaders