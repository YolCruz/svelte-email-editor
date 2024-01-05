export const ID_LENGTH = 8;

export function generateRandomSequence(length: number) {
  // Define the characters that can be in the sequence
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // The variable to hold the generated sequence
  let result = '';

  // Generate a random index and append the character at that index to the result
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  // Return the generated sequence
  return result;
}