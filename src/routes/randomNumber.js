// randomNumber.js

let sharedRandomNumber = null;

export function setRandomNumber(number) {
  sharedRandomNumber = number;
}

export function getRandomNumber() {
  return sharedRandomNumber;
}
