const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
})

connection.connect(err => {
  if (err) return console.log(err.message)

  console.log('db' + connection.state)
})

class DbService {
  static getDbServiceIntance () {
    return instance ? instance : new DbService()
  }

  async getAllData () {
    try {
      const res = await new Promise((resolve, reject) => {
        const query = 'select * from names;'

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message))
          resolve(results)
        })
      })
      console.log(res)
      return res
    } catch (err) {
      console.log(err)
    }
  }

  async insertNewName (name) {
    try {
      const dateAdded = new Date()
      const insertId = await new Promise((resolve, reject) => {
        const query = 'insert into names (name, date_added) values (?,?);'

        connection.query(query, [name, dateAdded], (err, result) => {
          if (err) reject(new Error(err.message))
          resolve(result.insertId)
        })
      })
      return {
        id: insertId,
        name: name,
        dateAdded: dateAdded
      }
    } catch (err) {
      console.log(err)
    }
  }

  async deleteRowById (id) {
    try {
      id = parseInt(id, 10)
      const res = await new Promise((resolve, reject) => {
        const query = 'delete from names where id = ?'

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message))
          resolve(result)
        })
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  async updateNameById (id, name) {
    try {
      id = parseInt(id, 10)
      const res = await new Promise((resolve, reject) => {
        const query = 'update names set name = ? where id = ?'

        connection.query(query, [name, id], (err, result) => {
          if (err) reject(new Error(err.message))
          resolve(result)
        })
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  async searchByName (name) {
    try {
      const res = await new Promise((resolve, reject) => {
        const query = 'select * from names where name = ?;'

        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message))
          resolve(results)
        })
      })
      console.log(res)
      return res
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = DbService
