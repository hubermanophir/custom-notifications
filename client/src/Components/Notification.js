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
  setSkipped,
  skipped,
}) {
  const classes = useStyles();
  const clickHandler = async () => {
    setNotificationVisible(false);
    await axios.post("http://localhost:8080/api/v1/user/notification", {
      userId,
      notification,
    });
    if (skipped === 3) {
      setSkipped(1);
    } else {
      setSkipped((prev) => (prev += 1));
    }
  };

  const manipulateText = (text) => {
    let temp = text;
    if (temp.match(/sale/i)) {
      temp = temp + "!";
    }
    if (temp.match(/new/i)) {
      temp = "~~" + temp + "~~";
    }
    if (temp.toLowerCase().includes("limited edition")) {
      const original = temp.split(" ");
      const lowerCase = original.map((str) => str.toLowerCase());
      const limitedIndex = lowerCase.indexOf("limited");
      original[limitedIndex] = original[limitedIndex].toUpperCase();
      original[limitedIndex + 1] = original[limitedIndex + 1].toUpperCase();
      temp = original.join(" ");
    }
    return temp;
  };
  return (
    <div className={classes.root}>
      <MuiAlert
        onClick={clickHandler}
        elevation={6}
        variant="filled"
        severity={type}
      >
        {manipulateText(text)}
      </MuiAlert>
    </div>
  );
}
