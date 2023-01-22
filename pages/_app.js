import '@/styles/globals.css';
import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}`);
      setSearchResults(response.data.items.slice(0,3));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search books by title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>
      {searchResults.map(book => (
        <div key={book.id}>
          <h2>{book.volumeInfo.title}</h2>
          <h3>{book.volumeInfo.subtitle}</h3>
          <p>Author(s): {book.volumeInfo.authors.join(', ')}</p>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
        </div>
      ))}
    </div>
  );
};

export default Search;