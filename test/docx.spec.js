const DocxGeneratorProxy = require('../docx-exporter/docxgenerator-proxy')
const docxGenerator = new DocxGeneratorProxy()

// Bold
// Cursive
  // Link
// Heading 1
  // Quote
// Bullet List
  // Numbered List


// new docx.TextRun({ text: "simple text" })

describe("simple text", () => {
    it("should do nothing with no formating", () => {
        var actual = docxGenerator.generateText("simple text")
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "simple text"], "rootKey": "w:t"}], "rootKey": "w:r"}
        expect(actual).toEqual(expected)
    })
})

// new docx.TextRun({ text: "simple text\n\nwith line breaks" })

describe("linebreaks", () => {
    it("should make multiple lines when dealing with linebreaks", () => {
        var actual = docxGenerator.generateText("simple text\n\nwith line breaks")
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "simple text\n\nwith line breaks"], "rootKey": "w:t"}], "rootKey": "w:r"}
        expect(actual).toEqual(expected)
    })
})

// new docx.TextRun({ text: "**Something Bold**", bold: true })

describe("**Bold**", () => {
    it("should create a single bold element", () => {
        var actual = docxGenerator.generateText("**Something Bold**", true)
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:b"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:bCs"}], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:b"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:bCs"}], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "**Something Bold**"], "rootKey": "w:t"}], "rootKey": "w:r"}
        expect(actual).toEqual(expected)
    })
})

// new docx.TextRun({ text: "_Something Cursive_", italics: true })

describe("_Cursive_", () => {
    it("should create a single cursive element", () => {
        var actual = docxGenerator.generateText("_Something Cursive_", false, true)
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:i"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:iCs"}], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:i"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:iCs"}], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "_Something Cursive_"], "rootKey": "w:t"}], "rootKey": "w:r"}
        expect(actual).toEqual(expected)
    })
})

//nothing usable?!

// describe("Links - [LinkTarget](LinkAlt)", () => {
//     it("should convert a single link element", () => {
//         var actual = mdParse("[LinkTarget](LinkAlt)")
//         var expected = [{"content": [{"content": [{"content": "LinkTarget", "type": "text"}], "target": "LinkAlt", "title": undefined, "type": "link",}], "type": "paragraph"}]
//         expect(actual).toEqual(expected)
//     })
// })
//

// new docx.Paragraph({ text: "# Some Headline ======", heading: docx.HeadingLevel.HEADING_1 })

describe("Headings Level 1", () => {
    it("should create a single heading element", () => {
        var actual = docxGenerator.generateHeading("# Some Headline ======")
        var actual2 = docxGenerator.generateHeading("# Some Headline ======", 1)
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": "Heading1"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:pStyle"}], "rootKey": "w:pPr"}, "root": [{"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": "Heading1"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:pStyle"}], "rootKey": "w:pPr"}, {"deleted": false, "properties": {"deleted": false, "root": [], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "# Some Headline ======"], "rootKey": "w:t"}], "rootKey": "w:r"}], "rootKey": "w:p"}
        expect(actual).toEqual(expected)
        expect(actual2).toEqual(expected)
    })
})

// new docx.TextRun({ text: "Foo Bar", italics: true, indent: new docx.Indent(720, 260) })

describe("Quote", () => {
    it("should create a single quote element", () => {
        var actual = docxGenerator.generateQuote("Foo Bar")
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:i"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:iCs"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": "grey"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:highlight"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": "grey"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:highlightCs"}], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:i"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": true}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:iCs"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": "grey"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:highlight"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": "grey"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:highlightCs"}], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "Foo Bar"], "rootKey": "w:t"}], "rootKey": "w:r"}
        expect(actual).toEqual(expected)
    })
})

// new docx.Paragraph({ text: "Bullet points", bullet: { level: 0 } })
// new docx.Paragraph({ children: [new docx.TextRun("Bullet point 1"), new docx.TextRun("Bullet point 2"), new docx.TextRun("Bullet point 3")], bullet: { level: 0 } })
// verschachtelte listen?

