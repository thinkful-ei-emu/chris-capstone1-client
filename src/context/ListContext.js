import React from 'react';

const ListContext = React.createContext({
    bookList: [],
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
        bookList: [],
        error: null,
        location: null,
    };

    setBookList = (bookList, location) => this.setState({ bookList, location })

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => this.setState({ error: null })

    removeBook = bookId => {
        const newBookList = this.state.bookList.filter(book =>
        book.id !== bookId)
        this.setState({
            bookList: newBookList
        })
    }

    updateBook = data => {
        const newBooks = this.state.bookList.map(book =>
            (book.id === data.id) ? data : book)
        this.setState({
            bookList: newBooks
        })
    }

    addBook = data => {
        const newBookList = [ ...this.state.bookList, data ]
        this.setState({
            bookList: newBookList
        })
    }

    render() {
        const value = {
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