import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

function PlaylistPlayer({ playlist }) {
  return (
    <div className="spotify-player">
      <h2>Now Playing: {playlist.name}</h2>
      <SpotifyPlayer
        uri={playlist.uri}
        size={{ width: '100%', height: '500' }}
        view="list"
        theme="black"
      />
    </div>
  );
}

export default PlaylistPlayer;
