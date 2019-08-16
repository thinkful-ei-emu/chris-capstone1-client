import React from 'react';
import ListContext from '../../context/ListContext';
import BookApiService from '../../services/book-api-service';
import { Section } from '../../components/Utils/Utils';
import HomePageItem from '../../components/HomePageItem/HomePageItem';
import TokenService from '../../services/token-service';
import './HomePage.css';

export default class HomePage extends React.Component {
    state = {
        genre: undefined,
        list: undefined,
    }
    static contextType = ListContext;

    componentDidMount() {
        this.context.clearError();
        BookApiService.getBooks()
            .then(res => res.filter(book => 
                book.user.user_name !== TokenService.getUserName()))
            .then(res => this.context.setBookList(res, this.props.match.path))
            .catch(this.context.setError);
            window.addEventListener('scroll', this.handleScroll, { passive: true })
    }

    componentDidUpdate() {
        const { list } = this.state;
        const target = document.getElementById('bookList');
        if(target) target.classList.remove('List')
        if(!!list) target.classList.add('List')
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const header = document.getElementById('homeFilterBar');
        if(window.pageYOffset > 100){
            header.classList.add('sticky')
        } else {
            header.classList.remove('sticky')
        }
    }

    addRating = (newRating, book_id) => {
        BookApiService.postRating(newRating, book_id)
    }
    removeRating = id => {
        BookApiService.deleteRating(id)
    }

    addToYourShelf = book => {
        this.setState({ error: null })
        BookApiService.postBook(book)
    }

    updateBookList = list => this.setState({ list })
    updateBookGenre = genre => this.setState({ genre })

    renderGenreList(){
        const { reading, read } = this.context.bookList;
        const genres = reading.map(book => book.genre).concat(read.map(book => book.genre))
        const uniqueList = Array.from(new Set(genres));
        const uniqueNames = uniqueList.map(gre => <option key={gre} value={gre}>{gre}</option>)
        return  uniqueNames
    }

    renderLists(){
        const { list } = this.state;
        const { reading, read } = this.context.bookList;
        if(list === 'reading'){
            return <>{this.renderBooks(reading, 'What Others are Reading')}</>;
        } else if(list === 'read'){
            return <>{this.renderBooks(read, 'Books Others have Enjoyed')}</>;
        } else {
            return  <>
                        {this.renderBooks(reading, 'What Others are Reading')}
                        {this.renderBooks(read, 'Books Others have Enjoyed')}
                    </>;
        }
        
    }
    
    renderBooks(arr, name) {
        let array = arr;
        if(!!this.state.genre) array = arr.filter(book => book.genre === this.state.genre)
        let List = array.map(book => {
            if(this.props.genre) book = book.filter(gre => gre === this.props.genre)
            return <HomePageItem key={book.id} book={book} list={this.state.list}
            addRating={(newRating, book_id) => this.addRating(newRating, book_id)} 
            removeRating={id => this.removeRating(id)}
        addToYourShelf={book => this.addToYourShelf(book)} />})

        return (
        <>
            <div>
                <h2>{name}</h2>
                <div id='bookList'>
                {List.length !== 0 ? List : <div>There are currently no books for this list</div>}
                </div>
            </div>
        </>
        )
    }

    render() {
        const { error } = this.context;
        return (
            <Section list className='HomePage'>
                {error
                  ? <p className='red'>There was an error, try again.</p>
                  : <>
                        <div id='homeFilterBar'>
                            <div className='listFilter'>
                                <label htmlFor='list'>View List: {' '} </label>
                                <select name='list' id='list'
                                value={this.state.list} required
                                onChange={e => this.updateBookList(e.target.value)}>
                                    <option value=''>All Lists</option>
                                    <option value='reading'>Current Reads</option>
                                    <option value='read'>Finished Reads</option>
                                </select>
                            </div>
                            <div className='genreFilter'>
                                <label htmlFor='genre'>Filter by Genre: {' '} </label>
                                <select name='grene' id='grene'
                                value={this.state.genre} required
                                onChange={e => this.updateBookGenre(e.target.value)}>
                                    <option value=''>All Genres</option>
                                    {this.renderGenreList()}
                                </select>
                            </div>
                        </div>
                        <div className='HomePageList'>
                            {this.renderLists()}
                        </div>
                    </>}
            </Section>
        )
    }
}