const Image = require('./../models/image');
var fs = require('fs');
var path = require('path');

module.exports = async function imageUpload(req, res){
  try{
    var img=fs.readFileSync(path.join(__dirname+ '/./../'+ req.file.path));
    var encoded_image=img.toString('base64')
    const image = new Image({
      name: req.file.filename,
      postedBy: req.userData._id,
      img: {
        contentType: 'image/png',
        data: new Buffer.from(encoded_image, 'base64')
      }
    })
    image.save()
    .then(()=>{
      // buff = image.img.data
      return res.status(201).json({
        message: "Image uploaded successfully"
      })
    })
    .catch((err)=>{
      console.log(err)
      return res.status(500).json({
        error: true
      })
    })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true
    })
  }
}
