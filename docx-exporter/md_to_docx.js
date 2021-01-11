const MarkdownParserProxy = require('../docx-exporter/markdownparser-proxy')
const Docx = require('docx')

// **Bold**, -> strong
// _Cursive_, -> em
// Links: [LinkTarget](LinkAlt), -> link
// # / ======= Headings, -> heading
// > Quote, -> blockQuote
// * / - Bullets, -> list, ordered: false
// 1. Numbered List, -> list, ordered: true

class DocxGenerator {
  constructor() {
    this.markdownParser = new MarkdownParserProxy()
  }


}

module.exports = DocxGenerator
