import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../Img/7a30b6d3-e801-4ec0-b38b-c5e6e68c13b9.png';
import useAuth from './useAuth';

function NameInputPage({ code }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const accessToken = useAuth(code);
  console.log(accessToken);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate(`/mood?name=${name}`);
  };

  return (
    <div className="container-name-page">
      <div>
        <img className="monkey-image" src={image} alt="monkey" />
      </div>
      <div className="form-button">
        <form className="form" onSubmit={handleFormSubmit}>
          <label className="label">Please enter your name:</label>
          <input
            type="text"
            value={name}
            onChange={handleInputChange}
            required
          />
          <div>
            <button className="button" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NameInputPage;
