let handler: NodeJS.Timeout;

// Hook
export const useDebounce = <T extends any>(delay: number): any => {
  const func = (value: T, callback: (val: T) => void) => {
    clearTimeout(handler);
    handler = setTimeout(() => callback(value), delay);
  };

  return func;
};
