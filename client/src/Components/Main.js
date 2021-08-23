import React, { useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

export default function Main() {
  useEffect(() => {
    const newSocket = io.connect("http://localhost:8080");
    newSocket.on("connect", (data) => {
      console.log("Connected to socket");
      axios.post("http://localhost:8080/api/v1/user/init", {
        id: newSocket.id,
      });
      newSocket.on("notification", (data) => {
        console.log(new Date());
        console.log(data);
      });
      newSocket.on("disconnect", () => {
        console.log("Disconnected from socket");
      });
    });
  }, []);
  return <div></div>;
}
