const Docx = require('docx')
// const mdParse = SimpleMarkdown.defaultBlockParse
// module.exports = mdParse

// TODO: parameter überprüfen!
class DocxGeneratorProxy {
  constructor() {
    this.generator = Docx
  }

  generateText(text, bold, italics) {
    return new this.generator.TextRun({ text: text, bold: bold, italics: italics })
  }

  generateQuote(text) {
    return new this.generator.TextRun({ text: text, italics: true, highlight: 'grey' })
  }

  generateHeading(text, level) {
    var heading = this.generator.HeadingLevel.HEADING_1
    switch(level) {
      case 1:
        heading = this.generator.HeadingLevel.HEADING_1
        break
      case 2:
        heading = this.generator.HeadingLevel.HEADING_2
        break
      case 3:
        heading = this.generator.HeadingLevel.HEADING_3
        break
      case 4:
        heading = this.generator.HeadingLevel.HEADING_4
        break
      case 5:
        heading = this.generator.HeadingLevel.HEADING_5
        break
      case 6:
        heading = this.generator.HeadingLevel.HEADING_6
        break
      case 7:
        heading = this.generator.HeadingLevel.HEADING_7
        break
      case 8:
        heading = this.generator.HeadingLevel.HEADING_8
        break
      default:
        heading = this.generator.HeadingLevel.HEADING_1
    }
    return new this.generator.Paragraph({ text: text, heading: heading })
  }

  generateBulletList(bullets, level) {
    var level = level || 0
    if (Array.isArray(bullets)) {
      var children = []
      for(var i = 0; i < bullets.length; i++) {
        var child = this.generateText(bullets[i])
        children = children.concat(child);
      }
      return new this.generator.Paragraph({ children: children, bullet: { level: level } })
    } else {
      return new this.generator.Paragraph({ text: bullets, bullet: { level: level } })
    }
  }
}

module.exports = DocxGeneratorProxy
