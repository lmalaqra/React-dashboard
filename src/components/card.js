import React, { useState, useEffect, useRef } from "react";
import ".././App.css";
import Table from "./Tabel";
import Loader from "react-loader-spinner";
import StatsCard from "./StatsCard";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

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
  const options = [
    { value: "lastWeek", label: "Last Week" },
    { value: "lastMonth", label: "Last Month" },
    { value: "lastYear", label: "Last Year" },
    { value: "all", label: "All" },
  ];

  return (
    <div>
      <div className="card">
        <div className="discription">
          <div>
            <h1 className="stats"> Stats</h1>
          </div>
          <Dropdown
            options={options}
            onChange={(value) => {
              props.onSelect(value);
            }}
            placeholder="Select time intervel"
            value={props.value}
          />
        </div>
        <h2
          style={{
            fontSize: "0.8em",
            color: "#b3b4b5",
            marginBottom: "30px",
          }}
        >
          Welcome to userStats
        </h2>
        <div className="card-main">
          <StatsCard
            signed={props.data.signedC}
            active={props.data.activeC}
            inactive={props.data.inactiveC}
          />
        </div>
      </div>
      <div className="tabel-content">
        <div className="table-head">
          <h2 style={{ color: "#b3b4b5", fontSize: "1em" }}>
            {" "}
            Latest Customers & Activities
          </h2>

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

                <label htmlFor="active"> active </label>
                <input
                  onClick={handleCheckClick}
                  type="checkbox"
                  id="active"
                  name="active"
                  value="active"
                  defaultChecked={testValues.active}
                />
              </div>
              <div className="check">
                {testValues.inactive ? (
                  <img
                    className="check-mark"
                    src={require(".././images/check.svg")}
                  />
                ) : null}
                <label htmlFor="inactive"> inactive </label>

                <input
                  onClick={handleCheckClick}
                  type="checkbox"
                  id="inactive"
                  name="inactive"
                  value="inactive"
                  defaultChecked={testValues.inactive}
                />
              </div>
              <div className="check">
                {testValues.trial ? (
                  <img
                    className="check-mark"
                    src={require(".././images/check.svg")}
                  />
                ) : null}
                <label htmlFor="ontrial"> on trial </label>
                <input
                  onClick={handleCheckClick}
                  type="checkbox"
                  id="ontrial"
                  name="ontrial"
                  value="trial"
                  defaultChecked={testValues.trial}
                />
              </div>

              <div className="check">
                {testValues.subs ? (
                  <img
                    className="check-mark"
                    src={require(".././images/check.svg")}
                  />
                ) : null}

                <label htmlFor="endedsubs"> ended subs </label>
                <input
                  onClick={handleCheckClick}
                  type="checkbox"
                  id="endedsubs"
                  name="endedsubs"
                  value="subs"
                  defaultChecked={testValues.subs}
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
    </div>
  );
}
