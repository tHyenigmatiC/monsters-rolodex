import React from 'react';

// custom imports
import './search-box.styles.css';

// Lifting state up

const SearchBox = ({ placeholder, handleChange }) => (
    <form>
        <input
            className="search"
            type="search"
            aria-label="search-input"
            placeholder={placeholder}
            onChange={handleChange}
        />
    </form>
)

export default SearchBox;