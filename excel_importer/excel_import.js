class ExcelImport {
  doSomething() {
    const planungSoSe21 = {
      sheetName: 'Gesamt',
      headerRange: 'A1:W1',
      valueRange: 'A2:W90',
      xlsx: 'Lehrplanung_01.02.2021.xls'
    };
  }
}

module.exports = ExcelImport;
