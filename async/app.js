require("babel-register")

const { runWithAsync } = require("./run-with-async-wait")
const { runWithPromiseAll } = require("./run-with-promise-all")
const { runWithPromiseRace } = require("./run-with-promise-race")
const { runWithPromise } = require("./run-with-promise")

console.log("Debut")
runWithAsync()
runWithPromiseAll()
runWithPromiseRace()
runWithPromise()

console.log("Fin")
