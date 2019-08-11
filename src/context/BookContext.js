import React from 'react';

export const nullThing = {
    author: {},
    tags: []
}

const BookContext = React.createContext({
    book: nullThing,
    error: null,
    setError: () => {},
    clearError: () => {},
    setBook: () => {},
    clearBook: () => {},
    deleteBook: () => {},
})

export default BookContext;

export class BookProvider extends React.Component {
    state = {
        book: nullThing,
        error: null
    };

    setError = error => {
        console.error(error);
        this.setState({ error })
    }

    clearError = () => this.setState({ error: null })

    setBook = book => this.setState({ book })

    clearBook = () => {
        this.setBook(nullThing)
    }

    render() {
        const value = {
            book: this.state.book,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setBook: this.setBook,
            clearBook: this.clearBook,
        }
        return (
            <BookContext.Provider value={value}>
                {this.props.children}
            </BookContext.Provider>
        )
    }
}