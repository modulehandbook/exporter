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

app.use(bodyParser.json({
  limit: '50mb'
}))

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}))

app.use("/", router);

module.exports = app
