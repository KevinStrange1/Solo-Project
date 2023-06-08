import React, { useState } from 'react';
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
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  const handleBubbleClick = (mood) => {
    setSelectedMood(mood);
  };

  const handleNextClick = () => {
    navigate('/activity');
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
            isSelected={selectedMood === mood}
          />
        ))}
      </div>
      <button
        className="button"
        onClick={handleNextClick}
        disabled={!selectedMood}
      >
        Next
      </button>
    </div>
  );
}

export default MoodInputPage;
