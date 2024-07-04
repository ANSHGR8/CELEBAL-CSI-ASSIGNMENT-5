import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "./utils/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useAuth();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });

      spotify.getMyTopArtists().then((top_artists) => {
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists,
        });
      });
    }
  }, [token, dispatch]);

  return <div className="app">{token ? <Dashboard spotify={spotify} /> : <Login />}</div>;
}

export default App;
