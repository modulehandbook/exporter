const DocxGeneratorProxy = require('./docx_generator_proxy')
const MarkdownParserProxy = require('./markdown_parser_proxy')
const HtmlGenerator = require('./html_generator');
const ExportHelper = require('../helper/export_helper')


class DocxExporter {
  constructor() {
    this.docxGenerator = new DocxGeneratorProxy()
    this.markdownParser = new MarkdownParserProxy()
    this.htmlGenerator = new HtmlGenerator()
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

  exportCourse(filename, course_data, callBack) {
    // const doc = this.docxGenerator.generateDoc('./styles/docx/styles.xml', 'utf-8')
    const course_name_and_code = course_data.name + ' [' + course_data.code + ']'
    const header = '<p>Module Descriptions GIU, ' + course_name_and_code + '</p>'

    const course_infos = this.generateCourseInfos(course_data)

    const doc = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>${filename}</title>
        </head>
        <body>
        ${course_infos}
        </body>
    </html>`

    this.docxGenerator.saveFile(doc, header, filename, callBack)
  }

  generateProgramComponents(program_data) {
    const programHeading = this.htmlGenerator.generateHeading(program_data.name, 1)
    const programInfosHeading = this.htmlGenerator.generateHeading('Program Infos', 3)
    const programInfosTable = this.htmlGenerator.generateTable([
      ['Code', this.exportHelper.stringify(program_data.code)],
      ['Degree', this.exportHelper.stringify(program_data.degree)],
      ['ECTS', this.exportHelper.stringify(program_data.ects)],
    ])
    const missionHeading = this.htmlGenerator.generateHeading('Mission', 5)
    const missionText = this.markdownParser.parse(this.exportHelper.stringify(program_data.mission))

    const coursesHeading = this.htmlGenerator.generateHeading('List of Courses', 5)
    var listOfCourses = []
    const courses = program_data.courses
    for(var i = 0; i < courses.length; i++) {
      listOfCourses.push([
        this.exportHelper.stringify(courses[i].code),
        this.exportHelper.stringify(courses[i].name),
        this.exportHelper.stringify(courses[i].responsible_person)
      ])
    }
    const coursesTable = this.htmlGenerator.generateTable(listOfCourses)

    return `${programHeading}
    ${programInfosHeading}
    ${programInfosTable}
    ${missionHeading}
    ${missionText}
    ${coursesHeading}
    ${coursesTable}
    ${this.htmlGenerator.generatePageBreak()}`
  }

  generateCourseComponents(program_data) {
    var all_course_infos = ''
    const courses = program_data.courses // TODO: anpassen für kurse ohne programs
    for(var i = 0; i < courses.length; i++) {
      const course_infos = this.generateCourseInfos(courses[i])
      all_course_infos = `
      ${all_course_infos}
      ${course_infos}
      `
    }
    return all_course_infos
  }

  generateCourseInfos(course_data) {
    const courseName = this.htmlGenerator.generateHeading(course_data.name, 2)
    const a_BasicInformation = this.htmlGenerator.generateHeading('A - Basic Information', 3)
    const lectureHrs = this.exportHelper.stringify(course_data.lectureHrs)
    const tutorialHrs = this.exportHelper.stringify(course_data.tutorialHrs)
    const labHrs = this.exportHelper.stringify(course_data.labHrs)
    const contactHours = lectureHrs + ' hrs Lecture/Week, ' + tutorialHrs + ' hrs Tutorial/Week, ' + labHrs + ' hrs Lab/Week'
    const a_basicsTable = this.htmlGenerator.generateTable([
        ['Semester', this.exportHelper.stringify(course_data.semester)],
        ['Year', this.exportHelper.stringify(Math.ceil(course_data.semester/2))],
        ['Code', this.exportHelper.stringify(course_data.code)],
        ['Type', this.exportHelper.stringify(course_data.required)],
        ['Weekly contact hours', contactHours],
        ['ECTS', this.exportHelper.stringify(course_data.ects)],
    ])
    const a_prerequisites = this.htmlGenerator.generateHeadingWithText('Prerequisites', 5, course_data.prerequisites)

    const b_professionalInformation = this.htmlGenerator.generateHeading('B - Professional Information', 3)
    const b_aimsHeading = this.htmlGenerator.generateHeading('Aims', 4)
    const b_mission = this.htmlGenerator.generateHeadingWithText('Mission', 5, course_data.mission)
    const b_objectives = this.htmlGenerator.generateHeadingWithText('Objectives', 5, course_data.objectives)
    const b_contents = this.htmlGenerator.generateHeadingWithText('Contents', 5, course_data.contents)

    const b_outcomes = this.htmlGenerator.generateHeadingWithText('Intended Learning Outcomes', 4, 'By the end of the course the student will have gained the following skills:')
    const b_skillsKU = this.htmlGenerator.generateHeadingWithText('Knowledge and Understanding', 5, course_data.skills_knowledge_understanding)
    const b_skillsIN = this.htmlGenerator.generateHeadingWithText('Intellectual Skills', 5, course_data.skills_intellectual)
    const b_skillsP = this.htmlGenerator.generateHeadingWithText('Professional and Practical Skills', 5, course_data.skills_practical)
    const b_skillsG = this.htmlGenerator.generateHeadingWithText('General and Transferrable Skills', 5, course_data.skills_general)

    const b_methods = this.htmlGenerator.generateHeadingWithText('Learning and Teaching Methods', 4, course_data.methods)

    const b_facilitiesHeading = this.htmlGenerator.generateHeading('Facilities required for teaching & learning', 4)
    const b_equipment = this.htmlGenerator.generateHeadingWithText('Equipment', 5, course_data.equipment)
    const b_rooms = this.htmlGenerator.generateHeadingWithText('Rooms', 5, course_data.room)

    const b_assessment = this.htmlGenerator.generateHeadingWithText('Assessment', 4, course_data.examination)
    const b_references = this.htmlGenerator.generateHeadingWithText('References', 4, course_data.literature)

    const c_administrativeInformation = this.htmlGenerator.generateHeading('C - Administrative Information', 3)
    const c_coordinatorHeading = this.htmlGenerator.generateHeading('Course Coordinator Contact Information', 4)
    const c_coordinatorTable = this.htmlGenerator.generateTable([
        ['Course Coordinator', this.exportHelper.stringify(course_data.responsible_person)],
        ['E-mail', '-'], //exportHelper.stringify(courses[i].mission)],
        ['Telephone', '-'], //exportHelper.stringify(courses[i].mission)],
        ['Extension', '-'], //exportHelper.stringify(courses[i].mission)],
    ])

    return `
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
      ${this.htmlGenerator.generatePageBreak()}
      `
  }
}

module.exports = DocxExporter
