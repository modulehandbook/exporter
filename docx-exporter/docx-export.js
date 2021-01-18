const DocxGeneratorProxy = require('./docx_generator_proxy')
const MdDocxTranslator = require('./md_docx_translator')
const ExportHelper = require('../helper/export_helper')


class DocxExporter {
  constructor() {
    this.docxGenerator = new DocxGeneratorProxy()
    this.mdDocxTranslator = new MdDocxTranslator()
    this.exportHelper = new ExportHelper()
  }

  generateProgramComponents(program_data) {
    return [
      this.docxGenerator.generateHeading(program_data.name, 1),
      this.docxGenerator.generateHeading('Program Infos', 3),
      this.docxGenerator.generateTable([
        ['Code', this.exportHelper.stringify(program_data.code)],
        ['Degree', this.exportHelper.stringify(program_data.degree)],
        ['ECTS', this.exportHelper.stringify(program_data.ects)],
        ['Mission', this.exportHelper.stringify(program_data.mission)],
      ]),
      this.docxGenerator.generatePageBreak(),
    ]
  }

  generateCourseComponents(program_data) {
    var course_infos = []
    const courses = program_data.courses
    var i
    for(i = 0; i < courses.length; i++) {
      var course = [
        this.docxGenerator.generateHeading(courses[i].name, 2),
        this.docxGenerator.generateHeading('A - Basic Information', 3),
        this.docxGenerator.generateTable([
          ['Semester', this.exportHelper.stringify(courses[i].semester)],
          ['Year', this.exportHelper.stringify(Math.ceil(courses[i].semester/2))],
          ['Code', this.exportHelper.stringify(courses[i].code)],
          ['Type', this.exportHelper.stringify(courses[i].required)],
          ['Weekly contact hours', this.exportHelper.stringify(courses[i].lectureHrs)],
          ['ECTS', this.exportHelper.stringify(courses[i].ects)],
          ['Prerequisites', this.exportHelper.stringify(courses[i].prerequisites)],
        ]),

        this.docxGenerator.generateHeading('B - Professional Information', 3),
        this.docxGenerator.generateHeading('Aims', 4),
        this.docxGenerator.generateTable([
          ['Mission', this.exportHelper.stringify(courses[i].mission)], // translate
          ['Objectives', this.exportHelper.stringify(courses[i].objectives)], // translate
          ['Contents', this.exportHelper.stringify(courses[i].contents)], // translate
        ]),
        this.docxGenerator.generateHeading('Intended Learning Outcomes', 4),
        this.docxGenerator.generateParagraph('By the end of the course the student will have gained the following skills:'),
        this.docxGenerator.generateTable([
          ['Knowledge and Understanding', this.exportHelper.stringify(courses[i].skills_knowledge_understanding)], // translate
          ['Intellectual Skills', this.exportHelper.stringify(courses[i].skills_intellectual)], // translate
          ['Professional and Practical Skills', this.exportHelper.stringify(courses[i].skills_practical)], // translate
          ['General and Transferrable Skills', this.exportHelper.stringify(courses[i].skills_general)], // translate
        ]),
        this.docxGenerator.generateHeading('Learning and Teaching Methods', 4),
        this.docxGenerator.generateParagraph(this.exportHelper.stringify(courses[i].methods)), // translate

        this.docxGenerator.generateHeading('Facilities required for teaching & learning', 4),
        this.docxGenerator.generateTable([
          ['Equipment', this.exportHelper.stringify(courses[i].equipment)], // translate
          ['Rooms', this.exportHelper.stringify(courses[i].equipment)], // translate
        ]),
        this.docxGenerator.generateHeading('Assessment', 4),
        this.docxGenerator.generateParagraph(this.exportHelper.stringify(courses[i].examination)), // translate

        this.docxGenerator.generateHeading('References', 4),
        this.docxGenerator.generateParagraph(this.exportHelper.stringify(courses[i].literature)), // translate

        this.docxGenerator.generateHeading('C - Administrative Information', 3),
        this.docxGenerator.generateHeading('Course Coordinator Contact Information', 4),
        this.docxGenerator.generateTable([
          ['Course Coordinator', '-'], //exportHelper.stringify(courses[i].mission)],
          ['E-mail', '-'], //exportHelper.stringify(courses[i].mission)],
          ['Telephone', '-'], //exportHelper.stringify(courses[i].mission)],
          ['Extension', '-'], //exportHelper.stringify(courses[i].mission)],
        ]),
        this.docxGenerator.generatePageBreak(),
      ]
      course_infos = course_infos.concat(course)
    }
    return course_infos
  }

  exportProgram(filename, program_data, callBack) {
    // Create document
    const doc = this.docxGenerator.generateDoc('./styles/docx/styles.xml', 'utf-8')
    const program_name_and_code = program_data.name + ' [' + program_data.code + ']'
    const header = this.docxGenerator.generateHeader('Module Descriptions GIU, ' + program_name_and_code)
    const footer = this.docxGenerator.generateFooter()
    const toc = this.docxGenerator.generateTOC('Courses')

    const program_infos = this.generateProgramComponents(program_data)
    const course_infos = this.generateCourseComponents(program_data)
    const contents = program_infos.concat(toc.concat(course_infos))

    this.docxGenerator.assembleDocument(doc, header, footer, contents)
    this.docxGenerator.saveFile(doc, filename, callBack)
  }
}




module.exports = DocxExporter
