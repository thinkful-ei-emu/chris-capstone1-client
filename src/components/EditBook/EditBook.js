import React, { Component } from 'react';
import ListContext from '../../context/ListContext';
import BookApiService from '../../services/book-api-service';
import { Section, Button } from '../Utils/Utils';

export default class EditBookForm extends Component {
    static contextType = ListContext;

    state = {
        error: null,
        title: '',
        author: '',
        list: '',
        book_source: '',
        genreff: 'fiction',
        genre: '',
        book_report: '',
        image: '',
        rating: ''
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        BookApiService.getBook(id)
            .then(data => this.setState({
                title: data.title,
                author: data.author,
                list: data.list,
                book_source: data.book_source,
                genre: data.genre,
                book_report: data.book_report,
                image: data.image,
                rating: data.rating
            }))
            .catch(error => this.setState({ error }))
    }

    handleSubmit = e => {
        e.preventDefault()
        const { title, author, list, book_source, genre,
                book_report, image, rating } = this.state;
        
        const book = { title, author, list, book_source, genre,
            book_report, image, rating };
        
        this.setState({ error: null })
        let id = this.props.match.params.id;
        BookApiService.patchBook(id, book)
        .then(data => {
            // this.context.updateBook(data)
            window.open('/yourshelf','_self');
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleCancelClick = () => this.props.history.push('/')
    updateBookTitle = title => this.setState({ title })
    updateBookAuthor = author => this.setState({ author })
    updateBookList = list => this.setState({ list })
    updateBookSource = book_source => this.setState({ book_source })
    updateBookGenreFF = genreff => this.setState({ genreff })
    updateBookGenre = genre => this.setState({ genre })
    updateBookReport = book_report => this.setState({ book_report })
    updateBookImage = image => this.setState({ image })
    updateBookRating = rating => this.setState({ rating })

    renderGenre(){
        const { genreff } = this.state;
        const fictionList = ['Action and Adventure',
        'Alternate history',
        'Anthology',
        'Childrens book',
        'Comic book',
        'Coming-of-age',
        'Crime',
        'Drama',
        'Fairytale',
        'Fantasy',
        'Graphic novel',
        'Historical fiction',
        'Horror',
        'Mystery',
        'Paranormal romance',
        'Picture book',
        'Poetry',
        'Political thriller',
        'Romance',
        'Satire',
        'Science fiction',
        'Short story',	
        'Suspense',
        'Thriller',
        'Young adult'];
        const nonFicitonList = ['Art',
        'Autobiography',
        'Biography',
        'Book review',
        'Cookbook',
          'Diary',
        'Dictionary',
        'Encyclopedia',
        'Guide',
        'Health',
        'History',
        'Journal',
        'Math',
        'Memoir',
        'Prayer',
        'Religion, spirituality, and new age',
        'Textbook',
          'Review',
        'Science',
        'Self help',
        'Travel',
        'True crime']

        let genre;
        let title = '';
        if(genreff === 'fiction') {
            title = 'Fiction Genres:'
            genre = fictionList.map(gre => <option value={gre}>{gre}</option>)
        } else if(genreff === 'nonfiction') {
            title = 'Non-Fiction Genres:'
            genre = nonFicitonList.map(gre => <option value={gre}>{gre}</option>)
        } else {
            genre = <div></div>
        }
        return (
            <div>
                <label htmlFor='genre'>{title} {' '} </label>
                <select name='genre' id='genre'
                value={this.state.genre} required
                onChange={e => this.updateBookGenre(e.target.value)}>
                    {genre}
                </select>
            </div>
        );
    }

    renderBookSource(){
        const source = ['Print',
        'Kindle',
        'Nook',
        'Website',
        'Magazine',
        'Journel',
        'Audiobook',
        'Other eBook Source',
        'Other'];
        const book_source = source.map(bs => <option value={bs}>{bs}</option>)
        return book_source;
    }

    render() {
        const { title, author, list, book_source,
            book_report, image, rating, error, genreff } = this.state;
        return(
            <Section className='EditBookForm'>
                <h1>Edit Book</h1>
                <form className='EditBook_form'
                    onSubmit={this.handleSubmit}
            >
                <div className='Edit_error' role='alert'>
                {error && <p>{error.message}</p>}
                </div>
                <div>
                    <label htmlFor='title'>Title {' '} </label>
                    <input type='text' name='title' id='title'
                    value={title} required
                    onChange={e => this.updateBookTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='author'>Author {' '} </label>
                    <input type='text' name='author' id='author'
                    value={author} required
                    onChange={e => this.updateBookAuthor(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='list'>List {' '} </label>
                    <select name='list' id='list'
                    value={list} required
                    onChange={e => this.updateBookList(e.target.value)}>
                        <option value='wishlist'>Wish-List</option>
                        <option value='reading'>Current Reads</option>
                        <option value='read'>Finished Reads</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='book_source'>Book Source {' '} </label>
                    <select name='book_source' id='book_source'
                    value={book_source} required
                    onChange={e => this.updateBookSource(e.target.value)}>
                        {this.renderBookSource()}
                    </select>
                </div>
                <div>
                    <label htmlFor='writing_form'>Writing Form {' '} </label>
                    <select name='writing_form' id='writing_form'
                    value={genreff} required
                    onChange={e => this.updateBookGenreFF(e.target.value)}>
                        <option value='fiction'>Fiction</option>
                        <option value='nonfiction'>Non-Fiction</option>
                    </select>
                </div>
                {this.renderGenre()}
                <div>
                    <label htmlFor='image'>Image {' '} </label>
                    <input type='url' name='image' id='image'
                    value={image}
                    onChange={e => this.updateBookImage(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='rating'>Report Score (1-100) {' '} </label>
                    <input type='number' name='rating' id='rating'
                    value={rating} min='1' max='100'
                    onChange={e => this.updateBookRating(e.target.value)}/>
                </div>
                <div>
                        <label htmlFor='book_report'>
                        BookReport
                        </label>
                        <textarea
                        name='book_report'
                        id='book_report'
                        value={book_report}
                        onChange={e => this.updateBookReport(e.target.value)}
                        />
                    </div>
                <div className='EditBook__buttons'>
                        <Button type='submit'>
                        Save
                        </Button>
                        {' '}
                        <Button type='button' onClick={this.handleCancelClick}>
                        Cancel
                        </Button>
                    </div>
            </form>
            </Section>
        )
    }
}