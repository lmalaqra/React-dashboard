import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import useWindowDimensions from "./components/getWindoDimentions";
import Content from "./components/Content";

function delayed_render(async_fun, deps = []) {
  const [output, setOutput] = useState();
  useEffect(async () => setOutput(await async_fun()), deps);
  return output === undefined ? null : output;
}

function App(props) {
  const [data, updateData] = useState();

  return delayed_render(async () => {
    const resp = await fetch("http://localhost:7000/customers"); // await here is OK!
    const json = await resp.json();
    updateData(json);

    return (
      <div>
        <Header /> <Content data={json} />
      </div>
    );
  });
}

// const App = () => {
//   useEffect(() => {
//     const getData = async () => {
//       const resp = await fetch("http://localhost:7000/customers");
//       const json = await resp.json();
//       updateData(json);
//     };
//     getData();
//   }, []);

//   return data && <Content data={data} />;
// };

// useEffect(() => {
//   fetch()
//     .then((res) => res.json())
//     .then((result) => {
//       await setData(JSON.parse(result));
//       console.log(data);
//     });
// }, 1);

// const [click, setclick] = useState(false);

// function getState(State) {
//   return !State;
// }

// return (
//   <div>
//     <Header width={width} />
//     <Content data={data} width={width} height={height} />
//   </div>
// );

export default App;
