const { getMemberWithPromise, getArticlesWithPromise } = require("./promise")

exports.runWithPromiseAll = () => {
  console.log("runWithPromiseAll")
  Promise.all([
    getMemberWithPromise(),
    getArticlesWithPromise(),
  ]).then((value) => console.log("runWithPromiseAll", value))
}
