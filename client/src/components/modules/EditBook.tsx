//popup for inputting book info such as date read, genre, and rating

import React, { useEffect, useState } from "react";
import Genre from "./Genre";
import { Rating } from "@mantine/core";
// import Rating from "./Rating";

const EditBook = ({ item, onClose, datecb, ratingcb, genrecb, updatebook, currentcb }) => {
  let thumbnail = item.cover;
    // item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  let today = new Date();
  const [genre, setGenre] = useState<string>(""); 
  const [date, setDate] = useState<string>(today.toString());
  const [rating, setRating] = useState<number>(item.rating || 0);
  const [submit, setSubmit] = useState<boolean>(false); 
  const [current, setCurrent] = useState<boolean>(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setSubmit(true);
  }

  useEffect(() => {
    if (submit) {
      updatebook(item); // Add the book to the library
    }}, [submit]); 

  useEffect(() => {
    datecb(new Date(date));
  }, [date]);

  useEffect(() => {
    ratingcb(rating);
  }, [rating]); 

  useEffect(() => {
    genrecb(genre);
  }, [genre]);  
  
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  // const handleRatingChange = (event) => {
  //   setRating(event.target.value == undefined ? 0 : Number(event.target.value));
  // }

  useEffect(() => {
    currentcb(current);
  }, [current]);

  return (
    <div>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>X</button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
            <h1>{item.title}</h1>
               <h3>{item.authors}</h3>
               <h5>
                 {item.publisher + ' '}
                 <span>{item.published_date}</span>
               </h5>
               <br />
              <form onSubmit={handleSubmit}>
                {!current && (
                  <>
                    <label htmlFor="date">Date Completed:</label>
                    <input type="date" min="1900-01-01" id="date" name="date" value={date.toString()} onChange={(e) => setDate(e.target.value)}/>
                  </>
                )}
                <label htmlFor="current">Currently Reading:</label>
                <input type="checkbox" id="current" name="current" checked={current} onChange={(e) => setCurrent(e.target.checked)}/>
                <br/>
                <label htmlFor="genre">Genre:</label>
                <Genre onChange={handleGenreChange} value={genre} />
                <br/>
                <label htmlFor="rating">Rating:</label>
                <Rating value={rating} onChange={setRating} defaultValue={rating}/>
                <br/>
                <button type="submit">Update Book</button>
              </form>
            </div>
          </div>
          <div className="description">
            <h4 className="description">{item.description}</h4>
          </div>
        </div>
      </div>
    </div>
  )
};

export default EditBook;
