import React, { useState, useEffect, useRef } from "react";
import Loader from "react-loader-spinner";
import Chart from "./ApecChart";
export default function Usage(props) {
  const [data, setdata] = useState({ isLoaded: false });
  const isMounted = useRef(true);

  useEffect(() => {
    if (!isMounted.current) return;
    fetch("http://localhost:7000/usage")
      .then(async (response) => {
        const fetchedData = await response.json();

        setdata({ isLoaded: true, usageData: fetchedData });
        console.log(data);
      })
      .catch((error) => {
        setdata({ isLoaded: false, errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <div>
      {data.isLoaded ? (
        <div
          style={{
            marginTop: "30vh",
            textAlign: "center",
            padding: "0 0 30vh 0",
          }}
          className="stats"
        >
          <div className="basic-card">
            <h2 style={{ color: "#b3b4b5", fontSize: "0.6em" }}>
              Total Sessions
            </h2>
            <h1 style={{ color: "black", fontSize: "1em" }}>
              {data.usageData.totalSessions}
            </h1>
            <h2></h2>
          </div>
          <div className="basic-card">
            <h2 style={{ color: "#b3b4b5", fontSize: "0.6em" }}>
              % usage Per Plan
            </h2>
            <div style={{ width: "50%", margin: "0 0 0 35% " }}>
              <Chart width="50%" value={data.usageData.sessionsPercentage} />
            </div>
          </div>
        </div>
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
