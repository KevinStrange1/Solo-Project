import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Bubble from './Bubble';

const moods = [
  'Happy',
  'Sad',
  'Relaxed',
  'Excited',
  'Angry',
  'Bored',
  'Anxious',
  'Crazy',
  'Depressed',
  'Exhausted',
  'Homesick',
  'Lazy',
  'Lonely',
  'Mad',
  'Naughty',
  'Romantic',
  'Sleepy',
  'Stressed',
  'Festive',
  'High',
];

function MoodInputPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedName = queryParams.get('name');

  const handleBubbleClick = (mood: string) => {
    navigate(`/activity?name=${selectedName}&mood=${mood}`);
  };

  return (
    <div className="container">
      <h2>Select your mood</h2>
      <div className="bubble-container">
        {moods.map((mood) => (
          <Bubble
            key={mood}
            name={mood}
            onClick={() => handleBubbleClick(mood)}
          />
        ))}
      </div>
    </div>
  );
}

export default MoodInputPage;
