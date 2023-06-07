import React from 'react';

function Bubble({ name, onClick, isSelected }) {
  return <div onClick={onClick}>{name}</div>;
}

export default Bubble;
