import React from 'react';

const ListContext = React.createContext({
    list: [],
    bookList: {},
    error: null,
    location: null,
    setError: () => {},
    clearError: () => {},
    setBookList: () => {},
    removeBook: () => {},
    updateBook: () => {},
    addBook: () => {}
})

export default ListContext;

export class ListProvider extends React.Component {
    state = {
        list: [],
        bookList: {
            wishlist: [],
            reading: [],
            read: [],
        },
        error: null,
        location: null,
    };

    setBookList = (bookList, location) => {
        this.setState({ bookList: {
            wishlist: bookList.filter(book => book.list === 'wishlist'),
            reading: bookList.filter(book => book.list === 'reading'),
            read: bookList.filter(book => book.list === 'read')
        },
        location,
        list: bookList
        })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => this.setState({ error: null })

    removeBook = bookId => {
        const newBookList = this.state.list.filter(book =>
        book.id !== bookId)
        this.setState({
            list: newBookList
        })
    }

    updateBook = data => {
        const newBooks = this.state.list.map(book =>
            (book.id === data.id) ? data : book)
        this.setState({
            list: newBooks
        })
    }

    addBook = data => {
        const newBookList = [ ...this.state.list, data ]
        this.setState({
            list: newBookList
        })
    }

    render() {
        const value = {
            list: this.state.list,
            bookList: this.state.bookList,
            error: this.state.error,
            location:this.state.location,
            setError: this.setError,
            clearError: this.clearError,
            setBookList: this.setBookList,
            removeBook: this.removeBook,
            updateBook: this.updateBook,
            addBook: this.addBook
        }
        
        return (
            <ListContext.Provider value={value}>
                {this.props.children}
            </ListContext.Provider>
        )
    }
}