import { DateTime } from "luxon";
import { FunctionComponent, useEffect, useState } from "react";

import style from "./TimeDisplay.module.scss";

/**
 * Time display react component.
 *
 * @return Tsx
 */
export const TimeDisplay: FunctionComponent = () => {
  const getFormattedTime = () =>
    DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);
  const [timeString, setTimeString] = useState(getFormattedTime());

  useEffect(() => {
    // Update time string every minute
    const timeout = setInterval(() => {
      setTimeString(getFormattedTime());
    }, 1000); // Interval every half minute

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return <div className={style.container}>{timeString}</div>;
};
