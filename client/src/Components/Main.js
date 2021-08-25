import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Notification from "./Notification";

export default function Main() {
  const [userId, setUserId] = useState();
  const [notification, setNotification] = useState();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [skipped, setSkipped] = useState(0);

  const init = async () => {
    const newSocket = io.connect("/");
    newSocket.on("connect", async (data) => {
      console.log("Connected to server");
      const res = await axios.post("/api/v1/user/init", {
        id: newSocket.id,
      });
      setUserId(res.data.user._id);
      newSocket.on("notification", (data) => {
        if (data) {
          setSkipped((prev) =>
            prev === 1 ? (prev += 1) : prev === 2 ? (prev += 1) : prev
          );
          setNotification(data);
          setNotificationVisible(true);
        }
      });
      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotificationVisible(false);
      }, notification.appearTime * 1000);
    }
  }, [notification]);

  return (
    <div>
      {skipped !== 2 && notificationVisible && (
        <Notification
          type={notification.type}
          text={notification.text}
          setNotificationVisible={setNotificationVisible}
          userId={userId}
          notification={notification}
          setSkipped={setSkipped}
          skipped={skipped}
        />
      )}
    </div>
  );
}
