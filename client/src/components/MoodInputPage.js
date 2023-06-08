import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleBubbleClick = (mood) => {
    navigate(`/activity?mood=${mood}`);
  };

  return (
    <div className="container">
      <h1>Select your mood</h1>
      <div className="bubble-container">
        {moods.map((mood, index) => (
          <Bubble
            key={index}
            name={mood}
            onClick={() => handleBubbleClick(mood)}
          />
        ))}
      </div>
    </div>
  );
}

export default MoodInputPage;
