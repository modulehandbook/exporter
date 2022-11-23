const HTMLtoDOCX = require('html-to-docx')
const fs = require('fs')

class DocxGeneratorProxy {
  constructor() {
    this.generator = HTMLtoDOCX
  }

  html2Docx(htmlString, headerHTMLString, callBack) {
    // https://github.com/privateOmega/html-to-docx/blob/master/example/example-node.js
    HTMLtoDOCX(htmlString, headerHTMLString, {
      table: { row: { cantSplit: true } },
      header: true,
      footer: true,
      pageNumber: true,
    }).then((buffer) => {
      callBack(buffer)
    })
  }
}

module.exports = DocxGeneratorProxy
