import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import PlaylistPlayer from './PlaylistPlayer';

function PlaylistPage({ accessToken }) {
  const [playlists, setPlayLists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedMood = queryParams.get('mood'); /* get selectedMood */
  const selectedActivity =
    queryParams.get('activity'); /* get selected activity */
  const selectedName = queryParams.get('name');

  useEffect(() => {
    const fetchPlayLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/spotify-search/${selectedMood}/${selectedActivity}`
        );
        setPlayLists(response.data.playlists.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlayLists();
  }, [selectedMood, selectedActivity]);

  useEffect(() => {
    const addSearch = async () => {
      try {
        await axios.post('http://localhost:3001/add-search', {
          name: selectedName,
          mood: selectedMood,
          activity: selectedActivity,
        });
      } catch (error) {
        console.error('Failed to add search:', error);
      }
    };
    addSearch();
  }, [selectedMood, selectedActivity, selectedName]);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleRestartClick = () => {
    setSelectedPlaylist(null);
    navigate('/');
  };

  return (
    <div className="container">
      {playlists.length === 0 ? (
        <h2>Sorry, something went wrong. Please try different options.</h2>
      ) : selectedPlaylist ? (
        <PlaylistPlayer playlist={selectedPlaylist} accessToken={accessToken} />
      ) : (
        <>
          <h2>Recommended Playlists for {selectedName} </h2>
          <div className="playlist">
            {playlists.map((playlist) => (
              <div
                className="image-title"
                key={playlist.id}
                onClick={() => {
                  handlePlaylistClick(playlist);
                }}
              >
                <img
                  className="images"
                  src={playlist.images[0].url}
                  alt={playlist.name}
                />
                <div className="playlist-title">{playlist.name}</div>
              </div>
            ))}
          </div>
        </>
      )}
      <button className="button" onClick={handleRestartClick}>
        Start Over
      </button>
    </div>
  );
}

export default PlaylistPage;
