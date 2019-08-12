import React from 'react';

export default function BookContent({ book }) {
    return (
        <>
            <p>source: {book.book_source}</p>
            <p>list: {book.list}</p>
            {book.genre && <p>genre: {book.genre}</p>}
            {book.book_report && <p>book report: {book.book_report}</p>}
            {book.rating && <p>your rating: {book.rating}%</p>}
            <p>average user rating: <span>{book.average_rating}%</span></p>
            <p># of ratings: <span>{book.number_of_ratings}</span></p>
        </>
    )
}