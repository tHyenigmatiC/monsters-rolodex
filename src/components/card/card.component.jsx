import React from 'react';

// custom imports
import './card.styles.css';

export const Card = ({ monster }) => (
    <div className='card-container'>
        <img alt="monster" src={`https://robohash.org/${monster.id}?set=set1&size=180x180`} />
        <h2 key={monster.id}>{monster.name}</h2>
        <p> {monster.email} </p>
    </div>
);