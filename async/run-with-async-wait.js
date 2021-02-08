const { getMemberWithPromise, getArticlesWithPromise } = require("./promise")

exports.runWithAsync = async () => {
  console.log("runWithAsync")
  let member = await getMemberWithPromise()
  console.log("runWithAsync", member)
  let articles = await getArticlesWithPromise()
  console.log("runWithAsync", articles)
}
