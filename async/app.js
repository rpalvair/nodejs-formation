require("babel-register")

const { getMemberCallBack } = require("./callback")

console.log("Debut")

let member = getMemberCallBack((member) => {
  console.log("member", member)
})
console.log("Fin")
