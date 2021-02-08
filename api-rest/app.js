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

const basePath = "/api/v1/members"

let router = express.Router()

router.route("/:id")
.get((req, res) => {
  let index = getIndex(req.params.id)
  if (index >= 0) {
    res.send(success(members[index]))
  } else {
    res.json(error(index))
  }
})
.put((req, res) => {
  let index = getIndex(req.params.id)
  if (index >= 0) {
    if (!existMemberWithSameName(req.body.name, req.params.id)) {
      members[index].name = req.body.name
      res.json(success(members[index]))
    } else {
      res.json(error("Same name"))
    }
  } else {
    res.json(error(index))
  }
})
.delete((req, res) => {
  let index = getIndex(req.params.id)
  if (index >= 0) {
    members.splice(index, 1)
    res.json(success(members))
  } else {
    res.json(error(index))
  }
})

router.route("/")
.post((req, res) => {
  const name = req.body.name
  if (name && nameAlreadyUsed(name)) {
    res.json(error("Name already taken"))
  } else if (name) {
    let member = addMember(name)
    res.json(success(member))
  } else {
    res.json(error("No name value"))
  }
})
.get((req, res) => {
  if (req.query.max != undefined && req.query.max > 0) {
    res.json(success(members.slice(0, req.query.max)))
  } else if (req.query.max != undefined) {
    res.json(error("Wrong max value!"))
  } else {
    res.json(success(members))
  }
})


function addMember(name) {
  let member = {
    id: createID(),
    name: name,
  }
  members.push(member)
  return member
}

function nameAlreadyUsed(name) {
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
function existMemberWithSameName(name, id) {
  let same = false
  for (let i = 0; i < members.length && !same; i++) {
    if (members[i].name == name && members[i].id != id) {
      same = true
    }
  }
  return same
}

function createID() {
  return members[members.length -1].id + 1
}

app.use(basePath, router)

app.listen(8080, () => console.log("Started on port 8080"))
