import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

//component
import Movie from '../Movie';
import MovieDetail from '../detail-pages/MovieDetail';
import Game from '../Game';
import GameDetail from '../detail-pages/GameDetail';
import Manage from '../Manage';
import Manage2 from '../Manage2';
import Login from '../Login';

const Navbar = () => {
    return(
        <Router>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">HelmiReview</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link class="nav-link" to="">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/movie">Movie</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/game">Game</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/manage-movies">Manage Movies</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/manage-games">Manage Games</Link>
                    </li>
                </ul>
                <button class="btn btn-outline-info my-2 my-sm-0" type="submit"><Link to="/manage-games">Login</Link></button>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">Register</button>
            </div>
        </nav>

        <Switch>
          <Route exact path="/movie">
            <Movie />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
          <Route exact path="/manage-movies">
            <Manage />
          </Route>
          <Route exact path="/manage-games">
            <Manage2 />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/movies/:id" component={MovieDetail} />
          <Route exact path="/games/:id" component={GameDetail} />
        </Switch>
        </Router>
    )
}

export default Navbar;
