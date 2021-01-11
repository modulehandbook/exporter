const SimpleMarkdown = require("simple-markdown")
// const mdParse = SimpleMarkdown.defaultBlockParse
// module.exports = mdParse

class MarkdownParserProxy {
  constructor() {
    this.parser = SimpleMarkdown.defaultBlockParse
  }

  parse(markdown) {
    return this.parser(markdown)
  }
}

module.exports = MarkdownParserProxy
