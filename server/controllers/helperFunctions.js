function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomCron() {
  const seconds = randomNumber(5, 10);
  return `*/${seconds} * * * * *`;
}

function getRandomNotification(notificationArray, userSavedNotification) {
  let filtered = [];
  if (userSavedNotification.length > 0) {
    userSavedNotification.forEach((notification) => {
      filtered = notificationArray.filter(
        (elem) =>
          elem.type !== notification.type && elem.text !== notification.text
      );
    });
  } else {
    filtered = notificationArray;
  }
  const index = Math.floor(Math.random() * filtered.length);

  return filtered[index];
}

module.exports = { randomCron, randomNumber, getRandomNotification };
