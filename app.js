const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
//const exporter = require('./exporter/docx_export')
const helmet = require('helmet')
const router = require('./router')

app.use(helmet())
app.use(express.json())

app.use(express.static(path.join(__dirname, '/files')))

app.use(
  express.urlencoded({
    extended: false,
  })
)

app.use("/", router);

module.exports = app
