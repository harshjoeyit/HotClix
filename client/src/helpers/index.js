const getHeaders = () => ({
    'auth-token': localStorage.getItem('auth-token'),
    'Content-Type': 'application/json',
    accept: 'application/json',
})

export const titleCase = (string) => {
    return string.split(' ').map(word => (
        `${word.substring(0,1).toUpperCase()}${word.substring(1)}`
    )).join(' ')
}

export default getHeaders