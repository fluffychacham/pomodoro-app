import { convertMillisecondsToMinSecFormat } from "@/utils";
import React from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import "./CircleProgressBar.less";

const CIRCLE_SIZE = 300;
const INNER_RADIUS = 110;
const OUTER_RADIUS = 200;
const BAR_SIZE = 10;

const PROGRESS_FILL_COLOR = "#CEFF1A";

export interface ICircleProgressBarProps {
  value: number;
  max: number;
}

export const CircleProgressBar: React.FunctionComponent<ICircleProgressBarProps> = ({
  value,
  max,
}) => {
  return (
    <div className="circle-progress-bar">
      <RadialBarChart
        width={CIRCLE_SIZE}
        height={CIRCLE_SIZE}
        cx={CIRCLE_SIZE / 2}
        cy={CIRCLE_SIZE / 2}
        innerRadius={INNER_RADIUS}
        outerRadius={OUTER_RADIUS}
        barSize={BAR_SIZE}
        data={[{ value }]}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, max]} angleAxisId={0} tick={false} />
        <RadialBar
          background={{ fill: "transparent" }}
          dataKey="value"
          cornerRadius={CIRCLE_SIZE / 2}
          fill={PROGRESS_FILL_COLOR}
        />
        <text
          x={CIRCLE_SIZE / 2}
          y={CIRCLE_SIZE / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="progress-label"
        >
          {convertMillisecondsToMinSecFormat(value)}
        </text>
      </RadialBarChart>
    </div>
  );
};
