import React from 'react';

function Bubble({ name, onClick, isSelected }) {
  return (
    <div
      className={`bubble bubble-white bubble-animate ${
        isSelected ? 'bubble-clicked' : ''
      }`}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

export default Bubble;
