const DocxGeneratorProxy = require('./docx_generator_proxy')
const MarkdownParserProxy = require('./markdown_parser_proxy')
const ExportHelper = require('../helper/export_helper')


class DocxExporter {
  constructor() {
    this.docxGenerator = new DocxGeneratorProxy()
    this.markdownParser = new MarkdownParserProxy()
    this.exportHelper = new ExportHelper()
  }

  exportProgram(filename, program_data, callBack) {
    // const doc = this.docxGenerator.generateDoc('./styles/docx/styles.xml', 'utf-8')
    const program_name_and_code = program_data.name + ' [' + program_data.code + ']'
    const header = '<p>Module Descriptions GIU, ' + program_name_and_code + '</p>'

    const program_infos = this.generateProgramComponents(program_data)
    const course_infos = this.generateCourseComponents(program_data)

    const doc = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>${filename}</title>
        </head>
        <body>
        ${program_infos}
        ${course_infos}
        </body>
    </html>`

    this.docxGenerator.saveFile(doc, header, filename, callBack)
  }

  generateProgramComponents(program_data) {
    const programHeading = this.generateHeading(program_data.name, 1)
    const programInfosHeading = this.generateHeading('Program Infos', 3)
    const programInfosTable = this.generateTable([
      ['Code', this.exportHelper.stringify(program_data.code)],
      ['Degree', this.exportHelper.stringify(program_data.degree)],
      ['ECTS', this.exportHelper.stringify(program_data.ects)],
    ])
    const missionHeading = this.generateHeading('Mission', 5)
    const missionText = this.markdownParser.parse(this.exportHelper.stringify(program_data.mission))

    const listOfCoursesHeading = this.generateHeading('List of Courses', 5)
    var listOfCourses = '<ul>\n'
    const courses = program_data.courses
    for(var i = 0; i < courses.length; i++) {
      listOfCourses = listOfCourses + `<li>${courses[i].name}</li>\n`
    }
    listOfCourses = listOfCourses + '\n</ul>'

    return `${programHeading}
    ${programInfosHeading}
    ${programInfosTable}
    ${missionHeading}
    ${missionText}
    ${listOfCoursesHeading}
    ${listOfCourses}
    ${this.generatePageBreak()}`
  }

  generateCourseComponents(program_data) {
    var course_infos = ''
    const courses = program_data.courses
    for(var i = 0; i < courses.length; i++) {
      const courseName = this.generateHeading(courses[i].name, 2)
      const a_BasicInformation = this.generateHeading('A - Basic Information', 3)
      const a_basicsTable = this.generateTable([
        ['Semester', this.exportHelper.stringify(courses[i].semester)],
        ['Year', this.exportHelper.stringify(Math.ceil(courses[i].semester/2))],
        ['Code', this.exportHelper.stringify(courses[i].code)],
        ['Type', this.exportHelper.stringify(courses[i].required)],
        ['Weekly contact hours', this.exportHelper.stringify(courses[i].lectureHrs)],
        ['ECTS', this.exportHelper.stringify(courses[i].ects)],
      ])
      const a_prerequisites = this.generateHeadingWithText('Prerequisites', 5, courses[i].prerequisites)

      const b_professionalInformation = this.generateHeading('B - Professional Information', 3)
      const b_aimsHeading = this.generateHeading('Aims', 4)
      const b_mission = this.generateHeadingWithText('Mission', 5, courses[i].mission)
      const b_objectives = this.generateHeadingWithText('Objectives', 5, courses[i].objectives)
      const b_contents = this.generateHeadingWithText('Contents', 5, courses[i].contents)

      const b_outcomes = this.generateHeadingWithText('Intended Learning Outcomes', 4, 'By the end of the course the student will have gained the following skills:')
      const b_skillsKU = this.generateHeadingWithText('Knowledge and Understanding', 5, courses[i].skills_knowledge_understanding)
      const b_skillsIN = this.generateHeadingWithText('Intellectual Skills', 5, courses[i].skills_intellectual)
      const b_skillsP = this.generateHeadingWithText('Professional and Practical Skills', 5, courses[i].skills_practical)
      const b_skillsG = this.generateHeadingWithText('General and Transferrable Skills', 5, courses[i].skills_general)

      const b_methods = this.generateHeadingWithText('Learning and Teaching Methods', 4, courses[i].methods)

      const b_facilitiesHeading = this.generateHeading('Facilities required for teaching & learning', 4)
      const b_equipment = this.generateHeadingWithText('Equipment', 5, courses[i].equipment)
      const b_rooms = this.generateHeadingWithText('Rooms', 5, courses[i].room)

      const b_assessment = this.generateHeadingWithText('Assessment', 4, courses[i].examination)
      const b_references = this.generateHeadingWithText('References', 4, courses[i].literature)

      const c_administrativeInformation = this.generateHeading('C - Administrative Information', 3)
      const c_coordinatorHeading = this.generateHeading('Course Coordinator Contact Information', 4)
      const c_coordinatorTable = this.generateTable([
        ['Course Coordinator', '-'], //exportHelper.stringify(courses[i].mission)],
        ['E-mail', '-'], //exportHelper.stringify(courses[i].mission)],
        ['Telephone', '-'], //exportHelper.stringify(courses[i].mission)],
        ['Extension', '-'], //exportHelper.stringify(courses[i].mission)],
      ])

      course_infos = `
      ${course_infos}
      ${courseName}
      ${a_BasicInformation}
      ${a_basicsTable}
      ${a_prerequisites}
      ${b_professionalInformation}
      ${b_aimsHeading}
      ${b_mission}
      ${b_objectives}
      ${b_contents}
      ${b_outcomes}
      ${b_skillsKU}
      ${b_skillsIN}
      ${b_skillsP}
      ${b_skillsG}
      ${b_methods}
      ${b_facilitiesHeading}
      ${b_equipment}
      ${b_rooms}
      ${b_assessment}
      ${b_references}
      ${c_administrativeInformation}
      ${c_coordinatorHeading}
      ${c_coordinatorTable}
      ${this.generatePageBreak()}
      `
    }
    return course_infos
  }

  generateTable(contents) {
    var table = '<table style="width:100%">' // open table
    for (var i = 0; i < contents.length; i++) { // greate rows
      table = table + '\n<tr>'
      for (var j = 0; j < contents[i].length; j++) { // create cells
        table = `${table}
        <td>
          ${this.markdownParser.parse(contents[i][j])}
        </td>`
      }
      table = table + '\n</tr>' // end row
    }
    table = table + '\n</table>' // end table
    return table
  }

  generatePageBreak() {
    return '<div class="page-break" style="page-break-after: always"></div>'
  }

  generateHeading(text, level) {
   var heading = ''
   for (var i = 0; i < level; i++) {
     heading = heading + '#'
   }
   heading = `${heading} ${text}`
   return this.markdownParser.parse(heading)
  }

  generateHeadingWithText(headingText, level, text) {
    return `${this.generateHeading(headingText, level)}
    ${this.markdownParser.parse(this.exportHelper.stringify(text))}`
  }

}

module.exports = DocxExporter
