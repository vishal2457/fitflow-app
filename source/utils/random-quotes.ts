const quotes = [
  "Sweat is just fat crying.",
  "Push yourself because no one else is going to do it for you.",
  "Don't stop until you're proud.",
  "Strive for progress, not perfection.",
  "The only bad workout is the one that didn’t happen.",
  "Strong is the new sexy.",
  "Make each day your masterpiece.",
  "Believe in yourself and all that you are.",
  "Your body can stand almost anything. It’s your mind you have to convince.",
  "The pain you feel today will be the strength you feel tomorrow.",
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
