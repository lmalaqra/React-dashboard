import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import ".././App.css";
import Row from "./Row";

export default function Table(props) {
  const [data, setData] = useState({
    isLoaded: props.isLoaded,
    myData: props.data,
  });
  const [count, setcount] = useState(0);

  const [title, settitle] = useState();

  function mapMyData() {}

  function filterData(values, data) {
    if (props.isLoaded) {
      let customerData = data;
      if (values.active == true) {
        customerData = customerData.filter((e) => e.isActive === true);
      }
      if (values.inactive) {
        customerData = customerData.filter((e) => e.isActive == false);
      }
      if (values.trial) {
        customerData = customerData.filter((e) => e.onTrial == true);
      }
      if (values.subs) {
        customerData = customerData.filter((e) => e.endedSubs == true);
      }
      return customerData;
    }
  }
  useEffect(() => {
    setData({ isLoaded: true, myData: filterData(props.value, data.myData) });
  }, [props.value]);

  useEffect(() => {
    const sortedData = data.myData.sort((a, b) =>
      a[title] > b[title] ? 1 : b[title] > a[title] ? -1 : 0
    );
    setData({ isLoaded: true, myData: filterData(props.value, sortedData) });

    console.log("this has been fired");
    console.log(title);
  }, [title]);
  function sortData(e) {
    const { title } = e.target;
    settitle(title);
    data.isLoaded = false;
    setcount(count + 1);
  }

  function createRow(customerData, index) {
    return (
      <Row
        key={index}
        email={customerData.email}
        address={customerData.address}
        members={customerData.membersCount}
        sites={customerData.sitesCount}
        sessionCount={customerData.sessionsCount}
        registerDate={customerData.registerDate}
        activeTime={customerData.activeTime}
        isActive={customerData.isActive}
        activePlan={customerData.activePlan}
      />
    );
  }

  return (
    <div className="table-container">
      <div className="table">
        <div className="row-head">
          <h2>
            Email{" "}
            <img
              title="email"
              className="sort"
              onClick={sortData}
              style={{ width: "15px" }}
              src={require(".././images/sort.svg")}
            />
          </h2>
          <h2>
            Address{" "}
            <img
              title="address"
              className="sort"
              onClick={sortData}
              style={{ width: "15px" }}
              src={require(".././images/sort.svg")}
            />
          </h2>
          <h2>
            Number Of Team Members{" "}
            <img
              title="membersCount"
              className="sort"
              onClick={sortData}
              style={{ width: "15px" }}
              src={require(".././images/sort.svg")}
            />
          </h2>
          <h2>
            Number Of Sites{" "}
            <img
              title="sitesCount"
              className="sort"
              onClick={sortData}
              style={{ width: "15px" }}
              src={require(".././images/sort.svg")}
            />
          </h2>
          <h2>
            Sessions Count{" "}
            <img
              title="sessionsCount"
              className="sort"
              onClick={sortData}
              style={{ width: "15px" }}
              src={require(".././images/sort.svg")}
            />{" "}
          </h2>
          <h2>
            Registration Date{" "}
            <img
              title="registerDate"
              className="sort"
              onClick={sortData}
              style={{ width: "15px" }}
              src={require(".././images/sort.svg")}
            />{" "}
          </h2>
          <h2>
            Ative time/week{" "}
            <img
              title="activeTime"
              className="sort"
              onClick={sortData}
              style={{ width: "15px" }}
              src={require(".././images/sort.svg")}
            />
          </h2>
          <h2>Active Plan</h2>
          <h2 style={{ visibility: "hidden" }} className="active"></h2>
        </div>
        {data.isLoaded ? (
          data.myData.map(createRow)
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
