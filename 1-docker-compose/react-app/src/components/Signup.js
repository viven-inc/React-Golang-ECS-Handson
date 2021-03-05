import React, { useState } from "react"; 
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from "@material-ui/core/styles";

export default function Signup({ formName, formDescription}) {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    root: {
      padding: theme.spacing(3, 2)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    }
  }));
  const classes = useStyles();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const data = { 
      Email: email,
      Password: password,
    }

    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
          "Content-Type": "application/json",
          "accepts":"application/json"
      }
    })
    .then(response => console.log("Success:", response))
    .then(response => alert("Success 200"))
    .catch(error => console.error("Error:", error));
  }
  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {formName}
        </Typography>
        <Typography component="p">{formDescription}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Email"
            id="margin-normal"
            name="email"
            defaultValue=""
            className={classes.textField}
            helperText="Enter your email for Signup"
            onChange={ event => setEmail(event.target.value)}
          />
          <TextField 
            label="Password"
            id="margin-normal"
            name="password"
            defaultValue=""
            className={classes.textField}
            helperText="Enter your password for Signup"
            onChange={ event => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Signup <SendIcon className={classes.rightIcon}>send</SendIcon>
          </Button>
        </form>
      </Paper>
    </>
  );
}
