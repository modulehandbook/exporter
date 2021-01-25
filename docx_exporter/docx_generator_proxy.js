const HTMLtoDOCX = require('html-to-docx')
const fs = require('fs')

class DocxGeneratorProxy {
  constructor() {
    this.generator = HTMLtoDOCX
  }

  saveFile(htmlString, headerHTMLString, filename, callBack) {
    // https://github.com/privateOmega/html-to-docx/blob/master/example/example-node.js
    HTMLtoDOCX(htmlString, headerHTMLString, {
      table: { row: { cantSplit: true } },
      header: true,
      footer: true,
      pageNumber: true,
    }).then((buffer) => {
      fs.writeFileSync('./' + filename, buffer, (error) => {
        if (error) {
          console.log('Docx file creation failed for file: ' + filename)
        } else {
          console.log('Docx file created successfully for file: ' + filename)
        }
      })
      callBack()
    })
  }
}

module.exports = DocxGeneratorProxy
