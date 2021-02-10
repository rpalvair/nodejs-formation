require("babel-register")
const express = require("express")
const config = require("./config.json")
const morgan = require("morgan")
const axios = require("axios")

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let router = express.Router()

router.route("/").get((req, res) => {
  res.render("index.twig", {
    message: "I'm a FullStack Developer",
  })
})

router.route("/members").get((req, res) => {
  axios.get("http://localhost:8080/api/v1/member")
  .then((response) => {
    
  }).catch((err) => {
    renderError(res, err.message)
  })
})

app.use(config.basePath, router)

app.listen(config.port, () => console.log(`Started on port ${config.port}`))


function renderError(res, message) {
  res.render("error.twig", {
    errorMessage: message,
  })
}