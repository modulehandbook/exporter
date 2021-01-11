const Docx = require('docx')

// **Bold**, -> strong
// _Cursive_, -> em
// Links: [LinkTarget](LinkAlt), -> link
// # / ======= Headings, -> heading
// > Quote, -> blockQuote
// * / - Bullets, -> list, ordered: false
// 1. Numbered List, -> list, ordered: true



new TextRun({
  text: "Foo Bar",
  bold: true,
})

// describe("**Bold**", () => {
//     it("should convert a single bold element", () => {
//         var actual = mdParse("**Something Bold**")
//         var expected = [{"content": [{"content": [{"content": "Something Bold", "type": "text"}], "type": "strong"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert a bold element between other elements", () => {
//         var actual = mdParse("something **Something Bold** else.")
//         var expected = [{"content": [{"content": "something ", "type": "text"}, {"content": [{"content": "Something Bold", "type": "text"}], "type": "strong"}, {"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
//

new TextRun({
  text: "Foo Bar",
  italics: true,
})

// describe("_Cursive_", () => {
//     it("should convert a single cursive element", () => {
//         var actual = mdParse("_Something Cursive_")
//         var expected = [{"content": [{"content": [{"content": "Something Cursive", "type": "text"}], "type": "em"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert a cursive element between other elements", () => {
//         var actual = mdParse("something _Something Cursive_ else.")
//         var expected = [{"content": [{"content": "something ", "type": "text"}, {"content": [{"content": "Something Cursive", "type": "text"}], "type": "em"}, {"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
//

//nothing usable?!

// describe("Links - [LinkTarget](LinkAlt)", () => {
//     it("should convert a single link element", () => {
//         var actual = mdParse("[LinkTarget](LinkAlt)")
//         var expected = [{"content": [{"content": [{"content": "LinkTarget", "type": "text"}], "target": "LinkAlt", "title": undefined, "type": "link",}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert a link element between other elements", () => {
//         var actual = mdParse("something [LinkTarget](LinkAlt) else.")
//         var expected = [{"content": [{"content": "something ", "type": "text"}, {"content": [{"content": "LinkTarget", "type": "text"}], "target": "LinkAlt", "title": undefined, "type": "link",}, {"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
//

new docx.Paragraph({
  text: program_data.name,
  heading: docx.HeadingLevel.HEADING_1,
})
// describe("Headings Level 1 \n=====", () => {
//     it("should convert a single heading element", () => {
//         var actual = mdParse("Heading\n=====")
//         var expected = [{"content": [{"content": "Heading", "type": "text"}], "level": 1, "type": "heading"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert a heading element between other elements", () => {
//         var actual = mdParse("something \n\nHeading\n=====\n\n else.")
//         var expected = [{"content": [{"content": "something ", "type": "text"}], "type": "paragraph"}, {"content": [{"content": "Heading", "type": "text"}], "level": 1, "type": "heading"}, {"content": [{"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
//
// describe("# Headings Level 1", () => {
//     it("should convert a single heading element", () => {
//         var actual = mdParse("# Heading")
//         var expected = [{"content": [{"content": "Heading", "type": "text"}], "level": 1, "type": "heading"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert a heading element between other elements", () => {
//         var actual = mdParse("something \n\n# Heading\n\n else.")
//         var expected = [{"content": [{"content": "something ", "type": "text"}], "type": "paragraph"}, {"content": [{"content": "Heading", "type": "text"}], "level": 1, "type": "heading"}, {"content": [{"content": " else", "type": "text"}, {"content": ".", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
//

new TextRun({
  text: "Foo Bar",
  italics: true,
  indent: new Indent(720, 260),
})

