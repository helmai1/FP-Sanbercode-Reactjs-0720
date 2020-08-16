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
    const useStyles = makeStyles((theme) => ({
      root: {
        "& .MuiTextField-root": {
          margin: theme.spacing(1),
          width: "25ch",
        },
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
      },
      input: {
        color: "white",
      },
      floatingLabelFocusStyle: {
        color: "gray",
      },
    }));
    const classes = useStyles();
  
    return (
      <>
        <div className="content">
          <h2>Login here!</h2>
          <form
            className="loginForm"
            className={classes.root}
            onSubmit={handleSubmit}
          >
            <label>Username: </label>
            <TextField
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                className: classes.input,
              }}
              color="white"
              variant="outlined"
              label="username"
              type="text"
              name="username"
              onChange={handleChange}
              value={input.username}
            />
            <br />
            <label>Password: </label>
            <TextField
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                className: classes.input,
              }}
              variant="outlined"
              label="password"
              type="password"
              name="password"
              onChange={handleChange}
              value={input.password}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              type="Submit"
            >
              Login
            </Button>
          </form>
          <form
            className="makeAccount"
            className={classes.root}
            onSubmit={handleCreate}
          >
            <h2>Don't have any account yet? Make one here!</h2>
            <label>new Username: </label>
            <TextField
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                className: classes.input,
              }}
              label="new username"
              variant="outlined"
              type="text"
              name="createUsername"
              onChange={handleChange}
              value={input.createUsername}
            />
            <br />
            <label>new Password: </label>
            <TextField
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                className: classes.input,
              }}
              variant="outlined"
              label="new password"
              type="password"
              name="createPassword"
              onChange={handleChange}
              value={input.createPassword}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              type="Submit"
            >
              Create Account
            </Button>
          </form>
        </div>
      </>
    );
  };
  
  export default Login;