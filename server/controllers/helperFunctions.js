function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomCron() {
  const seconds = randomNumber(5, 10);
  return `*/${seconds} * * * * *`;
}

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

function manipulateText(text) {
  if (text.match(/sale/i)) {
    return text + "!";
  } else if (text.match(/new/i)) {
    return "~~" + text + "~~";
  } else if (text.match(/limited edition/i)) {
    const original = text.split("");
    const lowerCase = original.map((str) => str.toLowerCase());
    const limitedIndex = lowerCase.indexOf("limited");
    original[limitedIndex] = original[limitedIndex].toUpperCase();
    original[limitedIndex + 1] = original[limitedIndex + 1].toUpperCase();
    return original.join(" ");
  } else {
    return text
  }
}

module.exports = {
  randomCron,
  randomNumber,
  getRandomNotification,
  manipulateText,
};
