import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const PlaylistPlayer = ({ playlist, accessToken }) => {
  return (
    <div className="spotify-player">
      <h2>Now Playing: {playlist.name}</h2>
      <div className="player">
        <SpotifyPlayer
          token={accessToken}
          uris={[playlist.uri]}
          styles={{
            activeColor: '#1cb954',
            bgColor: '#282828',
            color: '#ffffff',
            loaderColor: '#1cb954',
            sliderColor: '#1cb954',
            trackArtistColor: '#ffffff',
            trackNameColor: '#ffffff',
          }}
        />
      </div>
    </div>
  );
};

export default PlaylistPlayer;

// return (
//   <div className="spotify-player">
//     <h2>Now Playing: {playlist.name}</h2>
//     <SpotifyPlayer
//       uri={playlist.uri}
//       size={{ width: '100%', height: '500' }}
//       view="list"
//       theme="black"
//     />
//   </div>
// );
