import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Notification from "./Notification";

export default function Main() {
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(async () => {
    const newSocket = io.connect("http://localhost:8080");
    newSocket.on("connect", async (data) => {
      console.log("Connected to socket");
      const res = await axios.post("http://localhost:8080/api/v1/user/init", {
        id: newSocket.id,
      });
      setUser(res.data.user._id);
      newSocket.on("notification", (data) => {
        setNotification(data);
        setNotificationVisible(true);

        console.log(data);
      });
      newSocket.on("disconnect", () => {
        console.log("Disconnected from socket");
      });
    });
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        console.log(notification.appearTime * 1000, "time passed");
        setNotificationVisible(false);
      }, notification.appearTime * 1000);
    }
  }, [notification]);

  return (
    <div>
      {notificationVisible && (
        <Notification type={notification.type} text={notification.text} />
      )}
    </div>
  );
}
