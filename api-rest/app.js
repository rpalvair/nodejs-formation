require("babel-register")
const { success, error } = require("./functions")
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
  let index = getIndex(req.params.id)
  if (index >= 0) {
    res.send(success(members[index]))
  } else {
    res.json(error(index))
  }
})

app.get("/api/v1/members", (req, res) => {
  if (req.query.max != undefined && req.query.max > 0) {
    res.json(success(members.slice(0, req.query.max)))
  } else if (req.query.max != undefined) {
    res.json(error("Wrong max value!"))
  } else {
    res.json(success(members))
  }
})

app.post("/api/v1/members", (req, res) => {
  const name = req.body.name
  if (name && alreadyExist(name)) {
    res.json(error("Name already taken"))
  } else if (name) {
    let member = addMember(name)
    res.json(success(member))
  } else {
    res.json(error("No name value"))
  }
})

function addMember(name) {
  let member = {
    id: members.length + 1,
    name: name,
  }
  members.push(member)
  return member
}

function alreadyExist(name) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].name === name) return true
  }
  return false
}

function getIndex(id) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id) return i
  }
  return "Wrong id"
}

app.listen(8080, () => console.log("Started on port 8080"))
