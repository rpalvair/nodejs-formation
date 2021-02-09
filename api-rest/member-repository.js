const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
})

findAllMembers = (limit) => {
  return executeFindMembers(limit)
}

getMemberById = (id) => {
  return executeGetById(id)
}

getMemberByName = (name) => {
  return executeGetByName(name)
}

insertMember = (name) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO members(name) VALUES(?)",
      [name],
      (error, results, fields) => {
        if (error) reject(new Error(error.sqlMessage))
        console.log(results)
        resolve(results)
      }
    )
  })
}

updateMember = (name, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE members SET name = ? WHERE id = ?",
      [name, id],
      (error, results, fields) => {
        if (error) reject(new Error(error.sqlMessage))
        console.log(results)
        resolve(results)
      }
    )
  })
}

deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM members WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) reject(new Error(error.sqlMessage))
        console.log(results)
        resolve(results)
      }
    )
  })
}

function executeFindMembers(limit) {
  const query = findMembersQuery(limit)
  console.log("query = ", query)
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) reject(new Error(error.sqlMessage))
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
      if (error) reject(new Error(error.sqlMessage))
      console.log(results)
      resolve(results)
    })
  })
}

function executeGetByName(name) {
  const query = "SELECT * FROM members WHERE name = ?"
  console.log("query = ", query)
  return new Promise((resolve, reject) => {
    connection.query(query, [name], (error, results, fields) => {
      if (error) reject(new Error(error.sqlMessage))
      console.log(results)
      resolve(results)
    })
  })
}

exports.findAllMembers = findAllMembers
exports.getMemberById = getMemberById
exports.getMemberByName = getMemberByName
exports.insertMember = insertMember
exports.updateMember = updateMember
exports.deleteOne = deleteOne
