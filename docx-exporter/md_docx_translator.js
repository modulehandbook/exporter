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
    const parsedMD = this.markdownParser.parse(markdown)
    var docxElements = []
    parsedMD.forEach((item, i) => {
      // switch(expression) {
      //   case x:
      //     // code block
      //     break;
      //   case y:
      //     // code block
      //     break;
      //   default:
      //     // code block
      // }




      if (Array.isArray(item.content)) {
        switch(item.type) {
          case 'paragraph':
            var text, element
            switch(item.content[0].type) {
              case 'text':
                text = item.content[0].content
                element = this.docxGenerator.generateText(text)
                break
              case 'strong':
                text = item.content[0].content[0].content
                element = this.docxGenerator.generateText(text, true)
                break
              case 'em':
                text = item.content[0].content[0].content
                element = this.docxGenerator.generateText(text, false, true)
                break
            }
            break
          case 'blockQuote':
            text = item.content[0].content[0].content
            element = this.docxGenerator.generateQuote(text)
            break
          case 'heading':
            text = item.content[0].content
            element = this.docxGenerator.generateHeading(text, item.level)
            break
        }
        docxElements.push(element)
      } else if (item.type === 'list') {
        var element
        switch (item.ordered) {
          case false:
            const bullets = []
            item.items.forEach((bullet, i) => {
              bullets.push(bullet[0].content)
            })
            element = this.docxGenerator.generateBulletList(bullets)
            break
          case true:
            const listItems = []
            item.items.forEach((listItem, i) => {
              listItems.push(listItem[0].content)
            })
            //element = this.docxGenerator.generateNumberedList(listItems, item.start)
          break
        }
        docxElements.push(element)
      }
    })
    return docxElements
  }
}

module.exports = MdDocxTranslator
