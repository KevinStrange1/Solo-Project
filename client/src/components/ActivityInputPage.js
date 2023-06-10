import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Bubble from './Bubble';

const activities = [
  'Exercising',
  'Reading',
  'Studying',
  'Working',
  'Yoga',
  'Party',
  'BBQ',
  'Beach',
  'Traveling',
  'Picnic',
  'Cooking',
  'Showering',
  'Dog Walking',
  'Playing Games',
  'Painting',
  'House Work',
  'Sleeping',
  'Bath',
  'Hiking',
  'Chilling',
];

function ActivityInputPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedMood = queryParams.get('mood');
  const selectedName = queryParams.get('name');

  const handleBubbleClick = (activity) => {
    navigate(
      `/playlist?name=${selectedName}&mood=${selectedMood}&activity=${activity}`
    );
  };

  return (
    <div className="container">
      <h1>Select your activity</h1>
      <div className="bubble-container">
        {activities.map((activity, index) => (
          <Bubble
            key={index}
            name={activity}
            onClick={() => handleBubbleClick(activity)}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivityInputPage;
