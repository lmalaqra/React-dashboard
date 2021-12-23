import React, { useState, useEffect, useRef } from "react";
import ".././App.css";
import Table from "./Tabel";
import filterData from "./filterData";

export default function Card(props) {
  const wrapperRef = useRef(null);

  let filters = "";
  const [data, SetData] = useState(props.data.customers);
  const filterValue = [];
  const [click, setClick] = useState([]);
  const [filterState, setfilterState] = useState(false);
  //close the filter when clicking outside
  window.addEventListener("click", (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      if (filterState == true) {
        setfilterState(false);
      }
    }
  });
  //update the name of filter
  useEffect(() => {
    if (click.length == 0) {
      filters = "none";
      document.getElementById("filter").innerText = filters;
    }
    click.forEach((element) => {
      filters = filters + " " + element;
      document.getElementById("filter").innerText = filters;
      console.log(filters.split(" "));
    });
  });

  //update state
  function handleCheckClick(e) {
    const { value } = e.target;
    if (click.length === 0) {
      click.push(value);
      document.getElementById("filter").innerText = value;
    } else {
      if (click.includes(value)) {
        setClick((prev) => {
          return prev.filter((element) => element != value);
        });
      } else {
        setClick((prev) => [...prev, value]);
      }
    }
  }
  //open the filter checkbox
  function handleClick() {
    setfilterState((prev) => !prev);
  }

  return (
    <div className="card">
      <div className="card-main">
        <div style={{ backgroundColor: "#F2E7AE" }} className="card-body">
          <h2>
            <img
              style={{
                color: "block",
                width: "25px",
                marginRight: "15px",
              }}
              src={require(".././images/people.svg")}
            />{" "}
            Total number of signed- In
          </h2>
          <h1> {props.data.signedC} </h1>
        </div>
        <div
          style={{ backgroundColor: "rgb(14, 202, 70)" }}
          className="card-body"
        >
          <h2>
            <img
              style={{
                color: "black",
                width: "25px",
                marginRight: "15px",
              }}
              src={require(".././images/people.svg")}
            />{" "}
            Total number of Active Users
          </h2>
          <h1> {props.data.activeC} </h1>
        </div>

        <div style={{ backgroundColor: "#F2F2F2" }} className="card-body">
          <h2>
            <img
              style={{
                color: "block",
                width: "25px",
                marginRight: "15px",
              }}
              src={require(".././images/people.svg")}
            />{" "}
            Total number of inactive users
          </h2>
          <h1> {props.data.inactiveC} </h1>
        </div>
      </div>
      <div className="table-head">
        <h2> all the customers</h2>

        {/* filter */}
        <div ref={wrapperRef} className="filter">
          <span> filter </span>
          <img
            className="dropdown"
            onClick={handleClick}
            style={{ width: "10px", height: "10px" }}
            src={require(".././images/dropdown.png")}
          />
          <span id="filter">{click.length == 0 ? "none" : `${filters}`} </span>

          <div
            style={{ display: filterState ? "inherit" : "none" }}
            className="checkbox"
          >
            <div className="check">
              <label for="active"> active </label>
              <input
                onClick={handleCheckClick}
                type="checkbox"
                id="active"
                name="active"
                value="Active"
              />
            </div>
            <div className="check">
              <label for="inA"> inactive </label>

              <input
                onClick={handleCheckClick}
                type="checkbox"
                id="inactive"
                name="inactive"
                value="inActive"
              />
            </div>
            <div className="check">
              <label for="ontrial"> on trial </label>
              <input
                onClick={handleCheckClick}
                type="checkbox"
                id="ontrial"
                name="ontrial"
                value="onTrial"
              />
            </div>
            <div className="check">
              <label for="endedsubs"> ended subs </label>
              <input
                onClick={handleCheckClick}
                type="checkbox"
                id="endedsubs"
                name="endedsubs"
                value="EndedSubs"
              />
            </div>
          </div>
        </div>
      </div>
      <Table data={data} />
    </div>
  );
}
