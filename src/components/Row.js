import React from "react";
import ".././App.css";

export default function Row(props) {
  return (
    <div className="row">
      <h2>{props.email}</h2>
      <h2>{props.address}</h2>
      <h2>{props.members}</h2>
      <h2>{props.sites}</h2>
      <h2>{props.sessionCount}</h2>
      <h2>{props.registerDate} </h2>
      <h2>{props.activeTime}</h2>
      <h2>{props.activePlan}</h2>
      <h2
        style={{ backgroundColor: props.isActive ? "green" : "grey" }}
        className="active"
      ></h2>
    </div>
  );
}
