const router = require('express').Router()
const express = require('express')

const indexController = require('./controllers/indexController')
const docxExportController = require('./controllers/docxExportController')
const path = require('path')

router.use(express.static(path.join(__dirname, '/files')))

router.use(
  express.urlencoded({
    extended: false,
  })
)

router.use(express.json())
router.post('/docx/program', docxExportController.program)
//router.get('/course', exportController.course)
router.get('/', indexController.index)

module.exports = router
