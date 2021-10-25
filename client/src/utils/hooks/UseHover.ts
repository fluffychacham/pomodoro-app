import { RefObject, useEffect, useState } from "react";

/**
 * useHover
 *
 * Hook that determines if the mouse element is in the hover element.
 *
 * @param elementRef: RefObject
 * @return boolean
 */
export const useHover = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
) => {
  const [value, setValue] = useState<boolean>(false);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  useEffect(() => {
    const node = elementRef?.current;

    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [elementRef]);

  return value;
};
