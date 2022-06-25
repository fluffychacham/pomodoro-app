import React, { useEffect, useState } from "react";
import * as antd from "antd";
import { useDebounce } from "@/hooks";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import "./TaskListCheckbox.less";

export interface ITaskListCheckbox {
  checked: boolean;
  delayedOnChange: (value: boolean) => void;
  onChange?: (value: boolean) => void;
  debounceDelay?: number;
}

export const TaskListCheckbox: React.FunctionComponent<ITaskListCheckbox> = ({
  checked: value,
  delayedOnChange,
  onChange,
  debounceDelay = 500,
}) => {
  const [checked, setChecked] = useState(value);
  const debounce = useDebounce(debounceDelay);

  const handleOnChange = (e: CheckboxChangeEvent) => {
    const newValue = e.target.checked;
    onChange && onChange(newValue);
    setChecked(newValue);
    debounce(newValue, delayedOnChange);
  };

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <antd.Checkbox
      autoFocus
      className="task-list-checkbox"
      checked={checked}
      onChange={handleOnChange}
    />
  );
};
