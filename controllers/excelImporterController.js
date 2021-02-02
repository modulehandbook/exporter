'use strict'
const ExcelImporter = require('../excel_importer/excel_import')
const excelImporter = new ExcelImporter()


module.exports = {
  program: (req, res) => {
    excelImporter.doSomething();
  },
}
