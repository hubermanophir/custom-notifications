//random number gen in range
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Generates the seconds for notification send
function randomCron() {
  const seconds = randomNumber(5, 10);
  return `*/${seconds} * * * * *`;
}

//Getting random notification that user doesn't have saved
function getRandomNotification(notificationArray, userSavedNotification) {
  let filtered = notificationArray;
  if (userSavedNotification.length === notificationArray.length) {
    return null;
  } else if (userSavedNotification.length > 0) {
    userSavedNotification.forEach((notification) => {
      filtered = filtered.filter((elem) => elem.text !== notification.text);
    });
  }
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

module.exports = {
  randomCron,
  randomNumber,
  getRandomNotification,
};
