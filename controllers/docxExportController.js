'use strict'
const docx_exporter = require('../docx-exporter/docx-export')

exports.program = (req, res) => {
  const program_data = req.body
  const code = program_data.code ? program_data.code.split(' ').join('') : 'XX'
  const name = program_data.code ? program_data.name.split(' ').join('') : 'xxx'
  const date_today = new Date().toJSON().slice(0,10);
  const filename = 'files/' + date_today + '_' + code + '-' + name + '.docx'

  console.log('started export');
  docx_exporter.export_program(filename, program_data, ()=>{
    console.log('export done');
    res.download(filename, function(err){ //file gips nicht - y?!
      if (err) {
        throw err
      }
    })
  })

}
