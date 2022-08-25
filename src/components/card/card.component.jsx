import React from 'react';

// custom imports
import './card.styles.css';

const Card = ({ id, name, email }) => (
    <div className='card-container'>
        <img alt="monster" src={`https://robohash.org/${id}?set=set1&size=180x180`} />
        <h2 key={id}>{name}</h2>
        <p> {email} </p>
    </div>
);

export default Card;