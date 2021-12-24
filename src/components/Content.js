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
  const [selectValue, setSelectValue] = useState("all");

  const url = "http://localhost:7000/customers/" + selectValue;

  const [data, updateData] = useState({
    isLoaded: props.isLoaded,
    customerData: props.data,
  });
  useEffect(() => {
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
  }, [selectValue]);

  function handleClick(title) {
    setTitle(title);
  }
  function onSelect(e) {
    updateData({ isLoaded: false });
    setSelectValue(e.value);
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
          <div className="title">
            <h1>{title}</h1>
            <div className="select">
              {" "}
              <h2>Select time intervel</h2>
              <Dropdown
                options={options}
                onChange={onSelect}
                defaultOption={selectValue}
                placeholder="Select time intervel"
                value={selectValue}
              />
            </div>
          </div>
          {title == "Customer Insights" && data.isLoaded ? (
            <Card isLoaded={data.isLoaded} data={data.customerData} />
          ) : data.isLoaded ? (
            <Usage />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
