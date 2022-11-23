const router = require('express').Router()

const indexController = require('./controllers/indexController')
const docxExportController = require('./controllers/docxExportController')
// /^\/commits\/(\w+)(?:\.\.(\w+))?$/
//router.post(/^\/docx\/(\w+)$/, docxExportController.convert2docx)
router.post(/^\/docx\/(program|course)$/, docxExportController.convert2docx)

router.get('/docx/demo_course', docxExportController.demo_course)
router.get('/docx/demo_program', docxExportController.demo_program)
//router.get('/course', exportController.course)
router.get('/', indexController.index)

module.exports = router
