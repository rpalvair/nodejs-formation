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

exports.promiseDone = promiseDone
exports.promiseError = promiseError
