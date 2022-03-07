'use strict'
const DocxExporter = require('../docx_exporter/docx_export')
const ExportHelper = require('../helper/export_helper')
const docxExporter = new DocxExporter()
const exportHelper = new ExportHelper()
const program = require('../test/data/program')
const course = require('../test/data/course')

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
  course: (req, res) => {
    const course_data = req.body
    const filename = exportHelper.assembleFilename(course_data)
    docxExporter.exportCourse(filename, course_data, () => {
      res.download(filename, function(err){
        if (err) {
          throw err
        }
      })
    })
  },
  demo_program: (req, res) => {
    const program_data = program
    const filename = exportHelper.assembleFilename(program_data)
    docxExporter.exportProgram(filename, program_data, () => {
      res.download(filename, function(err){
        if (err) {
          throw err
        }
      })
    })
  },
  demo_course: (req, res) => {
    const course_data = course
    const filename = exportHelper.assembleFilename(course_data)
    docxExporter.exportCourse(filename, course_data, () => {
      res.download(filename, function(err){
        if (err) {
          throw err
        }
      })
    })
  }
}
