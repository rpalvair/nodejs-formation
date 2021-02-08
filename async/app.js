require("babel-register")

const { getMemberWithCallBack, getArticles } = require("./callback")

console.log("Debut")

getMemberWithCallBack((member) => {
  console.log(member)
  getArticles(member, (articles) => {
    console.log(articles)
  })
})

console.log("Fin")
