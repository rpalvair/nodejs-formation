require("babel-register")
const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
})

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
