import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
const MovieDetail = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    if (movie === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/movies/${id}`)
        .then((res) => {
          setMovie(res.data);
        });
    }
  });
  return (
    <div className="container">
      {movie !== null && (
        <div class="card mb-3 text-center">
        <div class="text-center">
        <img src={movie.image_url} class="card-img-top" alt="megumin"></img>
        <div class="card-body">
          <h2 className="card-title">{movie.title}</h2>
          <p class="card-text">Genre : {movie.genre}</p>
          <p class="card-text">Year: {movie.year}</p>
          <p class="card-text">Dexription : {movie.description}</p>
          <p class="card-text">Review : {movie.review}</p>

          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
