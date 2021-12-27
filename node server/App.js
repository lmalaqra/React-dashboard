//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(cors());

const data = {
  signedC: 11025,
  activeC: 5025,
  inactiveC: 6000,
  totalSessions: 4000,
  sessionPercentage: 0.3,
  customers: [
    {
      email: "laith@gmail.com",
      adress: "cairo",
      membersCount: 15,
      sitesCount: 5,
      sessionsCount: 120,
      registerDate: "25/8/99",
      activeTime: 25,
      activePlan: "build something",
      isActive: true,
      subEnded: false,
      onTrial: true,
    },
    {
      email: "la@gmail.com",
      adress: "cairo",
      membersCount: 15,
      sitesCount: 5,
      sessionsCount: 120,
      registerDate: "25/8/99",
      activeTime: 25,
      activePlan: "build something",
      isActive: false,
      subEnded: true,
      onTrial: false,
    },
  ],
};

const myData = {
  signedC: 15,
  activeC: 25,
  inactiveC: 10,

  customers: [
    {
      email: "laith@gmail.com",
      adress: "cairo",
      membersCount: 15,
      sitesCount: 5,
      sessionsCount: 120,
      registerDate: "25/8/99",
      activeTime: 25,
      activePlan: "build something",
      isActive: true,
      subEnded: false,
      onTrial: true,
    },
    {
      email: "la@gmail.com",
      adress: "cairo",
      membersCount: 15,
      sitesCount: 5,
      sessionsCount: 120,
      registerDate: "25/8/99",
      activeTime: 25,
      activePlan: "build something",
      isActive: false,
      subEnded: true,
      onTrial: false,
    },
  ],
};
for (let i = 0; i < 10; i++) {
  const testData = (myCustomer = {
    email: "la@gmail.com",
    address: "cairo",
    membersCount: 15,
    sitesCount: 5,
    sessionsCount: 120,
    registerDate: "25/8/99",
    activeTime: 25,
    activePlan: "build something",
    isActive: false,
    subEnded: false,
    onTrial: false,
  });

  myCustomer.activeTime = +i;
  myCustomer.sessionsCount = -i * 2;

  myData.customers.push(testData);
}

app.get("/customers", (req, res) => {
  console.log(req.body);
  for (let i = 2; i < 100; i++) {
    let myCustomer = {
      email: "la@gmail.com",
      address: "cairo",
      membersCount: 15,
      sitesCount: 5,
      sessionsCount: 120,
      registerDate: "25/8/99",
      activeTime: 25,
      activePlan: "build something",
      isActive: false,
      subEnded: true,
      onTrial: false,
    };
    if (i % 2 == 0) {
      myCustomer.isActive = true;
      myCustomer.subEnded = false;
      myCustomer.onTrial = true;
      myCustomer.activeTime = +i;
    } else {
      myCustomer.isActive = false;
      myCustomer.subEnded = true;
      myCustomer.onTrial = false;
    }

    data.customers.push(myCustomer);
  }

  res.json(data);
});

app.get("/customers/:time", (req, res) => {
  console.log(req.params);

  res.json(myData);
});
app.get("/usage", (req, res) => {
  res.json({ totalSessions: 4000, sessionsPercentage: 0.5 });
});

app.listen(7000, () => {
  console.log("app is running on 7000");
});
