import React, { Component } from 'react';
import BookContext from '../../context/BookContext';
import BookApiService from '../../services/book-api-service';
import { Section, Button } from '../../components/Utils/Utils';
import BookContent from '../../components/BookContent/BookContent';
import { Link } from 'react-router-dom';
import './BookPage.css';


export default class BookPage extends Component {
    static defaultProps = {
        match:{
            params: {}
        }
    }

    static contextType = BookContext;

    componentDidMount() {
        const { bookId } = this.props.match.params;
        this.context.clearError();
        BookApiService.getBook(bookId)
          .then(this.context.setBook)
          .catch(this.context.setError);
    }

    componentWillUnmount() {
        this.context.clearBook();
    }

    bookDelete = id => {
        console.log(id)
        BookApiService.deleteBook(id)
        .then(data => window.open('/yourshelf','_self'))
        .catch(error => {
            this.setState({ error })
        })
    }

    renderBook() {
        const { book } = this.context;
        return <>
        <div className='BookPage_image'>
        {book.image && <img className='Book_image' src={book.image} alt='the cover of the book' />}
        </div>
        <div className='BookPage_info'>
            <h2>{book.title}</h2>
            <h4>{book.author}</h4>
            <BookContent key={book.id} book={book} />
            <Link to={`/edit/${book.id}`}>
                <Button>
                    Edit
                </Button>
            </Link>
            {' '}
            <Button onClick={() => this.bookDelete(book.id)}>
                delete
            </Button>
        </div>
      </>
    }

    render() {
        const { error, book } = this.context;
        let content;
        if(error) {
            content = (error.error === 'Book doesn\'t exist')
            ? <p className='red'>Book not found</p>
            : <p className='red'>There was an error</p>
        } else if (!book.id) {
            content = <div className='loading' />
        } else {
            content = this.renderBook()
        }
        return (
            <Section className='BookPage'>
                {content}
            </Section>
        )
    }
}