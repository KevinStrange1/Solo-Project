# GroovyGuru

GroovyGuru is a web application that generates Spotify playlists based on the user's mood and activity. This application is built with React.js for the frontend, Express.js and Node.js for the backend, and MongoDB for the database.

## Features

- User input for name, mood, and activity
- Dynamic routing using React Router
- Fetching data from Spotify API
- Storing user's mood and activity choices in MongoDB

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
   MONGODB_URI=your_mongodb_uri
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

The frontend server will run on port 3000 and the backend server on port 3001.

## Usage

Visit http://localhost:3000 in your browser to use the application. Enter your name, select your current mood and activity, and get a list of Spotify playlists based on your choices.
