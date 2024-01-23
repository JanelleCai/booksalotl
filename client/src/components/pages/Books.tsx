import React, { useState, useEffect } from "react";
import SingleBook from "../modules/SingleBook";
import FileUpload from "../modules/FileUpload";
import axios from "axios";
import Card from "../modules/Card";
import "./Books.css"
import {  post } from "../../utilities";
import { get } from "mongoose";

export type Book = {
  _id: string;
  title: string;
  author: string;
  bookCover?: string;
  rating?: number;
};

type BooksProps = {
  userId: string;
};

const Books = (props: BooksProps) => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDjnJHbxfCAqhtxJr1YYzleaQGQB8MdbEA&maxResults=10')
        .then(res => {
          setSearchResults(res.data.items);
          setShowDropdown(true); // Show the dropdown
        })
        .catch(err => console.log(err));
    }
  };

  const addBookToLibrary = (book) => {
    setLibrary([...library, book]);
    setShowDropdown(false); // Optionally close the dropdown after adding a book
  };

  const renderDropdown = () => {
    if (!showDropdown) return null;

    return (
      <div className="dropdown">
        {searchResults.map((book, index) => (
          <div key={index} onClick={() => addBookToLibrary(book)}>
            <Card book={book} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (library) {
      post("/api/books", library).then(() => {
        console.log("file uploaded");
      })
    }
  }, [library]);

  useEffect(() => {
    get("api/books").then((books: Book[]) => {
      setLibrary(books);
    })
  }, []);

  return (
    <div>
      <div className="Books-searchContainer">
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} onKeyUp={searchBook} />
        <button type="button">Search</button>
      </div>
      {renderDropdown()} {/* Render the dropdown here */}
      {/* <div className="Books-searchContainer">
        <FileUpload />
      </div> */}
      <div className="library-container">
        <h3>Your Library</h3>
        {library.map((book, index) => (
          <Card book={book}/>
        ))}
      </div>
    </div>
  );
};

export default Books;
