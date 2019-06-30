module.exports = function(err,req,res,next){
  if (err.name === 'ValidationError') {
    if (err.message.slice(0,4) === 'user') {
      let error = err.message.slice(24).split(': ')[1]
      console.log(error)
      res.status(400).json({msg: error})
    }
    if (err.message.slice(0,7) === 'product') {
      let error = err.message.slice(27).split(': ')[1]
      console.log(error)
      res.status(400).json({msg: error})
    }
  } else {
    console.log(err)
    const status = err.code || 500
    const message = err.msg || 'internal server error'
    res.status(status).json({
        msg : message
    })
  }
}