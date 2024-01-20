const getRandomNumber = (min, max) => {
  const randomValue = Math.random() * (max - min) + min;

  return Math.round(randomValue);
};

const getBgImage = (_min = 480, _max = 540) => {
  const x = getRandomNumber(_min, _max);
  const y = getRandomNumber(_min, _max);

  //NOTE: Even if the images URLs are diferent sometimes the image is the same but in diferent dimensions
  return `https://placekitten.com/${x}/${y}`;
};

export { getRandomNumber, getBgImage };
