import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";

import style from "./TimeDisplay.module.scss";

/**
 * Time display react component.
 *
 * @return Tsx
 */
export const TimeDisplay: FunctionComponent = () => {
  const getFormattedTime = () => moment().format("LTS");
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
