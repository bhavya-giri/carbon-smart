export const getQuestions = async () => {
  const response = await fetch(`${import.meta.env.VITE_GAME_PORT}/questions/random`);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
};

 const newGameModel = () => {
  return {
    startTimestamp: new Date(Date.now()),
    endTimestamp: null,
    livesLeft: 3,
    score: 0,
  };
};

export const newGame = async () => {
  return newGameModel();
};