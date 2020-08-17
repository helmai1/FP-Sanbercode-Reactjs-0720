import React, { useContext, useState } from "react";
import userContext from "../components/context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useContext(userContext);
    const history = useHistory();
    const [input, setInput] = useState({
      username: "",
      password: "",
      createUsername: "",
      createPassword: "",
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .post(`https://backendexample.sanbersy.com/api/login`, {
          username: input.username,
          password: input.password,
        })
        .then((res) => {
          if (res.data.id) {
            setUser({
              id: res.data.id,
              username: input.username,
              password: input.password,
            });
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: res.data.id,
                username: input.username,
                password: input.password,
              })
            );
            setInput({ ...input, username: "", password: "" });
            alert("Login Successful!");
            history.push("/");
          } else {
            alert("Wrong username or password!");
          }
        });
      setInput({ ...input, username: "", password: "" });
    };
  
    const handleCreate = (event) => {
      event.preventDefault();
      let date = new Date().toLocaleString();
      axios.post(`https://backendexample.sanbersy.com/api/users`, {
        created_at: date,
        username: input.createUsername,
        password: input.createPassword,
      });
      setInput({ ...input, createUsername: "", createPassword: "" });
      alert("Account created!");
    };
  
    const handleChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;
      switch (name) {
        case "username": {
          setInput({ ...input, username: value });
          break;
        }
        case "password": {
          setInput({ ...input, password: value });
          break;
        }
        case "createUsername": {
          setInput({ ...input, createUsername: value });
          break;
        }
        case "createPassword": {
          setInput({ ...input, createPassword: value });
          break;
        }
        default: {
          break;
        }
      }
    };
  
    return (
      <>
        <div className="container">
          <h2>Login</h2>
          <form className="loginForm" onSubmit={handleSubmit} >
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input class="form-control" type="text" name="username" value={input.username} onChange={handleChange}/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input class="form-control" type="password" name="password" value={input.password} onChange={handleChange}/>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          <form
            className="makeAccount"
            onSubmit={handleCreate}
          >
            <h2>Register</h2>
            <div class="form-group">
            <label>new Username: </label>
            <input class="form-control" type="text" name="createUsername" value={input.createUsername} onChange={handleChange}/>
            </div>
            <div class="form-group">
            <label>new Password: </label>
            <input class="form-control"  type="text" name="createPassword" value={input.createPassword} onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </>
    );
  };
  
  export default Login;