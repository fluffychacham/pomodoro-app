/**
 * Convert milliseconds to minutes
 *
 * @param milliseconds number
 * @returns {number} number
 */
export const convertMillisecondsToMinutes = (milliseconds: number): number => {
  return milliseconds / 60000;
};

/**
 * Convert minutes to milliseconds
 *
 * @param minutes number
 * @returns {number} number
 */
export const convertMinutesToMilliseconds = (minutes: number): number => {
  return minutes * 60000;
};

/**
 * Convert minutes to seconds
 *
 * @param minutes number
 * @returns {number} number
 */
export const convertMinutesToSeconds = (minutes: number): number => {
  return minutes * 60;
};

/**
 * Convert seconds to milliseconds
 *
 * @param seconds number
 * @returns {number} number
 */
export const convertSecondsToMilliseconds = (seconds: number): number => {
  return seconds * 1000;
};

/**
 * Convert milliseconds to min sec format
 *
 * @param milliseconds number
 * @returns {string} string
 */
export const convertMillisecondsToMinSecFormat = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
