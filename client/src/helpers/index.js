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

// ARRANGE IMAGES ACCORDING TO SCREEN SIZE 

export const arrangeImagesInColumns = (images, screenWidth) => {
    let columns = [[], [], [], []]
    let i = 0

    if(screenWidth >= 1000) {
        images.forEach(image => {
            let j = i % 4
            columns[j].push(image)
            i++
        });
    }
    else if (screenWidth >= 600) {
        images.forEach(image => {
            let j = i % 2
            columns[j].push(image)
            i++
        });
    }
    else {
        images.forEach(image => {
            let j = i % 1
            columns[j].push(image)
            i++
        });
    }
    
    return columns
}

export default getHeaders