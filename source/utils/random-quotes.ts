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

const restDaySuggestions = [
  "Great work! Time for a well-earned rest day.",
  "Your body needs a break. Take a rest today!",
  "Recharge today, come back stronger tomorrow.",
  "Rest is key! Take it easy today.",
  "Take a breather. You’ve earned it!",
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const getRandomRestDayMessage = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return restDaySuggestions[randomIndex];
};
