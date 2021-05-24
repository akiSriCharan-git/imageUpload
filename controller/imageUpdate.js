const Image = require('./../models/image');
var fs = require('fs');
var path = require('path');

module.exports = async function imageUpdate(req, res){
  try{
    const image = await Image.findOne({_id: req.params.imageId, postedBy: req.userData._id})
    if(image){
      var img=fs.readFileSync(path.join(__dirname+ '/./../'+ req.file.path));
      var encoded_image=img.toString('base64')
      const update = await Image.updateOne(
        {_id: req.params.imageId, postedBy: req.userData._id},
        {name: req.file.filename, img: {contentType: 'image/png', data: new Buffer.from(encoded_image, 'base64')}}
      )
      .then(()=>{
        return res.status(201).json({
          message: "Image updated successfully"
        })
      })
      .catch((err)=>{
        console.log(err)
        return res.status(500).json({
          error: true
        })
      })
    }else{
      return res.status(400).json({
        message: 'No image with that provided imageId in your image'
      })
    }

  }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true
    })
  }
}
