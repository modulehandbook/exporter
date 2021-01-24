const DocxExporter = require('../../docx-exporter/docx-export')
const docxExporter = new DocxExporter()
const program = require('../data/program')

describe('docxExporter.generateProgramComponents', () => {
    it('generates the program info overview', () => {
        var programComponents = docxExporter.generateProgramComponents(program)
        expect(programComponents).toMatchSnapshot()
    })
})

describe('docxExporter.generateCourseComponents', () => {
    it('generates the course info pages', () => {
        var courseComponents = docxExporter.generateCourseComponents(program)
        expect(courseComponents).toMatchSnapshot()
    })
})
