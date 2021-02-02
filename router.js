const router = require('express').Router()

const indexController = require('./controllers/indexController')
const docxExportController = require('./controllers/docxExportController')
const excelImporterController = require('./controllers/excelImporterController')

router.post('/docx/program', docxExportController.program)
router.get('/docx/demo', docxExportController.demo)
//router.get('/course', exportController.course)
router.get('/excel/program', excelImporterController.program)
router.get('/', indexController.index)

module.exports = router
