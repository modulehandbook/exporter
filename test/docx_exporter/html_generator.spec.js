const HtmlGenerator = require('../../docx_exporter/html_generator')
const htmlGenerator = new HtmlGenerator()


describe('htmlGenerator.generateTable', () => {
    it('generates a table with 1 row, 2 cells', () => {
        var table = htmlGenerator.generateTable([['row1, cell1', 'row1, cell2']])
        expect(table).toMatchSnapshot()
    })

    it('generates a table with 1 row, 3 cells', () => {
        var table = htmlGenerator.generateTable([['row1, cell1', 'row1, cell2', 'row1, cell3']])
        expect(table).toMatchSnapshot()
    })

    it('generates a table with 2 rows, 2 cells', () => {
        var table = htmlGenerator.generateTable([['row1, cell1', 'row1, cell2'], ['row2, cell1', 'row2, cell2']])
        expect(table).toMatchSnapshot()
    })
})

describe('htmlGenerator.generatePageBreak', () => {
    it('generates a page break', () => {
        var actual = htmlGenerator.generatePageBreak()
        var expected = '<div class=\"page-break\" style=\"page-break-after: always\"></div>'
        expect(actual).toEqual(expected)
    })
})

describe('htmlGenerator.generateHeading', () => {
    it('generates a heading of level 1', () => {
        var actual = htmlGenerator.generateHeading('Heading 1', 1)
        var expected = '<h1 id="heading1">Heading 1</h1>'
        expect(actual).toEqual(expected)
    })

    it('generates a heading of level 2', () => {
        var actual = htmlGenerator.generateHeading('Heading 2', 2)
        var expected = '<h2 id="heading2">Heading 2</h2>'
        expect(actual).toEqual(expected)
    })

    it('generates a heading of level 3', () => {
        var actual = htmlGenerator.generateHeading('Heading 3', 3)
        var expected = '<h3 id="heading3">Heading 3</h3>'
        expect(actual).toEqual(expected)
    })

    it('generates a heading of level 4', () => {
        var actual = htmlGenerator.generateHeading('Heading 4', 4)
        var expected = '<h4 id="heading4">Heading 4</h4>'
        expect(actual).toEqual(expected)
    })

    it('generates a heading of level 5', () => {
        var actual = htmlGenerator.generateHeading('Heading 5', 5)
        var expected = '<h5 id="heading5">Heading 5</h5>'
        expect(actual).toEqual(expected)
    })
})

describe('htmlGenerator.generateHeadingWithText', () => {
    it('generates a heading 1 with a text', () => {
        var actual = htmlGenerator.generateHeadingWithText('Heading 1', 1, 'Text 1')
        var expected = '<h1 id="heading1">Heading 1</h1>\n    <p>Text 1</p>'
        expect(actual).toEqual(expected)
    })

    it('generates a heading 2 with a text', () => {
        var actual = htmlGenerator.generateHeadingWithText('Heading 2', 2, 'Text 2')
        var expected = '<h2 id="heading2">Heading 2</h2>\n    <p>Text 2</p>'
        expect(actual).toEqual(expected)
    })

    it('generates a heading 3 with a text', () => {
        var actual = htmlGenerator.generateHeadingWithText('Heading 3', 3, 'Text 3')
        var expected = '<h3 id="heading3">Heading 3</h3>\n    <p>Text 3</p>'
        expect(actual).toEqual(expected)
    })

    it('generates a heading 4 with a text', () => {
        var actual = htmlGenerator.generateHeadingWithText('Heading 4', 4, 'Text 4')
        var expected = '<h4 id="heading4">Heading 4</h4>\n    <p>Text 4</p>'
        expect(actual).toEqual(expected)
    })

    it('generates a heading 5 with a text', () => {
        var actual = htmlGenerator.generateHeadingWithText('Heading 5', 5, 'Text 5')
        var expected = '<h5 id="heading5">Heading 5</h5>\n    <p>Text 5</p>'
        expect(actual).toEqual(expected)
    })
})
