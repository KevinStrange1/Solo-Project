import React from 'react';

function Bubble({ name, onClick, isSelected }) {
  return (
    <div className="text-box">
      <div
        className={`bubble bubble-white bubble-animate ${
          isSelected ? 'bubble-clicked' : ''
        }`}
        onClick={onClick}
      >
        {name}
      </div>
    </div>
  );
}

export default Bubble;
