const Image = require('./../models/image');

exports.getAll = async (req, res)=>{
  try{
    const image = await Image.find({postedBy: req.userData._id})
    console.log(image)
    return res.status(200).json(image)
  }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true
    })
  }
}

//getOne
exports.getOne = async (req, res)=>{
  try{
    const image = await Image.findOne({_id: req.params.imageId, postedBy: req.userData._id})
    if(image){
      return res.status(200).json(image)
    }else{
      return res.status(400).json({
        message: 'No image with that provided imageId in your image'
      })
    }
  }catch(err){
    console.log(err)
    return res.status(400).json({
      error: true,
      message: err.message
    })
  }
}

//delete all
exports.deleteAll = async (req, res)=>{
  try{
    const del = await Image.deleteMany({postedBy: req.userData._id});
    return res.status(200).json({
      message: "All images deleted"
    })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true,
      message: "deletion failed"
    })
  }
}

//delete one
exports.deleteOne = async (req, res)=>{
  try{
    const image = await Image.findOne({_id: req.params.imageId, postedBy: req.userData._id})
    if(image){
      const del = await Image.deleteOne({_id: req.params.imageId, postedBy: req.userData._id})
      .then(()=>{
        return res.status(200).json({
          message: "deleted successfully"
        })
      })
      .catch((err)=>{
        return res.status(500).json({
          error: true,
          message: "deletion failed"
        })
      })
      }else{
        return res.status(400).json({
          error: true,
          message: "No image with that provided imageId in your images"
        })
      }
    }catch(err){
    console.log(err)
    return res.status(500).json({
      error: true,
      message: "deletion failed"
    })
  }
}
