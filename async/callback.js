getMember = (callback) => {
  setTimeout(() => {
    callback("Member 1")
  }, 3000)
}

exports.getMemberWithCallBack = getMember
