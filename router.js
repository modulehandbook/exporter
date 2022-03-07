const router = require('express').Router()

const indexController = require('./controllers/indexController')
const docxExportController = require('./controllers/docxExportController')

router.post('/docx/program', docxExportController.program)
router.post('/docx/course', docxExportController.course)
router.get('/docx/demo_course', docxExportController.demo_course)
router.get('/docx/demo_program', docxExportController.demo_program)
//router.get('/course', exportController.course)
router.get('/', indexController.index)

module.exports = router
