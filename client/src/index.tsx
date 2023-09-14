import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Couldn't find root element!");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);
