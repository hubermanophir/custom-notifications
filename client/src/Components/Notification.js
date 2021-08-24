import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification({ type, text }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {text}
      </MuiAlert>
    </div>
  );
}
