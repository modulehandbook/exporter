'use strict';
const ExcelImporter = require('../excel_importer/excel_import');
const excelImporter = new ExcelImporter();
const fs = require('fs');
const XLSX = require('xlsx');

module.exports = {
  program: (req, res) => {
    var data = [];

    req
      .on('data', function (chunk) {
        data.push(chunk);
      })
      .on('end', function () {
        //at this point data is an array of Buffers
        //so Buffer.concat() can make us a new Buffer
        //of all of them together
        var buffer = Buffer.concat(data);
        // var string = buffer.toString('base64');

        // console.log(buffer);
        excelImporter.doSomething(buffer);
      });
  }
};
