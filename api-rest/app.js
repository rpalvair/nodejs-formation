require("babel-register")
const { success, error } = require("./functions")
const express = require("express")
const morgan = require("morgan")
const expressOasGenerator = require("express-oas-generator")
const config = require("./config.json")
const {
  findAllMembers,
  getMemberById,
  getMemberByName,
  insertMember,
  updateMember,
  deleteOne,
} = require("./member-repository")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

const app = express()
expressOasGenerator.init(app, {})
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  config.rootAPI + "api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)

const basePath = config.rootAPI + "members"

let router = express.Router()

router
  .route("/:id")
  .get((req, res) => {
    if (req.params.id > 0) {
      getMemberById(req.params.id)
        .then((value) => {
          if (value.length > 0) {
            res.send(success(value[0]))
          } else {
            res.send(error(config.errors.wrongID))
          }
        })
        .catch((err) => {
          res.json(error(err.message))
        })
    } else {
      res.json(error(config.errors.wrongID))
    }
  })
  .put((req, res) => {
    if (req.body.name) {
      let id = req.params.id
      update(req.body.name, id)
        .then((value) => {
          res.json(success(value))
        })
        .catch((err) => res.json(error(err.message)))
    }
  })
  .delete((req, res) => {
    if (req.params.id > 0) {
      deleteMember(req.params.id)
        .then((value) => res.json(success(value)))
        .catch((err) => res.json(error(err.message)))
    } else {
      res.json(error(config.errors.wrongID))
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
      res.json(error(config.errors.noNameValue))
    }
  })
  .get((req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
      findMembers(res, req.query.max)
    } else if (req.query.max != undefined) {
      res.json(error(config.errors.wrongMaxValue))
    } else {
      findMembers(res)
    }
  })

async function insertNewMember(name) {
  let nameAlreadyUsed = await isNameAlreadyUsed(name)
  if (nameAlreadyUsed) {
    throw new Error(config.errors.nameAlreadyTaken)
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

async function update(name, id) {
  let existingMember = await getMemberByName(name)
  if (
    existingMember.length > 1 ||
    (existingMember.length == 1 && existingMember[0].id != id)
  ) {
    throw new Error(config.errors.nameAlreadyTaken)
  }
  let member = await getMemberById(id)
  if (member.length == 1) {
    await updateMember(name, id)
    return await getMemberById(id)
  } else {
    throw new Error(config.errors.noMemberID)
  }
}

async function deleteMember(id) {
  let member = await getMemberById(id)
  if (member.length == 1) {
    await deleteOne(id)
    return await findAllMembers()
  } else {
    throw new Error(config.errors.noMemberID)
  }
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
