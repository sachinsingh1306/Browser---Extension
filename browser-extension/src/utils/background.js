export const getRandomBackground = () => {
  const random = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/800/600?random=${random}`;
};