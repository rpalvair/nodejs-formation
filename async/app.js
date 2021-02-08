require("babel-register")

const { getMemberWithPromise, getArticlesWithPromise } = require("./promise")

console.log("Debut")

Promise.all([getMemberWithPromise(), getArticlesWithPromise()]).then((value) =>
  console.log(value)
)

Promise.race([getMemberWithPromise(), getArticlesWithPromise()]).then((value) =>
  console.log(value)
)

// getMemberWithPromise()
//   .then((value) => {
//     console.log(value)
//     return getArticlesWithPromise()
//   })
//   .then((value) => console.log(value))
//   .catch((error) => console.error(error))

console.log("Fin")
