import React, { useState, useEffect, useRef } from "react";
import ".././App.css";
import Table from "./Tabel";
import Loader from "react-loader-spinner";
import StatsCard from "./StatsCard";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { fetchedData } from "./getWindoDimentions";

export default function Card(props) {
  let myObj = {
    numOfDays: String,
    filterBy: valueArray,
    sortBy: String,
  };
  const wrapperRef = useRef(null);
  const [valueArray, setvalueArray] = useState([]);
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

    setvalueArray((prev) => {
      if (prev.length == 0) {
        return [...prev, value];
      } else if (prev.includes(value)) {
        return prev.filter((e) => e != value);
      } else {
        return [...prev, value];
      }
    });
  }
  useEffect(() => {
    if (valueArray.length == 0) return;
    props.onFilterSelect(valueArray);
  }, [valueArray]);

  //  remove filter values
  function removeFilterValue(e) {
    const { title } = e.target;
    setvalueArray((prev) => prev.filter((e) => e != title));
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
            {valueArray
              ? valueArray.map((e, index) => {
                  return (
                    <span key={index} id="filter">
                      {" "}
                      {e}{" "}
                      <img
                        title={e}
                        onClick={removeFilterValue}
                        className="close"
                        src={require(".././images/x.svg")}
                      />{" "}
                    </span>
                  );
                })
              : null}

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
          <Table
            onSortSelection={(sortData) => {
              props.collectSortingInformation(sortData);
            }}
            isLoaded={props.isLoaded}
            data={data}
          />
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
