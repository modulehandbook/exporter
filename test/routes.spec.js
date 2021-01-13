const request = require('supertest')
const app = require('../app')
const program = require('./data/program')

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
})
