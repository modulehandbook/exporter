const request = require('supertest')
const app = require('../app')
const program = require('./data/program')
const course = require('./data/course')

describe('GET', () => {
  it('/ has status ok', done => {
    request(app)
      .get('/')
      .then((res) => {
        expect(res.statusCode).toBe(200)
  			done()
    })
  })
  it('/ has expected text', done => {
    request(app)
      .get('/')
      .then((res) => {
  			expect(res.text).toContain('Hello World! The exporter is alive and well.')
  			done()
    })
  })
  it('/docx/demo_program has status ok', done => {
    request(app)
      .get('/docx/program/demo')
      .then((res) => {
  			expect(res.statusCode).toBe(200)
  			done()
    })
  })
  it('/docx/demo_course has status ok', done => {
      request(app)
          .get('/docx/course/demo')
          .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
})

describe('POST', () => {
    it('/docx/program has status ok', done => {

        request(app)
            .post('/docx/program')
            .send(program)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
    // it('/ has expected text', done => {
    //   request(app)
    //     .get('/')
    //     .then((res) => {
    // 			expect(res.text).toContain('Hello World! The exporter is alive and well.')
    // 			done()
    //   })
    // })
    it('/docx/course has status ok', done => {
        request(app)
            .post('/docx/course')
            .send(course)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
})
