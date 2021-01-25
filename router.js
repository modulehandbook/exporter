const router = require('express').Router()

const indexController = require('./controllers/indexController')
const docxExportController = require('./controllers/docxExportController')

router.post('/docx/program', docxExportController.program)
router.get('/docx/demo', docxExportController.demo)
//router.get('/course', exportController.course)
router.get('/', indexController.index)

module.exports = router
