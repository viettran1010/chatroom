import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "regenerator-runtime/runtime"; // import this to use async/await with parcel

const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    "& .MuiFilledInput-root": {
      backgroud: "#f6f6f6",
      borderRadius: 10,
    },
    width: "100%",
  },
  button: {
    background: "#5db075",
    width: "100%",
    borderRadius: 10,
    padding: "0 30px",
    height: "50px",
  },
  title: {
    width: "100%",
    fontWeight: 500,
  },
}));

const Login = ({ socket }) => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <>
      <Container>
        <Box>
          <Typography variant="h3" align="center" className={classes.title}>
            Join Chatroom
          </Typography>
        </Box>
        <Box m={2}>
          <TextField
            variant="filled"
            fullWidth
            className={classes.textField}
            placeholder="Username"
            InputProps={{ disableUnderline: true }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></TextField>
        </Box>
        <Box m={2}>
          <TextField
            variant="filled"
            className={classes.textField}
            placeholder="RoomID"
            InputProps={{ disableUnderline: true }}
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          ></TextField>
        </Box>
        <Box m={2} mt={10}>
          <Button
            className={classes.button}
            onClick={async () => {
              //TODO: request to create user/join room first
              const res = await axios.post("http://localhost:3000/api/users", {
                name: username,
                roomId,
              });

              if (!socket) {
                console.error("socket is not defined!");
                return;
              }
              socket.emit("joinRoom", { username, roomId });
              history.push(`/room/${roomId}/${username}`);
              console.log(history);
            }}
          >
            JOIN
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
