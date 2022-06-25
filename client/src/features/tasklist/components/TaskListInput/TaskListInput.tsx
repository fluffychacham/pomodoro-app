import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import "./TaskListInput.less";
import * as antd from "antd";
import { useDebounce } from "@/hooks";

export interface ITaskListInputProps<T> {
  value: T;
  onChange: (value: T) => void;
  delayedOnChange?: (value: T) => void;
  onEnterPressed?: () => void;

  done?: boolean;
  debounceDelay?: number;
}

export const TaskListInputInner = <T extends string | number | readonly string[] | undefined>(
  {
    value,
    onChange,
    delayedOnChange,
    onEnterPressed,
    done = false,
    debounceDelay = 500,
  }: ITaskListInputProps<T>,
  ref: any
): React.ReactElement => {
  const [inputValue, setInputValue] = useState<T>(value);
  const debounce = useDebounce(debounceDelay);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value as T;
    onChange(newValue);
    setInputValue(newValue);
    debounce(newValue, delayedOnChange);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <antd.Input.TextArea
      ref={ref}
      className="task-list-input"
      data-done={done}
      value={inputValue}
      onChange={handleOnChange}
      bordered={false}
      autoSize
      onPressEnter={(e) => {
        e.preventDefault();
        onEnterPressed && onEnterPressed();
      }}
    />
  );
};

export const TaskListInput = forwardRef(TaskListInputInner) as <T>(
  props: ITaskListInputProps<T> & { ref: ForwardedRef<HTMLTextAreaElement> }
) => ReturnType<typeof TaskListInputInner>;
