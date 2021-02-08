require("babel-register")

const { getMemberWithCallBack } = require("./callback")

console.log("Debut")

getMemberWithCallBack((member) => {
  console.log(member)
})

console.log("Fin")
