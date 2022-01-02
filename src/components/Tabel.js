import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import ".././App.css";
import Row from "./Row";

export default function Table(props) {
  const [data, setData] = useState(props.data);

  const [sortBy, setsortBy] = useState({ sortTitle: "", orderBy: undefined });

  function sortData(e) {
    const { title } = e.target;
    setsortBy((prev) => {
      if (prev.sortTitle != title) {
        return { sortTitle: title, orderBy: true };
      } else {
        return { sortTitle: title, orderBy: !prev.orderBy };
      }
    });
  }
  useEffect(() => {
    if (sortBy.sortTitle == "") return;
    props.onSortSelection({
      title: sortBy.sortTitle,
      orderBy: sortBy.orderBy ? "ASEN" : "DECS",
    });
  }, [sortBy]);

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
        {props.isLoaded ? (
          data.map(createRow)
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
