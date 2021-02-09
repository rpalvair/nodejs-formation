require("babel-register")
const { success, error } = require("./functions")
const express = require("express")
const morgan = require("morgan")
const app = express()
const config = require("./config.json")
const {
  findAllMembers,
  getMemberById,
  getMemberByName,
  insertMember,
} = require("./member-repository")

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

const basePath = config.rootAPI + "members"

let router = express.Router()

router
  .route("/:id")
  .get((req, res) => {
    if (req.params.id > 0) {
      getMemberById(req.params.id)
        .then((value) => {
          if (value.length > 0) {
            res.send(success(value))
          } else {
            res.send(error("Wrong id"))
          }
        })
        .catch((err) => {
          res.json(error(err.message))
        })
    } else {
      res.json(error("Wrong id"))
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

router
  .route("/")
  .post((req, res) => {
    const name = req.body.name
    if (name) {
      ;(async () => {
        try {
          let member = await insertNewMember(name)
          res.json(success(member))
        } catch (err) {
          res.json(error(err.message))
        }
      })()
    } else {
      res.json(error("No name value"))
    }
  })
  .get((req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
      findMembers(res, req.query.max)
    } else if (req.query.max != undefined) {
      res.json(error("Wrong max value!"))
    } else {
      findMembers(res)
    }
  })

async function insertNewMember(name) {
  let nameAlreadyUsed = await isNameAlreadyUsed(name)
  if (nameAlreadyUsed) {
    throw new Error("Name already taken")
  } else {
    console.log("Add member")
    await insertMember(name)
    return await getMemberByName(name)
  }
}

async function isNameAlreadyUsed(name) {
  let members = await getMemberByName(name)
  return members.length > 0
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

function findMembers(res, limit) {
  let methodToCall
  if (limit) {
    methodToCall = findAllMembers(limit)
  } else {
    methodToCall = findAllMembers()
  }
  methodToCall
    .then((value) => {
      console.log("members", value)
      res.json(success(value))
    })
    .catch((err) => {
      res.json(error(err.message))
    })
}

app.use(basePath, router)

app.listen(config.port, () => console.log(`Started on port ${config.port}`))