// describe("> Quote", () => {
//     it("should convert a single quote element", () => {
//         var actual = mdParse("> A Quote")
//         var expected = [{"content": [{"content": [{"content": "A Quote", "type": "text"}], "type": "paragraph"}], "type": "blockQuote"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert a multiline quote element", () => {
//         var actual = mdParse("> A Quote\ncontinued")
//         var expected = [{"content": [{"content": [{"content": "A Quote\ncontinued", "type": "text"}], "type": "paragraph"}], "type": "blockQuote"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert a quote element between other elements", () => {
//         var actual = mdParse("something\n> A Quote\n\nelse")
//         var expected = [{"content": [{"content": "something\n", "type": "text"}, {"content": "> A Quote", "type": "text"}], "type": "paragraph"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
//

new Paragraph({
    text: "Bullet points",
    bullet: {
        level: 0, //How deep you want the bullet to be
    },
})
//verschachtelte listen?


// describe("- Bullets", () => {
//     it("should convert a single bullet element", () => {
//         var actual = mdParse("- Bullets")
//         var expected = [{"items": [[{"content": "Bullets", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert multiple bullet elements", () => {
//         var actual = mdParse("- Bullet 1 \n- Bullet 2 \n- Bullet 3")
//         var expected = [{"items": [[{"content": "Bullet 1", "type": "text"}], [{"content": "Bullet 2", "type": "text"}], [{"content": "Bullet 3", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert multiple bullet elements between other elements", () => {
//         var actual = mdParse("something\n\n- Bullet 1 \n- Bullet 2 \n- Bullet 3\n\nelse")
//         var expected = [{"content": [{"content": "something", "type": "text"}], "type": "paragraph"}, {"items": [[{"content": "Bullet 1", "type": "text"}], [{"content": "Bullet 2", "type": "text"}], [{"content": "Bullet 3", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
//
// describe("* Bullets", () => {
//     it("should convert a single bullet element", () => {
//         var actual = mdParse("* Bullets")
//         var expected = [{"items": [[{"content": "Bullets", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert multiple bullet elements", () => {
//         var actual = mdParse("* Bullet 1 \n* Bullet 2 \n* Bullet 3")
//         var expected = [{"items": [[{"content": "Bullet 1", "type": "text"}], [{"content": "Bullet 2", "type": "text"}], [{"content": "Bullet 3", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert multiple bullet elements between other elements", () => {
//         var actual = mdParse("something\n\n* Bullet 1 \n* Bullet 2 \n* Bullet 3\n\nelse")
//         var expected = [{"content": [{"content": "something", "type": "text"}], "type": "paragraph"}, {"items": [[{"content": "Bullet 1", "type": "text"}], [{"content": "Bullet 2", "type": "text"}], [{"content": "Bullet 3", "type": "text" }]], "ordered": false, "start": undefined, "type": "list"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
//

//Pain in the...

// describe("1. List", () => {
//     it("should convert a single list element", () => {
//         var actual = mdParse("1. List")
//         var expected = [{"items": [[{"content": "List", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert multiple list elements starting at one", () => {
//         var actual = mdParse("1. Item 1 \n2. Item 2 \n3. Item 3")
//         var expected = [{"items": [[{"content": "Item 1", "type": "text"}], [{"content": "Item 2", "type": "text"}], [{"content": "Item 3", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert multiple list elements not starting at one", () => {
//         var actual = mdParse("3. Item 3 \n4. Item 4 \n5. Item 5")
//         var expected = [{"items": [[{"content": "Item 3", "type": "text"}], [{"content": "Item 4", "type": "text"}], [{"content": "Item 5", "type": "text" }]], "ordered": true, "start": 3, "type": "list"}]
//         expect(actual).toEqual(expected);
//     })
//     it("should convert multiple list elements between other elements", () => {
//         var actual = mdParse("something\n\n1. Item 1 \n2. Item 2 \n3. Item 3\n\nelse")
//         var expected = [{"content": [{"content": "something", "type": "text"}], "type": "paragraph"}, {"items": [[{"content": "Item 1", "type": "text"}], [{"content": "Item 2", "type": "text"}], [{"content": "Item 3", "type": "text" }]], "ordered": true, "start": 1, "type": "list"}, {"content": [{"content": "else", "type": "text"}], "type": "paragraph"}]
//         expect(actual).toEqual(expected);
//     })
// })
