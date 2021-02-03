'use strict';

const fs = require('fs');
const XLSX = require('xlsx');
/* equivalent to `var wb = XLSX.readFile("sheetjs.xlsx");` */

module.exports.xlsx2ModuleList = function xlsx2ModuleList(config) {
  var buf = fs.readFileSync(config.xlsx);
  var wb = XLSX.read(buf, { type: 'buffer' });

  //calculating the number or rows on the sheet
  var sheet_name_list = wb.SheetNames;
  let count = [];
  for (var sheetIndex = 0; sheetIndex < sheet_name_list.length; sheetIndex++) {
    var worksheet = wb.Sheets[sheet_name_list[sheetIndex]];
    var range2 = XLSX.utils.decode_range(worksheet['!ref']);
    var num_rows = range2.e.r - range2.s.r + 1;
    count.push({
      data_count: num_rows
    });
  }
  const rowCount = count[0].data_count - 1; //minus one to subtract the headings

  const sheet = wb.Sheets[config.sheetName];
  if (sheet === undefined) {
    console.log(`error: could not find sheet ${config.sheetName} in file ${config.xlsx}`);
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rangeRegex = /(\D+)(\d+):(\D+)+(\d+)/;
  const headerRangeParts = 'A1:W1'.match(rangeRegex); // alte Tabellen nur bis L1 ['A1:L1', 'A','1','L','1']
  const i = alphabet.indexOf(headerRangeParts[3]);
  const columnNames = Array.from(alphabet.substring(0, i + 1));
  const headerRow = headerRangeParts[2];
  const headers = columnNames.map((c) => {
    const field = c + headerRow;
    return {
      title: sheet[field].v,
      column: c
    };
  });

  const range = `A2:W${rowCount}`.match(rangeRegex);
  const result = [];
  const fromRow = parseInt(range[2]),
    toRow = parseInt(range[4]);
  for (var row = fromRow; row <= toRow; row++) {
    const rowObject = {};
    for (var header of headers) {
      const field = header.column + row;
      const sheetObject = sheet[field];
      if (typeof sheetObject !== 'undefined') {
        rowObject[header.title] = sheet[field].v;
      }
    }
    result.push(rowObject);
  }
  return result;
};
