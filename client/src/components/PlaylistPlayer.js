import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const PlaylistPlayer = ({ playlist, accessToken }) => {
  return (
    <div className="spotify-player">
      <h2>Now Playing: {playlist.name}</h2>
      <SpotifyPlayer
        token={accessToken}
        uris={[playlist.uri]}
        styles={{
          activeColor: "#1cb954",
          bgColor: "#282828",
          color: "#ffffff",
          loaderColor: "#1cb954",
          sliderColor: "#1cb954",
          trackArtistColor: "#ffffff",
          trackNameColor: "#ffffff",
        }}
      />
    </div>
  );
};

export default PlaylistPlayer;
