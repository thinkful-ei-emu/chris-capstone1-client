import config from '../config';
import TokenService from './token-service';

const BookApiService = {
    getBooks() {
        return fetch(`${config.API_ENDPOINT}/books`,{
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getUserBooks() {
        return fetch(`${config.API_ENDPOINT}/books/user/books`,{
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getBook(bookId) {
        return fetch(`${config.API_ENDPOINT}/books/user/books/${bookId}`,{
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    
    postBook(newBook){
        return fetch(`${config.API_ENDPOINT}/books/user/books`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newBook)
        })
    },    
    deleteBook(bookId){
        return fetch(`${config.API_ENDPOINT}/books/user/books/${bookId}`,{
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
        .catch(e => console.error(e))
    },
    patchBook(id, updatedBook){
        return fetch(`${config.API_ENDPOINT}/books/user/books/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedBook),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
        .catch(error => console.error(error));
    },
    getRating(){
        return fetch(`${config.API_ENDPOINT}/ratings`,{
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    postRating(rating, book_id){
        return fetch(`${config.API_ENDPOINT}/ratings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({ rating, book_id })
        })
    },
    patchRating(id, updatedRating){
        return fetch(`${config.API_ENDPOINT}/ratings/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedRating),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
        .catch(error => console.error(error));
    },
    deleteRating(id){
        return fetch(`${config.API_ENDPOINT}/ratings/${id}`,{
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res
        )
        .catch(e => console.error(e))
    }
}

export default BookApiService;