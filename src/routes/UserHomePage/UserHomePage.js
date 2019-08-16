import React from 'react';
import ListContext from '../../context/ListContext';
import BookApiService from '../../services/book-api-service';
import { Section } from '../../components/Utils/Utils';
import UserHomeItem from '../../components/UserHomeItem/UserHomeItem';
import { Link } from 'react-router-dom';
import './UserHomePage.css';

export default class UserHomePage extends React.Component {
    state = {
        list: '',
        genre: '',
    }
    
    static contextType = ListContext;

    componentDidMount() {
        this.context.clearError();
        BookApiService.getUserBooks()
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
        const header = document.getElementById('userFilterBar');
        if(window.pageYOffset > 100){
            header.classList.add('sticky')
        } else {
            header.classList.remove('sticky')
        }
    }

    bookDelete = id => {
        BookApiService.deleteBook(id)
        .then(data => {
            this.context.removeBook(data)
            window.open('/yourshelf','_self');
        })
        .catch(error => {
            this.setState({ error })
        })
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
        const { reading, read, wishlist } = this.context.bookList;
        if(list === 'wishlist'){
            return <>{this.renderBooks(wishlist, 'Wish List')}</>;
        } else if(list === 'reading'){
            return <>{this.renderBooks(reading, 'Current Reads')}</>;
        } else if(list === 'read'){
            return <>{this.renderBooks(read, 'Finished')}</>;
        } else {
            return  <>
                        {this.renderBooks(wishlist, 'Wish List')}
                        {this.renderBooks(reading, 'Current Reads')}
                        {this.renderBooks(read, 'Finished')}
                    </>;
        }
        
    }
    
    renderBooks(arr, name) {
        let array = arr;
        if(!!this.state.genre) array = arr.filter(book => book.genre === this.state.genre)
        let List = array.map(book => <UserHomeItem key={book.id} book={book} 
            list={this.state.list} bookDelete={id => this.bookDelete(id)}/>)
        return (
            <div>
                <h2>{name}</h2>
                <div id='bookList'>
                {List.length !== 0 ? List : <div>There are currently no books for this list</div>}
                </div>
            </div>
        )
    }

    render() {
        const { error } = this.context;
        return (
            <Section list className='UserHomePage'>
                {error
                  ? <p className='red'>There was an error, try again.</p>
                  : <>
                        <div id='userFilterBar'>
                            <Link to='/addbook' className='AddBook'>
                                Add a Book
                            </Link>
                            <div className='listFilter'>
                                <label htmlFor='list'>View List: {' '} </label>
                                <select name='list' id='list'
                                value={this.state.list} required
                                onChange={e => this.updateBookList(e.target.value)}>
                                    <option value=''>All Lists</option>
                                    <option value='wishlist'>Wish-List</option>
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
                        <div className='UserHomeList'>
                            {this.renderLists()}
                        </div>
                    </>}
            </Section>
        )
    }
}