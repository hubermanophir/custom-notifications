const cron = require("node-cron");
const { randomCron } = require("./helperFunctions");

const initNotification = (req, res) => {
  const { id } = req.body;
  const popNotificationTask = cron.schedule(
    randomCron(),
    () => {
      popNotification(id);
    },
    {
      scheduled: false,
    }
  );
  popNotificationTask.start();
  res.send("success");
};

function popNotification(socketId) {
  io.to(socketId).emit("notification", "notification");
}

function getRandomNotification() {}

module.exports = { initNotification };
