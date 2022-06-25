import { useTimeout } from "@/hooks";
import { DateTime } from "luxon";
import React, { useCallback } from "react";
import "./Time.less";

export const Time: React.FunctionComponent = () => {
  const getTime = useCallback(() => DateTime.now().toLocaleString(DateTime.TIME_SIMPLE), []);
  const [time, setTime] = React.useState<string>(getTime());

  // Update the time every half a minute
  useTimeout(() => setTime(getTime()), 30000);

  return <div className="time">{time}</div>;
};
