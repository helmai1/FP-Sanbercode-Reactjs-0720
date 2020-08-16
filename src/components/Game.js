import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const Game = () => {
    const [games, setGames] = useState(null);
    useEffect(() => {
      if (games === null) {
        axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
          setGames(
            res.data.map((el) => {
              return {
                id: el.id,
                name: el.name,
                singlePlayer: el.singlePlayer,
                multiPlayer: el.multiPlayer,
                genre: el.genre,
                platform: el.platform,
                release: el.release,
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
        <h1 className="text-center">Reviewed Games</h1>
        {games !== null &&
          games.map((el) => {
            return (
              <>
                <div className="card">
                <div class="text-center">
                <div className="cardHead">
                    <Link className="detail" to={`/games/${el.id}`}>
                      <img src={el.image_url}></img>
                    </Link>
                  </div>
                  <div className="judul">
                    <Link className="detail" to={`/games/${el.id}`}>
                      <h2>{el.name}</h2>
                    </Link>

                    <h3>Platform : {el.platform}</h3>
                  </div>
                </div>
                </div>
              </>
            );
          })}
      </div>
      </div>
      </div>
        </React.Fragment>
    );
};
export default Game;
