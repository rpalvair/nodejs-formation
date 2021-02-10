require("babel-register")
const express = require("express")
const config = require("./config.json")
const morgan = require("morgan")
const Twig = require("twig")

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "twig")

app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html")
  res.render('index.twig', {
    message : "I'm a FullStack Developer"
  });
})

app.listen(config.port, () => console.log(`Started on port ${config.port}`))
