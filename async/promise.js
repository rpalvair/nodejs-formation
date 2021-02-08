promiseDone = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done")
    }, 1500)
  })
}

promiseError = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("arf"))
    }, 1500)
  })
}

getMember = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Member 1")
      //   reject(new Error("arf"))
    }, 1500)
  })
}

getArticles = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3])
      //   reject(new Error("arf"))
    }, 1500)
  })
}

exports.promiseDone = promiseDone
exports.promiseError = promiseError
exports.getMemberWithPromise = getMember
exports.getArticlesWithPromise = getArticles
