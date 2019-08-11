import React from 'react';

export default function BookContent({ book }) {
    return (
        <>
            <p>source: {book.book_source}</p>
            <p>list: {book.list}</p>
            {book.genre && <p>genre: {book.genre}</p>}
            {book.book_report && <p>book report: {book.book_report}</p>}
            {book.rating && <p>rating: {book.rating}</p>}
            {book.recommended && 
                <div>
                    <p>recommender: {book.poster.user_name}</p>
                    <p>recommender rating: {book.poster.rating}</p>
                    <p>recommender report: {book.poster.poster_report}</p>
                </div>}
        </>
    )
}