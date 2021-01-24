const Showdown = require("showdown")
// const mdParse = SimpleMarkdown.defaultBlockParse
// module.exports = mdParse

class MarkdownParserProxy {
  constructor() {
    this.converter = new Showdown.Converter()
  }

  parse(markdown) {
    if (markdown == '') {
      markdown = '-'
    }
    return this.converter.makeHtml(markdown)
  }
}

module.exports = MarkdownParserProxy
