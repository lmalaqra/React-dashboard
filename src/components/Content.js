import React, { useState, useEffect } from "react";
import ".././App.css";
import SideBar from "./SideBar";
import Card from "./card";
import Usage from "./Usage";
export default function Content(props) {
  const [title, setTitle] = useState("Customer Insights");
  function handleClick(title) {
    setTitle(title);
  }

  return (
    <div>
      <div className="container">
        <SideBar
          onClick={handleClick}
          height={props.height}
          width={props.width}
          title={title}
        />
        <div className="content">
          <div className="title">
            <h1>{title}</h1>
          </div>
          {title == "Customer Insights" ? (
            <Card data={props.data} />
          ) : (
            <Usage />
          )}
        </div>
      </div>
    </div>
  );
}
