import React from "react";
import ".././App.css";
import Chart from "./ApecChart";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StatsCard = (props) => {
  return (
    <div className="stats">
      <div className="basic-card">
        <h2 style={{ color: "#b3b4b5", fontSize: "0.6em" }}>Active Users</h2>
        <h1 style={{ color: "black", fontSize: "1em" }}>{props.active}</h1>
        <h2></h2>
      </div>
      <div className="basic-card">
        <h2 style={{ color: "#b3b4b5", fontSize: "0.6em" }}>Signed Users</h2>
        <h1 style={{ color: "black", fontSize: "1em" }}>{props.inactive}</h1>
        <h2></h2>
      </div>
      <div className="basic-card">
        <h2 style={{ color: "#b3b4b5", fontSize: "0.6em" }}>Signed Users</h2>
        <h1 style={{ color: "black", fontSize: "1em" }}>{props.signed}</h1>
        <h2></h2>
      </div>
    </div>
  );
};
export default StatsCard;
