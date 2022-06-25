import * as icon from "@ant-design/icons";
import * as antd from "antd";
import React from "react";
import "./PomodoroControls.less";

const ICON_SIZE = 30;

export interface IPomodoroControlProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isRunning: boolean;
  onNext: () => void;
}

export const PomodoroControls: React.FunctionComponent<IPomodoroControlProps> = ({
  onStart,
  onPause,
  onReset,
  isRunning,
  onNext,
}) => {
  return (
    <div className="pomodoro-controls">
      <antd.Button size="large" onClick={onReset} icon={<icon.RedoOutlined size={ICON_SIZE} />} />
      <antd.Button
        size="large"
        onClick={!isRunning ? onStart : onPause}
        icon={
          !!isRunning ? (
            <icon.PauseOutlined size={ICON_SIZE} />
          ) : (
            <icon.CaretRightOutlined size={ICON_SIZE} />
          )
        }
      >
        {!!isRunning ? "Pause" : "Start"}
      </antd.Button>
      <antd.Button
        size="large"
        onClick={onNext}
        icon={<icon.StepForwardOutlined size={ICON_SIZE} />}
      />
    </div>
  );
};
