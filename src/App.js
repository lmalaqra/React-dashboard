import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import useWindowDimensions from "./components/getWindoDimentions";
import Content from "./components/Content";
import Loader from "react-loader-spinner";

// function delayed_render(async_fun, deps = []) {
//   const [output, setOutput] = useState();
//   useEffect(async () => setOutput(await async_fun()), deps);
//   return output === undefined ? null : output;
// }

export default function App(props) {
  const [data, updateData] = useState({ isLoaded: false });
  useEffect(() => {
    fetch("http://localhost:7000/customers")
      .then(async (response) => {
        const fetchedData = await response.json();

        updateData({ isLoaded: true, customerData: fetchedData });
        console.log(fetchedData);
      })
      .catch((error) => {
        updateData({ isLoaded: false, errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className="god-container">
      {data.isLoaded ? (
        <Content isLoaded={data.isLoaded} data={data.customerData} />
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
