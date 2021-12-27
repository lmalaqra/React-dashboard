import React, { useState, useEffect } from "react";
import ".././App.css";
import SideBar from "./SideBar";
import Card from "./card";
import Usage from "./Usage";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Loader from "react-loader-spinner";

export default function Content(props) {
  const [title, setTitle] = useState("Customer Insights");
  const [selectValue, setSelectValue] = useState();
  const today = new Date();
  const date = today.toLocaleString("default", { month: "short" });
  const [mounted, setMounted] = useState(false);

  const dateTime = date + " " + today.getDate();

  const url =
    selectValue == "all"
      ? "http://localhost:7000/customers"
      : "http://localhost:7000/customers/" + selectValue;

  const [data, updateData] = useState({
    isLoaded: props.isLoaded,
    customerData: props.data,
  });
  useEffect(() => {
    if (mounted) {
      fetch(url)
        .then(async (response) => {
          const fetchedData = await response.json();

          updateData({ isLoaded: true, customerData: fetchedData });
          console.log(fetchedData);
        })
        .catch((error) => {
          updateData({ isLoaded: false, errorMessage: error.toString() });
          console.error("There was an error!", error);
        });
    }
  }, [selectValue]);

  function handleClick(title) {
    setTitle(title);
  }
  function onSelect(e) {
    updateData({ isLoaded: false });
    setSelectValue(e.value);
    setMounted(true);
  }
  const options = [
    { value: "lastWeek", label: "Last Week" },
    { value: "lastMonth", label: "Last Month" },
    { value: "lastYear", label: "Last Year" },
    { value: "all", label: "All" },
  ];
  const defaultOption = options[0];

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
          <div className="header">
            <div className="title">
              <h1 style={{ fontSize: "1em" }}>{title}</h1>
            </div>
            <div className="data">
              {" "}
              <h1 className="data">
                <img
                  style={{ width: "20px", marginRight: "5px" }}
                  src={require(".././images/calender.svg")}
                />{" "}
                <span style={{ fontSize: "0.5em" }}>Today </span>
                <span style={{ color: "black", fontSize: "0.6em" }}>
                  {dateTime}
                </span>
              </h1>
            </div>

            <div className="select"></div>
          </div>
          {title == "Customer Insights" && data.isLoaded ? (
            <Card
              value={selectValue}
              onSelect={onSelect}
              isLoaded={data.isLoaded}
              data={data.customerData}
            />
          ) : data.isLoaded ? (
            <Usage data={data} />
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
    </div>
  );
}
