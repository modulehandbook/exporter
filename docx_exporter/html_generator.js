const MarkdownParserProxy = require('./markdown_parser_proxy')
const ExportHelper = require('../helper/export_helper')

class HtmlBuilder {
  constructor() {
    this.markdownParser = new MarkdownParserProxy()
    this.exportHelper = new ExportHelper()
  }

  generateTable(contents) {
    var table = '<table style="width:100%">' // open table
    for (var i = 0; i < contents.length; i++) { // greate rows
      table = table + '\n<tr>'
      for (var j = 0; j < contents[i].length; j++) { // create cells
        table = `${table}
        <td>
          ${this.markdownParser.parse(contents[i][j])}
        </td>`
      }
      table = table + '\n</tr>' // end row
    }
    table = table + '\n</table>' // end table
    return table
  }

  generatePageBreak() {
    return '<div class="page-break" style="page-break-after: always"></div>'
  }

  generateHeading(text, level) {
   var heading = ''
   for (var i = 0; i < level; i++) {
     heading = heading + '#'
   }
   heading = `${heading} ${text}`
   return this.markdownParser.parse(heading)
  }

  generateHeadingWithText(headingText, level, text) {
    return `${this.generateHeading(headingText, level)}
    ${this.markdownParser.parse(this.exportHelper.stringify(text))}`
  }

}

module.exports = HtmlBuilder
