import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NameInputPage from './components/NameInputPage';
import MoodInputPage from './components/MoodInputPage';
import ActivityInputPage from './components/ActivityInputPage';
import PlaylistPage from './components/PlaylistPage';
import useAuth from './components/useAuth';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  const accessToken = useAuth(code);

  return (
    <main>
      <div className="hate">
        <header>
          <h1>GroovyGuru</h1>
        </header>
      </div>
      <Routes>
        <Route path="/" element={code ? <NameInputPage /> : <Login />} />
        <Route path="/mood" element={<MoodInputPage />} />
        <Route path="/activity" element={<ActivityInputPage />} />
        <Route
          path="/playlist"
          element={<PlaylistPage accessToken={accessToken} />}
        />
      </Routes>
    </main>
  );
}

export default App;
