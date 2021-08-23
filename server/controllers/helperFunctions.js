function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomCron() {
  const seconds = randomNumber(5, 10);
  return `*/${seconds} * * * * *`;
}

module.exports = { randomCron };
