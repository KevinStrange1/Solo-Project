import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PlaylistPage() {
  const [playlists, setPlayLists] = useState([]);
  const navigate = useNavigate();

  const selectedMood = ''; /* get selectedMood */
  const selectedActivity = ''; /* get selected activity */

  // useEffect(() => {
  //   fetchPlayLists(selectedMood, selectedActivity)
  //     .then((playlists) => {
  //       setPlayLists(playlists);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching playlists:', error);
  //     });
  // }, [selectedMood, selectedActivity]);

  const handlePlaylistClick = (playlist) => {
    // Do something with playlist
  };

  const handleRestartClick = () => {
    navigate('/');
  };

  // if (playlists.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container">
      <h1>Recommended Playlists</h1>
      {playlists.map((playlist) => (
        <div key={playlist.id} onClick={() => handlePlaylistClick(playlist)}>
          {playlist.name}
        </div>
      ))}
      <button className="button" onClick={handleRestartClick}>
        Start Over
      </button>
    </div>
  );
}

export default PlaylistPage;
