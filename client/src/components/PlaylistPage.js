import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function PlaylistPage() {
  const [playlists, setPlayLists] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedMood = queryParams.get('mood'); /* get selectedMood */
  const selectedActivity =
    queryParams.get('activity'); /* get selected activity */

  useEffect(() => {
    const fetchPlayLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/spotify-search/${selectedMood}/${selectedActivity}`
        );
        console.log(response.data.playlists.items);
        setPlayLists(response.data.playlists.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlayLists();
  }, [selectedMood, selectedActivity]);

  const handlePlaylistClick = (playlist) => {
    // Do something with playlist
  };

  const handleRestartClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Recommended Playlists</h1>
      <div className="playlist">
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.stopPropagation();
              handlePlaylistClick(playlist);
            }}
          >
            <img
              className="images"
              src={playlist.images[0].url}
              alt={playlist.name}
            />
            <div className="playlist-title">{playlist.name}</div>
          </a>
        ))}
      </div>
      <button className="button" onClick={handleRestartClick}>
        Start Over
      </button>
    </div>
  );
}

export default PlaylistPage;
