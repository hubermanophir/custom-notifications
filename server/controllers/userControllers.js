const cron = require("node-cron");

const popNotificationTask = cron.schedule(randomCron(), popNotification, {
  scheduled: false,
});

const initNotification = (req, res) => {
  popNotificationTask.start();
  res.send("success");
};

function popNotification() {
  console.log("hi");
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomCron() {
  const seconds = randomNumber(5, 10);
  console.log(seconds);
  return `*/${seconds} * * * * *`;
}

module.exports = { initNotification };
