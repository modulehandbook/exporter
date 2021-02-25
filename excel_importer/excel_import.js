class ExcelImport {
  doSomething() {
    const planungSoSe21 = {
      sheetName: 'Gesamt',
      xlsx: 'Lehrplanung_01.02.2021.xls'
    };

    const { xlsx2ModuleList } = require('./xlsxScanner');
    const { htw2uas, groupModules, extractAndMap } = require('./schemaConverter');

    const sose21 = xlsx2ModuleList(planungSoSe21);
    const prettifiedSoSe21 = sose21.map((m) => htw2uas(m)).reduce(groupModules, {});

    const fieldMapping = {
      'Sem. von': 'semester',
      'B / M': 'bm',
      name: 'name',
      teacher: 'teacher',
      Modulverantwortlicher: 'responsible'
    };

    const listSoSe21 = extractAndMap(prettifiedSoSe21, fieldMapping);
    // console.log(listSoSe21);

    for (const code in listSoSe21) {
      const m = listSoSe21[code];
      // console.log([m.bm, code, m.name, `${m.teacher.firstName} ${m.teacher.lastName}`, m.responsible].join(', '));
    }
    return listSoSe21;
  }
}

module.exports = ExcelImport;
