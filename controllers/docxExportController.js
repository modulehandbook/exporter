'use strict'
const DocxExporter = require('../docx_exporter/docx_export')
const ExportHelper = require('../helper/export_helper')
const docxExporter = new DocxExporter()
const exportHelper = new ExportHelper()
const program = require('../test/data/program')
const course = require('../test/data/course')

module.exports = {
  convert2docx: (req,res,next) =>  {
    var export_type = req.params[0];
        console.log(export_type);
    const program_data = req.body
    const filename = exportHelper.assembleFilename(program_data)
    //var docx_blob = program_data_2_docx(program_data,export_type)
    docxExporter[export_type](filename, program_data, (docx_blob) => {
      res.attachment(filename);
      console.log("about to send blob: "+docx_blob);
      console.log(docx_blob)
      res.type(docx_blob.type)
      docx_blob.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf))
      });
    //next();
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
