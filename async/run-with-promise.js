const { getMemberWithPromise, getArticlesWithPromise } = require("./promise")

exports.runWithPromise = () => {
  console.log("runWithPromise")
  getMemberWithPromise()
    .then((value) => {
      console.log("runWithPromise", value)
      return getArticlesWithPromise()
    })
    .then((value) => console.log("runWithPromise", value))
    .catch((error) => console.error("runWithPromise", error))
}
