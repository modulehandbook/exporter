const MarkdownParserProxy = require('../docx-exporter/markdown_parser_proxy')
const markdownParser = new MarkdownParserProxy()

// **Bold**, -> strong
// _Cursive_, -> em
// Links: [LinkTarget](LinkAlt), -> link
// # / ======= Headings, -> heading
// > Quote, -> blockQuote
// * / - Bullets, -> list, ordered: false
// 1. Numbered List, -> list, ordered: true

describe("simple text", () => {
    it("should do nothing with no formating", () => {
        var actual = markdownParser.parse("no formatting")
        var expected = [{"content": [{"content": "no formatting", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("linebreaks", () => {
    it("should not make multiple lines when 1 linebreak", () => {
        var actual = markdownParser.parse("no formatting\nexcept linebreaks")
        var expected = [{"content": [{"content": "no formatting\nexcept linebreaks", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
    it("should make multiple lines when 2 linebreaks", () => {
        var actual = markdownParser.parse("no formatting\n\nexcept linebreaks")
        var expected = [{"content": [{"content": "no formatting", "type": "text"}], "type": "paragraph"}, {"content": [{"content": "except linebreaks", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("**Bold**", () => {
    it("should convert a single bold element", () => {
        var actual = markdownParser.parse("**Something Bold**")
        var expected = [{"content": [{"content": [{"content": "Something Bold", "type": "text"}], "type": "strong"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
    it("should convert a bold element between other elements", () => {
        var actual = markdownParser.parse("something **Something Bold** else.")
        var expected = [{"content": [{"content": "something ", "type": "text"}, {"content": [{"content": "Something Bold", "type": "text"}], "type": "strong"}, {"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("_Cursive_", () => {
    it("should convert a single cursive element", () => {
        var actual = markdownParser.parse("_Something Cursive_")
        var expected = [{"content": [{"content": [{"content": "Something Cursive", "type": "text"}], "type": "em"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
    it("should convert a cursive element between other elements", () => {
        var actual = markdownParser.parse("something _Something Cursive_ else.")
        var expected = [{"content": [{"content": "something ", "type": "text"}, {"content": [{"content": "Something Cursive", "type": "text"}], "type": "em"}, {"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("Links - [LinkTarget](LinkAlt)", () => {
    it("should convert a single link element", () => {
        var actual = markdownParser.parse("[LinkTarget](LinkAlt)")
        var expected = [{"content": [{"content": [{"content": "LinkTarget", "type": "text"}], "target": "LinkAlt", "title": undefined, "type": "link",}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
    it("should convert a link element between other elements", () => {
        var actual = markdownParser.parse("something [LinkTarget](LinkAlt) else.")
        var expected = [{"content": [{"content": "something ", "type": "text"}, {"content": [{"content": "LinkTarget", "type": "text"}], "target": "LinkAlt", "title": undefined, "type": "link",}, {"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("Headings Level 1 \n=====", () => {
    it("should convert a single heading element", () => {
        var actual = markdownParser.parse("Heading\n=====")
        var expected = [{"content": [{"content": "Heading", "type": "text"}], "level": 1, "type": "heading"}]
        expect(actual).toEqual(expected)
    })
    it("should convert a heading element between other elements", () => {
        var actual = markdownParser.parse("something \n\nHeading\n=====\n\n else.")
        var expected = [{"content": [{"content": "something ", "type": "text"}], "type": "paragraph"}, {"content": [{"content": "Heading", "type": "text"}], "level": 1, "type": "heading"}, {"content": [{"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("# Headings Level 1", () => {
    it("should convert a single heading element", () => {
        var actual = markdownParser.parse("# Heading")
        var expected = [{"content": [{"content": "Heading", "type": "text"}], "level": 1, "type": "heading"}]
        expect(actual).toEqual(expected)
    })
    it("should convert a heading element between other elements", () => {
        var actual = markdownParser.parse("something \n\n# Heading\n\n else.")
        var expected = [{"content": [{"content": "something ", "type": "text"}], "type": "paragraph"}, {"content": [{"content": "Heading", "type": "text"}], "level": 1, "type": "heading"}, {"content": [{"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("> Quote", () => {
    it("should convert a single quote element", () => {
        var actual = markdownParser.parse("> A Quote")
        var expected = [{"content": [{"content": [{"content": "A Quote", "type": "text"}], "type": "paragraph"}], "type": "blockQuote"}]
        expect(actual).toEqual(expected)
    })
    it("should convert a multiline quote element", () => {
        var actual = markdownParser.parse("> A Quote\ncontinued")
        var expected = [{"content": [{"content": [{"content": "A Quote\ncontinued", "type": "text"}], "type": "paragraph"}], "type": "blockQuote"}]
        expect(actual).toEqual(expected)
    })
    it("should convert a quote element between other elements", () => {
        var actual = markdownParser.parse("something\n> A Quote\n\nelse")
        var expected = [{"content": [{"content": "something\n", "type": "text"}, {"content": "> A Quote", "type": "text"}], "type": "paragraph"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("- Bullets", () => {
    it("should convert a single bullet element", () => {
        var actual = markdownParser.parse("- Bullets")
        var expected = [{"items": [[{"content": "Bullets", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}]
        expect(actual).toEqual(expected)
    })
    it("should convert multiple bullet elements", () => {
        var actual = markdownParser.parse("- Bullet 1 \n- Bullet 2 \n- Bullet 3")
        var expected = [{"items": [[{"content": "Bullet 1", "type": "text"}], [{"content": "Bullet 2", "type": "text"}], [{"content": "Bullet 3", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}]
        expect(actual).toEqual(expected)
    })
    it("should convert multiple bullet elements between other elements", () => {
        var actual = markdownParser.parse("something\n\n- Bullet 1 \n- Bullet 2 \n- Bullet 3\n\nelse")
        var expected = [{"content": [{"content": "something", "type": "text"}], "type": "paragraph"}, {"items": [[{"content": "Bullet 1", "type": "text"}], [{"content": "Bullet 2", "type": "text"}], [{"content": "Bullet 3", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("* Bullets", () => {
    it("should convert a single bullet element", () => {
        var actual = markdownParser.parse("* Bullets")
        var expected = [{"items": [[{"content": "Bullets", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}]
        expect(actual).toEqual(expected)
    })
    it("should convert multiple bullet elements", () => {
        var actual = markdownParser.parse("* Bullet 1 \n* Bullet 2 \n* Bullet 3")
        var expected = [{"items": [[{"content": "Bullet 1", "type": "text"}], [{"content": "Bullet 2", "type": "text"}], [{"content": "Bullet 3", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}]
        expect(actual).toEqual(expected)
    })
    it("should convert multiple bullet elements between other elements", () => {
        var actual = markdownParser.parse("something\n\n* Bullet 1 \n* Bullet 2 \n* Bullet 3\n\nelse")
        var expected = [{"content": [{"content": "something", "type": "text"}], "type": "paragraph"}, {"items": [[{"content": "Bullet 1", "type": "text"}], [{"content": "Bullet 2", "type": "text"}], [{"content": "Bullet 3", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})

describe("1. List", () => {
    it("should convert a single list element", () => {
        var actual = markdownParser.parse("1. List")
        var expected = [{"items": [[{"content": "List", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}]
        expect(actual).toEqual(expected)
    })
    it("should convert multiple list elements starting at one", () => {
        var actual = markdownParser.parse("1. Item 1 \n2. Item 2 \n3. Item 3")
        var expected = [{"items": [[{"content": "Item 1", "type": "text"}], [{"content": "Item 2", "type": "text"}], [{"content": "Item 3", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}]
        expect(actual).toEqual(expected)
    })
    it("should convert multiple list elements not starting at one", () => {
        var actual = markdownParser.parse("3. Item 3 \n4. Item 4 \n5. Item 5")
        var expected = [{"items": [[{"content": "Item 3", "type": "text"}], [{"content": "Item 4", "type": "text"}], [{"content": "Item 5", "type": "text" }]], "ordered": true, "start": 3, "type": "list"}]
        expect(actual).toEqual(expected)
    })
    it("should convert multiple list elements between other elements", () => {
        var actual = markdownParser.parse("something\n\n1. Item 1 \n2. Item 2 \n3. Item 3\n\nelse")
        var expected = [{"content": [{"content": "something", "type": "text"}], "type": "paragraph"}, {"items": [[{"content": "Item 1", "type": "text"}], [{"content": "Item 2", "type": "text"}], [{"content": "Item 3", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
        expect(actual).toEqual(expected)
    })
})
