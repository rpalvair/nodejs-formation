require("babel-register")
const express = require("express")
const config = require("./config.json")
const morgan = require("morgan")
const axios = require("axios")

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const fetch = axios.create({
  baseURL: config.members.url,
})

let router = express.Router()

router.route("/").get((req, res) => {
  res.render("index.twig", {
    message: "I'm a FullStack Developer",
  })
})

router.route("/members").get((req, res) => {
  apiCall("/members", res, (value) => {
    res.render("members.twig", {
      members: value,
    })
  })
})

router.route("/members/:id").get((req, res) => {
  apiCall("/members/" + req.params.id, res, (value) => {
    res.render("member.twig", {
      member: value,
    })
  })
})

app.use(config.basePath, router)

app.listen(config.port, () => console.log(`Started on port ${config.port}`))

function renderError(res, message) {
  res.render("error.twig", {
    errorMessage: message,
  })
}

function apiCall(url, res, successCallback) {
  fetch
    .get(url)
    .then((response) => {
      if (response.data.status == "success") {
        successCallback(response.data.result)
      } else {
        renderError(res, response.data.message)
      }
    })
    .catch((err) => {
      renderError(res, err.message)
    })
}
