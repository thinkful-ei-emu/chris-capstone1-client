import React from 'react';
import { format as formatDate } from 'date-fns';
import './Utils.css';

export function NiceDate({ date, format='Do MMMM YYYY' }) {
    return formatDate(date, format);
}

export function Button({ className, ...props }) {
  return <button className={['Button', className].join(' ')} {...props} />
}

export function Input({ className, ...props }) {
  return (
    <input className={['Input', className].join(' ')} {...props} />
  )
}

export function Section({ className, list, ...props }) {
    const classes = [
      'Section',
      list && 'Section--list',
      className,
    ].filter(Boolean).join(' ')
    return (
      <section className={classes} {...props} />
    )
  }

  export function Required({ className, ...props }) {
    return (
      <span className={['Required', className].join(' ')} {...props}>
        &#42;
      </span>
    )
  }