describe("Bullets", () => {
    it("should convert a single bullet element", () => {
        var actual = docxGenerator.generateBulletList("Bullet points")
        var actual2 = docxGenerator.generateBulletList("Bullet points", 0)
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": "ListParagraph"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:pStyle"}, {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": 0}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:ilvl"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": 1}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:numId"}], "rootKey": "w:numPr"}], "rootKey": "w:pPr"}, "root": [{"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": "ListParagraph"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:pStyle"}, {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": 0}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:ilvl"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": 1}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:numId"}], "rootKey": "w:numPr"}], "rootKey": "w:pPr"}, {"deleted": false, "properties": {"deleted": false, "root": [], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "Bullet points"], "rootKey": "w:t"}], "rootKey": "w:r"}], "rootKey": "w:p"}
        expect(actual).toEqual(expected)
        expect(actual2).toEqual(expected)
    })
    it("should convert multiple bullet elements", () => {
        var actual = docxGenerator.generateBulletList(["Bullet point 1", "Bullet point 2", "Bullet point 3"])
        var actual2 = docxGenerator.generateBulletList(["Bullet point 1", "Bullet point 2", "Bullet point 3"], 0)
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": "ListParagraph"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:pStyle"}, {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": 0}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:ilvl"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": 1}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:numId"}], "rootKey": "w:numPr"}], "rootKey": "w:pPr"}, "root": [{"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": "ListParagraph"}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:pStyle"}, {"deleted": false, "root": [{"deleted": false, "root": [{"deleted": false, "root": {"val": 0}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:ilvl"}, {"deleted": false, "root": [{"deleted": false, "root": {"val": 1}, "rootKey": "_attr", "xmlKeys": {"bottom": "w:bottom", "color": "w:color", "fill": "w:fill", "footer": "w:footer", "gutter": "w:gutter", "h": "w:h", "header": "w:header", "left": "w:left", "linePitch": "w:linePitch", "pos": "w:pos", "right": "w:right", "rsidR": "w:rsidR", "rsidRPr": "w:rsidRPr", "rsidSect": "w:rsidSect", "space": "w:space", "sz": "w:sz", "top": "w:top", "type": "w:type", "val": "w:val", "w": "w:w"}}], "rootKey": "w:numId"}], "rootKey": "w:numPr"}], "rootKey": "w:pPr"}, {"deleted": false, "properties": {"deleted": false, "root": [], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "Bullet point 1"], "rootKey": "w:t"}], "rootKey": "w:r"}, {"deleted": false, "properties": {"deleted": false, "root": [], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "Bullet point 2"], "rootKey": "w:t"}], "rootKey": "w:r"}, {"deleted": false, "properties": {"deleted": false, "root": [], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "Bullet point 3"], "rootKey": "w:t"}], "rootKey": "w:r"}], "rootKey": "w:p"}
        expect(actual).toEqual(expected)
        expect(actual2).toEqual(expected)
    })
})

//Pain in the...

// describe("1. List", () => {
//     it("should convert a single list element", () => {
//         var actual = mdParse("1. List")
//         var expected = [{"items": [[{"content": "List", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}]
//         expect(actual).toEqual(expected)
//     })
//     it("should convert multiple list elements starting at one", () => {
//         var actual = mdParse("1. Item 1 \n2. Item 2 \n3. Item 3")
//         var expected = [{"items": [[{"content": "Item 1", "type": "text"}], [{"content": "Item 2", "type": "text"}], [{"content": "Item 3", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}]
//         expect(actual).toEqual(expected)
//     })
//     it("should convert multiple list elements not starting at one", () => {
//         var actual = mdParse("3. Item 3 \n4. Item 4 \n5. Item 5")
//         var expected = [{"items": [[{"content": "Item 3", "type": "text"}], [{"content": "Item 4", "type": "text"}], [{"content": "Item 5", "type": "text" }]], "ordered": true, "start": 3, "type": "list"}]
//         expect(actual).toEqual(expected)
//     })
//     it("should convert multiple list elements between other elements", () => {
//         var actual = mdParse("something\n\n1. Item 1 \n2. Item 2 \n3. Item 3\n\nelse")
//         var expected = [{"content": [{"content": "something", "type": "text"}], "type": "paragraph"}, {"items": [[{"content": "Item 1", "type": "text"}], [{"content": "Item 2", "type": "text"}], [{"content": "Item 3", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected)
//     })
// })
