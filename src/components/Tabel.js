import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import ".././App.css";
import Row from "./Row";

export default function Table(props) {
  const finalRow = filterData(props.value, props.data);

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
      return customerData.map(createRow);
    }
  }
  useEffect(() => {
    const finalRow = filterData(props.value, props.data);
  });

  function createRow(customerData) {
    return (
      <Row
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
        <div className="row">
          <h2>Email</h2>
          <h2>Adress</h2>
          <h2>Number Of Team Members</h2>
          <h2>Number Of Sites</h2>
          <h2>Sessions Count</h2>
          <h2>Registration Date </h2>
          <h2>Ative time/week</h2>
          <h2>Active Plan</h2>
          <h2 style={{ visibility: "hidden" }} className="active"></h2>
        </div>
        {finalRow}
      </div>
    </div>
  );
}
