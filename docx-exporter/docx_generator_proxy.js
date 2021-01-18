const Docx = require('docx')
const fs = require('fs')
// const mdParse = SimpleMarkdown.defaultBlockParse
// module.exports = mdParse

// TODO: parameter überprüfen!
// TODO: TESTs für methoden die noch keine eigenen haben
class DocxGeneratorProxy {
  constructor() {
    this.generator = Docx
  }

  generateDoc(stylesFile, format) {
    const styles = fs.readFileSync(stylesFile, format)
    return new this.generator.Document({
      externalStyles: styles,
    })
  }

  generateHeader(text) {
    return {
      default: new this.generator.Header({
        children: [
          new this.generator.Paragraph({
            style: 'Header',
            children: [
              new this.generator.TextRun(text),
            ],
          }),
        ],
      }),
    }
  }

  generateFooter() {
    return {
      default: new this.generator.Footer({
        children: [
          new this.generator.Paragraph({
            alignment: this.generator.AlignmentType.CENTER,
            style: 'Footer',
            children: [
              new this.generator.TextRun({
                children: ['Page ', this.generator.PageNumber.CURRENT],
              }),
              new this.generator.TextRun({
                children: [' of ', this.generator.PageNumber.TOTAL_PAGES],
              }),
            ],
          }),
        ],
      }),
    }
  }

  generateTOC(title) {
    return [
      this.generateHeading(title, 3),
      new this.generator.TableOfContents('Courses', {
      hyperlink: true,
      headingStyleRange: '2-2',
      }),
      this.generatePageBreak(),
    ]
  }

  generateEmptyParagraph() {
    return new this.generator.Paragraph('')
  }

  generateParagraph(text) {
    if (text === '') text = '-'
    return new this.generator.Paragraph(text)
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

  generateTable(content) {
    if (!Array.isArray(content)) {
      return
    }
    var rows = []
    for (var i = 0; i < content.length; i++) {
      var cellContent
      if (typeof content[i][1] === 'string') {
        cellContent = [new this.generator.Paragraph(content[i][1])]
      } else {
        //console.log(JSON.stringify(content[i][1]))
        cellContent = content[i][1]
      }
      const table = new this.generator.TableRow({
        children: [
          new this.generator.TableCell({
            children: [new this.generator.Paragraph(content[i][0])],
          }),
          new this.generator.TableCell({
            children: cellContent,
          }),
        ]
      })
      rows.push(table)
    }
    return new this.generator.Table({
      width: {
        size: 100,
        type: this.generator.WidthType.PERCENTAGE,
      },
      rows: rows,
    })
  }

  generatePageBreak() {
    return new this.generator.Paragraph({
      children: [new this.generator.PageBreak()],
    })
  }

  assembleDocument(doc, header, footer, contents) {
    return doc.addSection({
      headers: header,
      footers: footer,
      properties: {
        pageNumberStart: 1,
        pageNumberFormatType: this.generator.PageNumberFormat.DECIMAL,
      },
      children: contents,
    })
  }

  saveFile(doc, filename, callBack) {
    this.generator.Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync('./' + filename, buffer)
      callBack()
    })
  }
}

module.exports = DocxGeneratorProxy
