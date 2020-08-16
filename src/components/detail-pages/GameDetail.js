import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
const GameDetail = () => {
  let { id } = useParams();
  const [game, setGame] = useState(null);
  useEffect(() => {
    if (game === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/games/${id}`)
        .then((res) => {
          setGame(res.data);
        });
    }
  });
  return (
    <>
      {game !== null && (
        <div className="content">
          <h1>{game.name}</h1>
          <h2>Genre: {game.genre}</h2>
          <h2>Single Player: {game.singlePlayer}</h2>
          <h2>Multi Player: {game.multiPlayer}</h2>
          <h2>Platform: {game.platform}</h2>

          <h2>Release: {game.release}</h2>
        </div>
      )}
    </>
  );
};

export default GameDetail;
