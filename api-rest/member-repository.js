const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
})

let isConnected = false

findMembers = (limit) => {
  if (isConnected) {
    return executeFindMembers(limit)
  } else {
    this.waitConnection().then(() => {
      return executeFindMembers(limit)
    })
  }
}

getMemberById = (id) => {
  if (isConnected) {
    return executeGetById(id)
  } else {
    this.waitConnection().then(() => {
      return executeGetById(id)
    })
  }
}

waitConnection = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("error connecting: " + err.stack)
        reject(new Error(err.sqlMessage))
      } else {
        console.log("connected as id " + connection.threadId)
        isConnected = true
        resolve(true)
      }
    })
  })
}

function executeFindMembers(limit) {
  const query = findMembersQuery(limit)
  console.log("query = ", query)
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) reject(error)
      console.log(results)
      resolve(results)
    })
  })
}

function findMembersQuery(limit) {
  if (limit) {
    return "SELECT * FROM members LIMIT " + limit
  } else {
    return "SELECT * FROM members"
  }
}

function executeGetById(id) {
  const query = "SELECT * FROM members WHERE id = ?"
  console.log("query = ", query)
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (error, results, fields) => {
      if (error) reject(error)
      console.log(results)
      resolve(results)
    })
  })
}
exports.findMembers = findMembers
exports.waitConnection = waitConnection
exports.getMemberById = getMemberById