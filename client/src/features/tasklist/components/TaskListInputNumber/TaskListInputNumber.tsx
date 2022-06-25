import React, { useEffect, useState } from "react";
import * as antd from "antd";
import { useDebounce } from "@/hooks";
import "./TaskListInputNumber.less";

export interface ITaskListInputNumberProps {
  prefix: string;
  value: number;
  onChange: (value: number) => void;

  delayDebounce?: number;
}

export const TaskListInputNumber: React.FunctionComponent<ITaskListInputNumberProps> = ({
  prefix,
  value: val,
  onChange,

  delayDebounce = 500,
}) => {
  const [value, setValue] = useState(val);
  const debounce = useDebounce(delayDebounce);

  const handleOnChange = (value: number) => {
    setValue(value);
    debounce(value, onChange);
  };

  useEffect(() => {
    setValue(val);
  }, [val]);

  return (
    <antd.InputNumber
      className="task-list-input-number"
      onChange={handleOnChange}
      bordered={false}
      prefix={prefix}
      value={value}
      size="small"
      min={0}
    />
  );
};
