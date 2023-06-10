import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NameInputPage from './components/NameInputPage';
import MoodInputPage from './components/MoodInputPage';
import ActivityInputPage from './components/ActivityInputPage';
import PlaylistPage from './components/PlaylistPage';

function App() {
  return (
    <div className="main">
      <div className="hate">
        <header className="header">
          <h1>GroovyGuru</h1>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<NameInputPage />} exact />
        <Route path="/mood" element={<MoodInputPage />} />
        <Route path="/activity" element={<ActivityInputPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
      </Routes>
    </div>
  );
}

export default App;
