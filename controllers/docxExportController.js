'use strict'
const DocxExporter = require('../docx_exporter/docx_export')
const ExportHelper = require('../helper/export_helper')
const docxExporter = new DocxExporter()
const exportHelper = new ExportHelper()
const demoData = {
  program: require('../test/data/program'),
  course: require('../test/data/course')
}

module.exports = {
  extract_export_type: (req,res,next) =>  {
    req.export_type = req.params[0];
    next();
  },
  convert2docx: (req,res,next) =>  {
    const filename = exportHelper.assembleFilename(req.program_data)
    docxExporter[req.export_type](filename, req.program_data, (docx_blob) => {
      res.attachment(filename);
      res.type(docx_blob.type)
      docx_blob.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf))
      });
    })
  },
  add_data: (req, res, next) => {
    req.program_data = req.body;
    next();
  },

  add_demo_data: (req, res, next) => {
    req.program_data = demoData[req.export_type];
    next();
  }
}
