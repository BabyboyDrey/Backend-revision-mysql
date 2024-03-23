const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const dbservice = require('./dbservice')
const app = express()

if (process.env.NODE_ENV !== 'Production') {
  dotenv.config()
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
app.use(express.json())

app.get('/insert', (req, res) => {
  const { name } = req.body
  const db = dbservice.getDbServiceIntance()

  const result = db.insertNewName(name)
  result.then(data => res.json({ data: data })).catch(err => console.log(err))
})

app.get('/getAll', (req, res) => {
  const db = dbservice.getDbServiceIntance()

  const result = db.getAllData()

  result.then(data => res.json({ data: data })).catch(err => console.log(err))
})

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params
  const db = dbservice.getDbServiceIntance()

  const result = db.deleteRowById(id)

  result
    .then(data => res.json({ success: data }))
    .catch(err => console.log(err))
})

app.put('/update', (req, res) => {
  const { id, name } = req.body
  const db = dbservice.getDbServiceIntance()

  const result = db.updateNameById(id, name)
  result.then(data => res.json({ data: data })).catch(err => console.log(err))
})

app.get('/search/:name', (req, res) => {
  const { name } = req.params
  const db = dbservice.getDbServiceIntance()

  const result = db.searchByName(name)

  result.then(data => res.json({ data: data })).catch(err => console.log(err))
})

app.listen(5000, () => {
  console.log('Server is live on port 5000')
})
