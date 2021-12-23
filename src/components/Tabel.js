import React, { useState, useEffect } from "react";
import ".././App.css";
import Row from "./Row";

export default function Table(props) {
  const customerData = props.data;
  const finalRow = customerData.map(createRow);

  useEffect(() => {
    const finalRow = customerData.map(createRow);
  }, [customerData]);

  function createRow(customerData) {
    return (
      <Row
        email={customerData.email}
        address={customerData.address}
        members={customerData.membersCount}
        sites={customerData.sitesCount}
        sessionCount={customerData.sessionCount}
        registerDate={customerData.registerDate}
        activeTime={customerData.activeTime}
        isActive={customerData.isActive}
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
