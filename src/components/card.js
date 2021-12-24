import React, { useState, useEffect, useRef } from "react";
import ".././App.css";
import Table from "./Tabel";
import Loader from "react-loader-spinner";

export default function Card(props) {
  const wrapperRef = useRef(null);
  const [testValues, setTestValues] = useState({
    active: false,
    inactive: false,
    trial: false,
    subs: false,
  });

  const [data, SetData] = useState(props.data.customers);

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

  //update check state
  function handleCheckClick(e) {
    const { value, checked } = e.target;

    setTestValues((prev) => {
      return { ...prev, [value]: checked };
    });

    console.log(testValues);
  }

  //  remove filter values
  function removeFilterValue(e) {
    const { title } = e.target;
    setTestValues((prev) => {
      return { ...prev, [title]: false };
    });
  }
  //open the filter checkbox
  function handleClick() {
    setfilterState((prev) => !prev);
  }

  return (
    <div className="card">
      <img
        className="stats"
        style={{ width: "40px" }}
        src={require(".././images/stats.svg")}
      />
      <h1 className="stats">Stats</h1>

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
          <h1> {props.isLoaded ? props.data.signedC : "...Loading"} </h1>
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
          <h1> {props.isLoaded ? props.data.activeC : "...Loading"} </h1>
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
          <h1> {props.isLoaded ? props.data.inactiveC : "...Loading"} </h1>
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
          <span>
            {testValues.active ? (
              <span id="filter">
                {" "}
                active{" "}
                <img
                  title="active"
                  onClick={removeFilterValue}
                  className="close"
                  src={require(".././images/x.svg")}
                />{" "}
              </span>
            ) : null}
          </span>
          <span>
            {testValues.inactive ? (
              <span id="filter">
                {" "}
                inactive{" "}
                <img
                  title="inactive"
                  onClick={removeFilterValue}
                  className="close"
                  src={require(".././images/x.svg")}
                />{" "}
              </span>
            ) : null}{" "}
          </span>
          <span>
            {testValues.trial ? (
              <span id="filter">
                {" "}
                on trial{" "}
                <img
                  title="trial"
                  onClick={removeFilterValue}
                  id="trial"
                  className="close"
                  src={require(".././images/x.svg")}
                />{" "}
              </span>
            ) : null}{" "}
          </span>
          <span>
            {testValues.subs ? (
              <span id="filter">
                {" "}
                subeEnded{" "}
                <img
                  title="subs"
                  onClick={removeFilterValue}
                  className="close"
                  src={require(".././images/x.svg")}
                />{" "}
              </span>
            ) : null}{" "}
          </span>

          <div
            style={{ display: filterState ? "inherit" : "none" }}
            className="checkbox"
          >
            <div className="check">
              {testValues.active ? (
                <img
                  className="check-mark"
                  src={require(".././images/check.svg")}
                />
              ) : null}

              <label for="active"> active </label>
              <input
                onClick={handleCheckClick}
                type="checkbox"
                id="active"
                name="active"
                value="active"
                checked={testValues.active}
              />
            </div>
            <div className="check">
              {testValues.inactive ? (
                <img
                  className="check-mark"
                  src={require(".././images/check.svg")}
                />
              ) : null}
              <label for="inactive"> inactive </label>

              <input
                onClick={handleCheckClick}
                type="checkbox"
                id="inactive"
                name="inactive"
                value="inactive"
                checked={testValues.inactive}
              />
            </div>
            <div className="check">
              {testValues.trial ? (
                <img
                  className="check-mark"
                  src={require(".././images/check.svg")}
                />
              ) : null}
              <label for="ontrial"> on trial </label>
              <input
                onClick={handleCheckClick}
                type="checkbox"
                id="ontrial"
                name="ontrial"
                value="trial"
                checked={testValues.trial}
              />
            </div>

            <div className="check">
              {testValues.subs ? (
                <img
                  className="check-mark"
                  src={require(".././images/check.svg")}
                />
              ) : null}

              <label for="endedsubs"> ended subs </label>
              <input
                onClick={handleCheckClick}
                type="checkbox"
                id="endedsubs"
                name="endedsubs"
                value="subs"
                checked={testValues.subs}
              />
            </div>
          </div>
        </div>
      </div>
      {props.isLoaded ? (
        <Table isLoaded={props.isLoaded} value={testValues} data={data} />
      ) : (
        <div className="loader">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )}
    </div>
  );
}
