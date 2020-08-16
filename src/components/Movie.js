import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieDetail from "../components/detail-pages/MovieDetail"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const Movie = () => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    if (movies === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/movies`)
        .then((res) => {
          setMovies(
            res.data.map((el) => {
              return {
                id: el.id,
                title: el.title,
                description: el.description,
                year: el.year,
                genre: el.genre,
                rating: el.rating,
                review: el.review,
                image_url: el.image_url,
              };
            })
          );
        });
    }
  });
  return (
    <React.Fragment>
      <div className="container">
        <div class="row">
        <div class="col-sm-12">
        <h1 className="text-center">Reviewed Movies</h1>
        {movies !== null &&
          movies.map((el) => {
            return (
                  <div className="card">
                    <div class="text-center">
                    <div className="cardHead">
                      <Link className="detail" to={`/movies/${el.id}`}>
                        <img src={el.image_url}></img>
                      </Link>
                    </div>
                    <div className="judul">
                      <Link className="detail" to={`/movies/${el.id}`}>
                        <h1>{el.title}</h1>
                      </Link>

                      <h3>Rating : {el.rating}</h3>
                    </div>
                    
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Movie;
