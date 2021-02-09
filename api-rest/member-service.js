const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
})

findMembers = () => {
  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack)
    } else {
      console.log("connected as id " + connection.threadId)
      connection.query("SELECT * FROM members", (error, results, fields) => {
        if (error) throw error
        console.log(results)
      })
    }
  })
}

waitConnection = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("error connecting: " + err.stack)
        reject(new Error(err.sqlMessage))
      } else {
        console.log("connected as id " + connection.threadId)
        resolve(true)
      }
    })
  })
}

exports.findMembers = findMembers
exports.waitConnection = waitConnection
