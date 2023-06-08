import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bubble from './Bubble';

const activities = [
  'Exercising',
  'Reading',
  'Studying',
  'Working',
  'Relaxing',
  'Hiking',
  'Gardening',
  'Yoga',
  'Party',
  'BBQ',
  'Beach',
  'Traveling',
  'Picnic',
  'Cooking',
  'Chilling',
  'Dog Walking',
  'Playing Games',
  'Painting',
  'Golf',
  'sleeping',
];

function ActivityInputPage() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();

  const handleBubbleClick = (activity) => {
    setSelectedActivity(activity);
  };

  const handleNextClick = () => {
    navigate('/playlist');
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
            isSelected={selectedActivity === activity}
          />
        ))}
      </div>
      <button
        className="button"
        onClick={handleNextClick}
        disabled={!selectedActivity}
      >
        Next
      </button>
    </div>
  );
}

export default ActivityInputPage;
