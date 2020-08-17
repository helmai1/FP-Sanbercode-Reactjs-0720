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
    <div className="container">
      {game !== null && (
          
          <div class="card mb-3 text-center">
          <div class="text-center">
          <img src={game.image_url} class="card-img-top" alt="megumin"></img>
          <div class="card-body">
            <h2 class="card-title">{game.name}</h2>
            <p class="card-text">Genre: {game.genre}</p>
            <p class="card-text">Single Player: {game.singlePlayer}</p>
            <p class="card-text">Multi Player: {game.multiPlayer}</p>
            <p class="card-text">Platform: {game.platform}</p>
            <p class="card-text"><small class="text-muted">Release: {game.release}</small></p>
          </div>
          </div>
        </div>
      )}
      </div>
  );
};

export default GameDetail;
