export const apiCall = (link) => (
    fetch(link)
        .then(response => response.json())
)

export const API_URL = process.env.NODE_ENV === 'test' ? 
    '/users' : 'https://jsonplaceholder.typicode.com/users';