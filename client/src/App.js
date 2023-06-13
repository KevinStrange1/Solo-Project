import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NameInputPage from './components/NameInputPage';
import MoodInputPage from './components/MoodInputPage';
import ActivityInputPage from './components/ActivityInputPage';
import PlaylistPage from './components/PlaylistPage';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <div className="main">
      <div className="hate">
        <header className="header">
          <h1>GroovyGuru</h1>
        </header>
      </div>
      <Routes>
        <Route
          path="/"
          element={code ? <NameInputPage code={code} /> : <Login />}
          exact
        />
        <Route path="/mood" element={<MoodInputPage />} />
        <Route path="/activity" element={<ActivityInputPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
      </Routes>
    </div>
  );
}

export default App;
