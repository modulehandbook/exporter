const MarkdownParserProxy = require('../../docx-exporter/markdown_parser_proxy')
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
        var actual = markdownParser.parse("no formatting.")
        var expected = '<p>no formatting.</p>'
        expect(actual).toEqual(expected)
    })
})

describe("linebreaks", () => {
    it("should not make multiple lines when 1 linebreak", () => {
        var actual = markdownParser.parse("no formatting\nexcept linebreaks")
        var expected = '<p>no formatting\nexcept linebreaks</p>'
        expect(actual).toEqual(expected)
    })
    it("should make multiple lines when 2 linebreaks", () => {
        var actual = markdownParser.parse("no formatting\n\nexcept linebreaks")
        var expected = '<p>no formatting</p>\n<p>except linebreaks</p>'
        expect(actual).toEqual(expected)
    })
})

describe("**Bold**", () => {
    it("should convert a single bold element", () => {
        var actual = markdownParser.parse("**Something Bold**")
        var expected = '<p><strong>Something Bold</strong></p>'
        expect(actual).toEqual(expected)
    })
    it("should convert a bold element between other elements", () => {
        var actual = markdownParser.parse("something **Something Bold** else.")
        var expected = '<p>something <strong>Something Bold</strong> else.</p>'
        expect(actual).toEqual(expected)
    })
})

describe("_Cursive_", () => {
    it("should convert a single cursive element", () => {
        var actual = markdownParser.parse("_Something Cursive_")
        var expected = '<p><em>Something Cursive</em></p>'
        expect(actual).toEqual(expected)
    })
    it("should convert a cursive element between other elements", () => {
        var actual = markdownParser.parse("something _Something Cursive_ else.")
        var expected = '<p>something <em>Something Cursive</em> else.</p>'
        expect(actual).toEqual(expected)
    })
})

describe("Links - [LinkTarget](LinkAlt)", () => {
    it("should convert a single link element", () => {
        var actual = markdownParser.parse("[LinkTarget](LinkAlt)")
        var expected = '<p><a href=\"LinkAlt\">LinkTarget</a></p>'
        expect(actual).toEqual(expected)
    })
    it("should convert a link element between other elements", () => {
        var actual = markdownParser.parse("something [LinkTarget](LinkAlt) else.")
        var expected = '<p>something <a href=\"LinkAlt\">LinkTarget</a> else.</p>'
        expect(actual).toEqual(expected)
    })
})

describe("Headings Level 1 \n=====", () => {
    it("should convert a single heading element", () => {
        var actual = markdownParser.parse("Heading\n=====")
        var expected = '<h1 id=\"heading\">Heading</h1>'
        expect(actual).toEqual(expected)
    })
    it("should convert a heading element between other elements", () => {
        var actual = markdownParser.parse("something \n\nHeading\n=====\n\n else.")
        var expected = '<p>something </p>\n<h1 id=\"heading\">Heading</h1>\n<p>else.</p>'
        expect(actual).toEqual(expected)
    })
})

describe("# Headings Level 1", () => {
    it("should convert a single heading element", () => {
        var actual = markdownParser.parse("# Heading")
        var expected = '<h1 id=\"heading\">Heading</h1>'
        expect(actual).toEqual(expected)
    })
    it("should convert a heading element between other elements", () => {
        var actual = markdownParser.parse("something \n\n# Heading\n\n else.")
        var expected = '<p>something </p>\n<h1 id=\"heading\">Heading</h1>\n<p>else.</p>'
        expect(actual).toEqual(expected)
    })
})

describe("> Quote", () => {
    it("should convert a single quote element", () => {
        var actual = markdownParser.parse("> A Quote")
        var expected = '<blockquote>\n  <p>A Quote</p>\n</blockquote>'
        expect(actual).toEqual(expected)
    })
    it("should convert a multiline quote element", () => {
        var actual = markdownParser.parse("> A Quote\ncontinued")
        var expected = '<blockquote>\n  <p>A Quote\n  continued</p>\n</blockquote>'
        expect(actual).toEqual(expected)
    })
    it("should convert a quote element between other elements", () => {
        var actual = markdownParser.parse("something\n\n> A Quote\n\nelse")
        var expected = '<p>something</p>\n<blockquote>\n  <p>A Quote</p>\n</blockquote>\n<p>else</p>'
        expect(actual).toEqual(expected)
    })
})

