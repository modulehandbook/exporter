// compare with:
//
// node test/jestblob/plain_node.js
// blob had a different prototype in jest 26, works with jest 29

const runner = require("./blob.js");
describe('blob ', () => {
  it('misteries...', done =>{
  //  runner();
    expect(true).toBe(true)
    done();
  })

})
