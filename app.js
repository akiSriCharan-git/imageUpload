require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
var fs = require('fs');
var path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  console.log('Successfully connected to database')
})
.catch(err=>{
  console.log(err)
  console.log("Database connection error")
});

const User = require('./models/user');
const Image = require('./models/image');
const controller = require('./controller/user');
const verifyToken = require('./middleware/verifyToken');
const imageUpload = require('./controller/imageUpload')
const rest = require('./controller/rest');
const imageUpdate = require('./controller/imageUpdate');

app.post('/register', controller.Signup);
app.post('/login', controller.Login);
app.get('/hello', verifyToken, controller.Hello);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' +req.userData._id+ Date.now()+path.extname(file.originalname))
  }
});
var upload = multer({ storage: storage, limits: { fileSize: 500000 }  });

//create
app.post('/images', verifyToken, upload.single('image'), imageUpload);

//get
app.get('/images', verifyToken, rest.getAll);
app.get('/images/:imageId', verifyToken, rest.getOne);

//update
app.put('/images/:imageId', verifyToken, upload.single('image'), imageUpdate);

//delete
app.delete('/images', verifyToken, rest.deleteAll);
app.delete('/images/:imageId', verifyToken, rest.deleteOne);

const port = process.env.PORT || 8888
app.listen(port, ()=>{
  console.log('Server started on port ' + port)
});
