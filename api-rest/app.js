require("babel-register")
const func = require("./functions")
const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
]

app.get("/api/v1/members/:id", (req, res) => {
  res.send(func.success(members[req.params.id - 1]))
})

app.get("/api/v1/members", (req, res) => {
  if (req.query.max != undefined && req.query.max > 0) {
    res.json(func.success(members.slice(0, req.query.max)))
  } else if (req.query.max != undefined) {
    res.json(func.error("Wrong max value!"))
  } else {
    res.json(func.success(members))
  }
})

app.post("/api/v1/members", (req, res) => {
  res.send(req.body)
})

app.listen(8080, () => console.log("Started on port 8080"))
