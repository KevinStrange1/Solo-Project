import React from 'react';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=e665f2df3b3c4e19bbc7449267ebff04&response_type=code&redirect_uri=https://groove-guru.vercel.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
// 'https://accounts.spotify.com/authorize?client_id=e665f2df3b3c4e19bbc7449267ebff04&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
function Login() {
  return (
    <div className="container">
      <a className="button " href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  );
}

export default Login;
