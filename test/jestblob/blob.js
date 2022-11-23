function runner()  {
  const buffer = "hallo"
const docx_blob = new Blob([buffer], {
  type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
});
console.log("blob: "+docx_blob);
console.log(docx_blob);
console.log("type: "+ docx_blob.type);

console.log("prototype:")
console.log(Object.getPrototypeOf(docx_blob))
console.log("properties:")
console.log(Object.getOwnPropertyNames(docx_blob))
console.log("type: "+docx_blob.type)
console.log("size: "+docx_blob.size)
console.log("slice: ")
console.log(docx_blob.slice)
console.log(docx_blob.slice(docx_blob.size))
// this will fail in jest
console.log("arrayBuffer: ")
console.log(docx_blob.arrayBuffer())
}
module.exports = runner;
