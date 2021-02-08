require("babel-register")

const { getMemberWithCallBack, getArticles } = require("./callback")
const { promiseDone, promiseError } = require("./promise")

console.log("Debut")

promiseDone()
  .then((value) => console.log(value))
  .catch((error) => console.error(error))

promiseError()
  .then((value) => console.log(value))
  .catch((error) => console.error(error))

console.log("Fin")
