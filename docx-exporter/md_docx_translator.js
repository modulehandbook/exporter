const MarkdownParserProxy = require('../docx-exporter/markdown_parser_proxy')
const DocxGeneratorProxy = require('../docx-exporter/docx_generator_proxy')

// **Bold**, -> strong
// _Cursive_, -> em
// Links: [LinkTarget](LinkAlt), -> link
// # / ======= Headings, -> heading
// > Quote, -> blockQuote
// * / - Bullets, -> list, ordered: false
// 1. Numbered List, -> list, ordered: true

class MdDocxTranslator {
  constructor() {
    this.markdownParser = new MarkdownParserProxy()
    this.docxGenerator = new DocxGeneratorProxy()
  }

  translate(markdown) {
    if (markdown === '') {
      var array = []
      array.push(this.docxGenerator.generateEmptyParagraph())
      return array
    }
    const parsedMD = this.markdownParser.parse(markdown)
    var docxElements = []
    var text, element
    for (var i = 0; i < parsedMD.length; i++) {
      var item = parsedMD[i]
      switch(item.type) {
        case 'paragraph':
          if (item.content.length > 1) {
            for (var j = 0; j < item.content.length; j++) {
              element = this.decideTextStrongEm(item.content[j])
              docxElements.push(element)
            }
          } else {
            element = this.decideTextStrongEm(item.content[0])
            docxElements.push(element)
          }
          break
        case 'blockQuote':
          text = item.content[0].content[0].content
          element = this.docxGenerator.generateQuote(text)
          docxElements.push(element)
          break
        case 'heading':
          text = item.content[0].content
          element = this.docxGenerator.generateHeading(text, item.level)
          docxElements.push(element)
          break
        case 'list':
          // switch (item.ordered) {
            // case false:
              const bullets = []
              item.items.forEach((bullet, i) => {
                bullets.push(bullet[0].content)
              })
              element = this.docxGenerator.generateBulletList(bullets)
              docxElements.push(element)
              // break
            // case true:
            //   const listItems = []
            //   item.items.forEach((listItem, i) => {
            //     listItems.push(listItem[0].content)
            //   })
              //element = this.docxGenerator.generateNumberedList(listItems, item.start)
              //docxElements.push(element)
              // break
          // }
          break
        }
      }
    return docxElements
  }

// ______________

  decideTextStrongEm(item) {
    var text, element
    switch(item.type) {
      case 'text':
        text = item.content
        element = this.docxGenerator.generateText(text)
        break
      case 'strong':
        text = item.content[0].content
        element = this.docxGenerator.generateText(text, true)
        break
      case 'em':
        text = item.content[0].content
        element = this.docxGenerator.generateText(text, false, true)
        break
    }
    return element
  }
}

module.exports = MdDocxTranslator
