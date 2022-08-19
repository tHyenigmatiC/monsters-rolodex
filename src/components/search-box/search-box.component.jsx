import React from 'react';

// custom imports
import './search-box.styles.css';

// Lifting state up

export const SearchBox = ({ placeholder, handleChange }) => (
    <form>
        <input
            className="search"
            type="search"
            placeholder={placeholder}
            onChange={handleChange}
        />
    </form>
)