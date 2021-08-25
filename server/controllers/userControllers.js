const cron = require("node-cron");
const {
  randomCron,
  randomNumber,
  getRandomNotification,
  manipulateText,
} = require("./helperFunctions");

const notifications = require("../utils/notifications.json");
const UserModel = require("../models/User");

const initNotification = async (req, res) => {
  const socketId = req.body.id;
  const user = new UserModel();
  await user.save();
  const appearTime = randomNumber(1, 4);
  const popNotificationTask = cron.schedule(
    randomCron(),
    async () => {
      await popNotification(socketId, user._id, appearTime);
    },
    {
      scheduled: false,
    }
  );
  popNotificationTask.start();

  res.json({ message: "success", user });
};

const clickNotification = async (req, res) => {
  const { userId, notification } = req.body;
  const user = await UserModel.findById(userId);
  user.notifications.push(notification);
  await user.save();
  res.json({ message: "Success" });
};

async function popNotification(socketId, userId, appearTime) {
  const user = await UserModel.findById(userId);
  const userNotifications = user.notifications;
  const notification = getRandomNotification(notifications, userNotifications);
  notification.appearTime = appearTime;
  io.to(socketId).emit("notification", notification);
}

module.exports = { initNotification, clickNotification };
