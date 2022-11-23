const router = require('express').Router()

const indexController = require('./controllers/indexController')
const docxExportController = require('./controllers/docxExportController')


router.use(/^\/docx\/(program|course)/,docxExportController.extract_export_type)

router.use(/^\/docx\/(program|course)\/demo$/,docxExportController.add_demo_data)
router.get(/^\/docx\/(program|course)\/demo$/, docxExportController.convert2docx)

router.use(/^\/docx\/(program|course)$/,docxExportController.add_data)
router.post(/^\/docx\/(program|course)$/, docxExportController.convert2docx)


//router.get('/docx/demo_course', docxExportController.demo_course)
//router.get('/docx/demo_program', docxExportController.demo_program)
//router.get('/course', exportController.course)
router.get('/', indexController.index)

module.exports = router
