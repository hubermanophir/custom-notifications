import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification({
  type,
  text,
  setNotificationVisible,
  userId,
  notification,
}) {
  const classes = useStyles();
  const clickHandler = async () => {
    setNotificationVisible(false);
    await axios.post("http://localhost:8080/api/v1/user/notification", {
      userId,
      notification,
    });
  };

  return (
    <div className={classes.root}>
      <MuiAlert
        onClick={clickHandler}
        elevation={6}
        variant="filled"
        severity={type}
      >
        {text}
      </MuiAlert>
    </div>
  );
}
