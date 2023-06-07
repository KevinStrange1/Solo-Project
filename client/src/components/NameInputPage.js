import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NameInputPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/mood');
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="label">Please enter your name:</label>
        <br />
        <input type="text" value={name} onChange={handleInputChange} required />
        <button className="button" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}

export default NameInputPage;
