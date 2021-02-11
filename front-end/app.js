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
  res.redirect("/front/members")
})

router
  .route("/members")
  .get((req, res) => {
    apiCall(getMembersUrl(req), "get", {}, res, (value) => {
      res.render("members.twig", {
        members: value.sort((a,b) => a.id - b.id),
      })
    })
  })
  .post((req, res) => {
    apiCall(
      getMembersUrl(req),
      "post",
      { name: req.body.name },
      res,
      (value) => {
        res.render("member.twig", {
          members: value[0],
        })
      }
    )
  })

router.route("/members/:id").get((req, res) => {
  apiCall("/members/" + req.params.id, "get", {}, res, (value) => {
    res.render("member.twig", {
      member: value,
    })
  })
})

router
  .route("/edit/:id")
  .get((req, res) => {
    apiCall("/members/" + req.params.id, "get", {}, res, (value) => {
      res.render("edit.twig", {
        member: value,
      })
    })
  })
  .post((req, res) => {
    apiCall(
      "/members/" + req.params.id,
      "put",
      { name: req.body.name },
      res,
      (value) => {
        res.redirect("/front/members")
      }
    )
  })

router.route("/delete").post((req, res) => {
  apiCall("/members/" + req.body.id, "delete", {}, res, (value) => {
    res.redirect("/front/members")
  })
})

router
  .route("/create")
  .get((req, res) => {
    res.render("create.twig", {})
  })
  .post((req, res) => {
    apiCall("/members", "post", { name: req.body.name }, res, (value) => {
      res.render("member.twig", {
        member: value[0],
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

function apiCall(url, method, data, res, successCallback) {
  fetch({
    method: method,
    url: url,
    data: data,
  })
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

function getMembersUrl(req) {
  return req.query.max ? "/members?max=" + req.query.max : "/members"
}
