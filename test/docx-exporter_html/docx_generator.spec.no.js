const DocxGeneratorProxy = require('../../docx-exporter/docx_generator_proxy')
const docxGenerator = new DocxGeneratorProxy()

// Bold
// Cursive
  // Link
// Heading 1
  // Quote
// Bullet List
  // Numbered List

describe("simple text", () => {
    it("should do nothing with no formating", () => {
        var actual = docxGenerator.saveFile("simple text", filename, callBack)
        var expected = {"deleted": false, "properties": {"deleted": false, "root": [], "rootKey": "w:rPr"}, "root": [{"deleted": false, "root": [], "rootKey": "w:rPr"}, {"deleted": false, "root": [{"deleted": false, "root": {"space": "preserve"}, "rootKey": "_attr", "xmlKeys": {"space": "xml:space"}}, "simple text"], "rootKey": "w:t"}], "rootKey": "w:r"}
        expect(actual).toEqual(expected)
    })
})