describe("- Bullets", () => {
    it("should convert a single bullet element", () => {
        var actual = markdownParser.parse("- Bullets")
        var expected = '<ul>\n<li>Bullets</li>\n</ul>'
        expect(actual).toEqual(expected)
    })
    it("should convert multiple bullet elements", () => {
        var actual = markdownParser.parse("- Bullet 1 \n- Bullet 2 \n- Bullet 3")
        var expected = '<ul>\n<li>Bullet 1 </li>\n<li>Bullet 2 </li>\n<li>Bullet 3</li>\n</ul>'
        expect(actual).toEqual(expected)
    })
    it("should convert multiple bullet elements between other elements", () => {
        var actual = markdownParser.parse("something\n\n- Bullet 1 \n- Bullet 2 \n- Bullet 3\n\nelse")
        var expected = '<p>something</p>\n<ul>\n<li>Bullet 1 </li>\n<li>Bullet 2 </li>\n<li>Bullet 3</li>\n</ul>\n<p>else</p>'
        expect(actual).toEqual(expected)
    })
})

describe("* Bullets", () => {
    it("should convert a single bullet element", () => {
        var actual = markdownParser.parse("* Bullets")
        var expected = '<ul>\n<li>Bullets</li>\n</ul>'
        expect(actual).toEqual(expected)
    })
    it("should convert multiple bullet elements", () => {
        var actual = markdownParser.parse("* Bullet 1 \n* Bullet 2 \n* Bullet 3")
        var expected = '<ul>\n<li>Bullet 1 </li>\n<li>Bullet 2 </li>\n<li>Bullet 3</li>\n</ul>'
        expect(actual).toEqual(expected)
    })
    it("should convert multiple bullet elements between other elements", () => {
        var actual = markdownParser.parse("something\n\n* Bullet 1 \n* Bullet 2 \n* Bullet 3\n\nelse")
        var expected = '<p>something</p>\n<ul>\n<li>Bullet 1 </li>\n<li>Bullet 2 </li>\n<li>Bullet 3</li>\n</ul>\n<p>else</p>'
        expect(actual).toEqual(expected)
    })
})

describe("1. List", () => {
    it("should convert a single list element", () => {
        var actual = markdownParser.parse("1. List")
        var expected = '<ol>\n<li>List</li>\n</ol>'
        expect(actual).toEqual(expected)
    })
    it("should convert multiple list elements starting at one", () => {
        var actual = markdownParser.parse("1. Item 1 \n2. Item 2 \n3. Item 3")
        var expected = '<ol>\n<li>Item 1 </li>\n<li>Item 2 </li>\n<li>Item 3</li>\n</ol>'
        expect(actual).toEqual(expected)
    })
    it("should convert multiple list elements not starting at one", () => {
        var actual = markdownParser.parse("3. Item 3 \n4. Item 4 \n5. Item 5")
        var expected = '<ol start=\"3\">\n<li>Item 3 </li>\n<li>Item 4 </li>\n<li>Item 5</li>\n</ol>'
        expect(actual).toEqual(expected)
    })
    it("should convert multiple list elements between other elements", () => {
        var actual = markdownParser.parse("something\n\n1. Item 1 \n2. Item 2 \n3. Item 3\n\nelse")
        var expected = '<p>something</p>\n<ol>\n<li>Item 1 </li>\n<li>Item 2 </li>\n<li>Item 3</li>\n</ol>\n<p>else</p>'
        expect(actual).toEqual(expected)
    })
})

describe("complicated text", () => {
    it("should get all the formating", () => {
        var actual = markdownParser.parse("# so this is a heading\n\nand some **bold** and _cursive_ content\n\nand more.\n\n> here is a\nmultiline quote now.\n\nsome more text and:\n\n- some bullets\n- and more bullets\n- and more")
        var expected = '<h1 id=\"sothisisaheading\">so this is a heading</h1>\n<p>and some <strong>bold</strong> and <em>cursive</em> content</p>\n<p>and more.</p>\n<blockquote>\n  <p>here is a\n  multiline quote now.</p>\n</blockquote>\n<p>some more text and:</p>\n<ul>\n<li>some bullets</li>\n<li>and more bullets</li>\n<li>and more</li>\n</ul>'
        expect(actual).toEqual(expected)
    })
})
