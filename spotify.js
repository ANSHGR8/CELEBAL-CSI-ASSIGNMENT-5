import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-position',
  'user-top-read',
  'user-library-read',
  'playlist-read-private',
  'playlist-read-collaborative'
];

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const redirectUri = 'http://localhost:3000/';
const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

export { spotifyApi, loginUrl };
