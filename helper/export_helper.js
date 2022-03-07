class ExportHelper {
  stringify(input) {
    if (typeof input === 'string') {
      var output = input
    } else if (typeof input === 'number') {
      var output = '' + input
    } else {
      var output = '-'
    }
    return output
  }

  assembleFilename(data) {
    const code = data.code ? data.code.split(' ').join('') : 'XX'
    const name = data.code ? data.name.split(' ').join('') : 'xxx'
    const date_today = new Date().toJSON().slice(0,10);
    const filename = 'files/' + date_today + '_' + code + '-' + name + '.docx'
    return filename
  }
}

module.exports = ExportHelper
