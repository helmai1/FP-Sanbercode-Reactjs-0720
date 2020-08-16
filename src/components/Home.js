import React from 'react';
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";


import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

const Home = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <div class="container">
            <div class="card text-center">
            <div class="card text-white text-center p-3" >
            <div class="col align-self-center">
            <h5 class="card-title text-white">Hello My Name is Helmi Effendi</h5>
            <img src="https://cdn.costumewall.com/wp-content/uploads/2019/09/megumin.jpg" class="card-img-top" alt="megumin"></img>
            </div>
            <div class="card-body">
                <p class="card-text">Selamat Datang di Web Review Film dan Game.</p>
            </div>
            </div>    
            </div>
            </div>
            <Footer/>
        </React.Fragment>
    );
};
export default Home;
