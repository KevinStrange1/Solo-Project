# GroovyGuru

GroovyGuru is a web application that generates Spotify playlists based on the user's mood and activity. This application is built with React.js for the frontend, Express.js and Node.js for the backend, and MongoDB for the database.

## Getting Started

To use the application, simply visit [GroovyGuru](https://groove-guru.vercel.app/) in your browser.

## Features

- User input for name, mood, and activity
- Dynamic routing using React Router
- Fetching data from Spotify API

## Tech Stack

The core technologies used in this project are:

- Frontend:
  - React.js
  - React Router
- Backend:
  - Express.js
  - Node.js
  - MongoDB

---

## Installation

Follow these steps to run the project locally:

1. Clone this repository
   git clone https://github.com/KevinStrange1/Solo-Project

2. Navigate into the project folder and install dependencies in both the frontend and backend directories

```bash copy code
   cd client
   npm install
```

```bash copy code
   cd server
   npm install
```

3. Create a .env file in the backend directory and add your MongoDB URI, Spotify Client ID, and Spotify Client Secret:

```bash copy code
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
```

4. Start both the frontend and backend servers (you'll need two terminal windows for this):

```bash copy code
# Terminal window 1

cd frontend
npm start
```

```bash copy code
# Terminal window 2

cd backend
node index.js
```

## Usage

Visit https://groove-guru.vercel.app/ in your browser to use the application. Enter your name, select your current mood and activity, and get a list of Spotify playlists based on your choices.
