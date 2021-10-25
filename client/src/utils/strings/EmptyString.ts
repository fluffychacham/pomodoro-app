/**
 * Is string empty
 *
 * Checks whether the string is empty, null, or undefined;
 *
 * str == undefined -> true
 * str == null      -> true
 * str == ""        -> true
 *
 * @param str string
 * @returns boolean
 */
export const isStringEmpty = (str?: string | null): boolean => {
  return (str || "").length <= 0;
};

/**
 * Is string null or undefined
 *
 * Checks whether the string is null or undefined.
 * Does not check if string is empty.
 *
 * str == undefined -> true
 * str == null      -> true
 * str == ""        -> false
 *
 * @param str string
 * @returns boolean
 */
export const isStringNullOrUndefined = (str?: string | null): boolean => {
  return str == null;
};
