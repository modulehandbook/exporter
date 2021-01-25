'use strict'
const DocxExporter = require('../docx_exporter/docx_export')
const ExportHelper = require('../helper/export_helper')
const docxExporter = new DocxExporter()
const exportHelper = new ExportHelper()
const program = require('../test/data/program')

module.exports = {
  program: (req, res) => {
    const program_data = req.body
    const filename = exportHelper.assembleFilename(program_data)
    docxExporter.exportProgram(filename, program_data, () => {
      res.download(filename, function(err){
        if (err) {
          throw err
        }
      })
    })
  },
  demo: (req, res) => {
    const program_data = program
    const filename = exportHelper.assembleFilename(program_data)
    docxExporter.exportProgram(filename, program_data, () => {
      res.download(filename, function(err){
        if (err) {
          throw err
        }
      })
    })
  }
}
