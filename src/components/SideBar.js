import React from "react";
import ".././App.css";

export default function SideBar(props) {
  return (
    <div
      className="container-sidebar"
      style={
        {
          // height: `${props.height * 0.92}px`,
          // width: `${props.width * 0.2}px`,
        }
      }
    >
      <h1>Dashboard</h1>
      <div
        id="link"
        style={{
          backgroundColor:
            props.title == "Customer Insights" ? "#81BF94" : "transparent",
        }}
      >
        <h2
          onClick={() => {
            props.onClick("Customer Insights");
          }}
        >
          {" "}
          Customer insigths
        </h2>
      </div>

      <div
        id="link"
        style={{
          backgroundColor:
            props.title != "Customer Insights" ? "#81BF94" : "transparent",
        }}
      >
        <h2
          onClick={() => {
            props.onClick("Usage Insights");
          }}
        >
          {" "}
          Usage insigths
        </h2>
      </div>
    </div>
  );
}
