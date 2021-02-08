const { getMemberWithPromise, getArticlesWithPromise } = require("./promise")

exports.runWithPromiseRace = () => {
  console.log("runWithPromiseRace")
  Promise.race([getMemberWithPromise(), getArticlesWithPromise()])
    .then((value) => console.log("runWithPromiseRace", value))
    .catch((error) => console.error("runWithPromiseRace", error))
}
