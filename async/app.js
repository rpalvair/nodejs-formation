require("babel-register")

const { getMemberWithPromise, getArticlesWithPromise } = require("./promise")

console.log("Debut")

getMemberWithPromise()
  .then((value) => {
    console.log(value)
    return getArticlesWithPromise()
  })
  .then((value) => console.log(value))
  .catch((error) => console.error(error))

console.log("Fin")
