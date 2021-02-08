getMember = (callback) => {
  setTimeout(() => {
    callback("Member 1")
  }, 1500)
}

getArticles = (member, callback) => {
  setTimeout(() => {
    callback([1, 2, 3])
  }, 1500)
}

exports.getMemberWithCallBack = getMember
exports.getArticles = getArticles
