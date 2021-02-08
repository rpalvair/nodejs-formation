require("babel-register");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

const members = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Julie",
  },
  {
    id: 3,
    name: "Jack",
  },
];

app.get("/api/v1/members/:id", (req, res) => {
  res.send(members[req.params.id - 1]);
});

app.get("/api/v1/members", (req, res) => {
  if (req.query.max != undefined && req.query.max > 0) {
    res.json(members.slice(0, req.query.max));
  } else {
    res.json(members);
  }
});

app.listen(8080, () => console.log("Started on port 8080"));
