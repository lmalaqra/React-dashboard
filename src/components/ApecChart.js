import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Chart = (props) => {
  const value = props.value;
  return (
    <div style={{ width: props.width, height: props.height }}>
      {" "}
      <CircularProgressbar
        styles={{ path: { stroke: "#07C4F9" } }}
        value={value}
        maxValue={1}
        text={`${value * 100}%`}
      />
    </div>
  );
};
export default Chart;
