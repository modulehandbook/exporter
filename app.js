const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
//const exporter = require('./exporter/docx_export')
const helmet = require('helmet')
const router = require('./router')

app.use(helmet())
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(express.json())

app.use(express.static(path.join(__dirname, '/files')))

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 1000000,
  extended: true
}))

// how to send file via attachment
// example from https://www.tutorialspoint.com/res-attachment-method-in-express-js
// With middleware
app.use('/atta', function(req, res, next){
   res.attachment('tutorialspoint.txt');
   console.log(res.get('Content-Disposition'));
   next();
})
app.get('/atta', function(req, res){
   console.log('Attachment Added');
   res.send("Attachment Added");
});

app.use("/", router);


module.exports = app
