const docx = require('docx')


module.exports = {
    generate_header: (program_data, name, code) => {
      console.log('in generate_header');
      console.log(program_data);
      console.log(name);
      console.log(code);
      const header = {
        default: new docx.Header({
          children: [
            new docx.Paragraph({
              style: 'Header',
              children: [
                new docx.TextRun( 'Module Descriptions GIU, ' + name + ' [' + code + ']'),
              ],
            }),
          ],
        }),
      }
      return header
    },
    generate_footer: (program_data) => {
      const footer = {
        default: new docx.Footer({
          children: [
            new docx.Paragraph({
              alignment: docx.AlignmentType.CENTER,
              style: 'Footer',
              children: [
                new docx.TextRun({
                  children: ['Page ', docx.PageNumber.CURRENT],
                }),
                new docx.TextRun({
                  children: [' of ', docx.PageNumber.TOTAL_PAGES],
                }),
              ],
            }),
          ],
        }),
      }
      return footer
    },
    generate_program_infos: (program_data) => {
      const program_infos = [
        new docx.Paragraph({
          text: program_data.name,
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          text: 'Program Infos',
          heading: docx.HeadingLevel.HEADING_3,
        }),
        new docx.Table({
          width: {
            size: 100,
            type: docx.WidthType.PERCENTAGE,
          },
          rows: [
            new docx.TableRow({
              children: [
                new docx.TableCell({
                  children: [new docx.Paragraph(' Code')],
                }),
                new docx.TableCell({
                  children: [new docx.Paragraph(program_data.code === null ? '' : program_data.code)],
                }),
              ],
            }),

            new docx.TableRow({
              children: [
                new docx.TableCell({
                  children: [new docx.Paragraph(' Degree')],
                }),
                new docx.TableCell({
                  children: [new docx.Paragraph(program_data.degree === null ? '' : program_data.degree)],
                }),
              ],
            }),

            new docx.TableRow({
              children: [
                new docx.TableCell({
                  children: [new docx.Paragraph(' ECTS')],
                }),
                new docx.TableCell({
                  children: [new docx.Paragraph('' + program_data.ects)],
                }),
              ],
            }),

            new docx.TableRow({
              children: [
                new docx.TableCell({
                  children: [new docx.Paragraph(' Mission')],
                }),
                new docx.TableCell({
                  children: [new docx.Paragraph(program_data.mission === null ? '' : program_data.mission)],
                }),
              ],
            }),

          ],
        }),
        new docx.Paragraph({
          children: [new docx.PageBreak()],
        }),
      ]
      return program_infos
    },
    generate_toc: () => {
      const toc = [
        new docx.Paragraph({
          text: 'Courses',
          heading: docx.HeadingLevel.HEADING_3,
        }),
        new docx.TableOfContents('Courses', {
        hyperlink: true,
        headingStyleRange: '2-2',
        }),
        new docx.Paragraph({
          children: [new docx.PageBreak()],
        }),
      ]
      return toc
    }
  }
