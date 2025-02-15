if(!process.env.NODE_ENV || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test' ){
  require('dotenv').config()
}

const express = require("express")
const app = express()
const cors = require('cors')
const PORT = 3000
const route = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect(`mongodb://localhost/eCom-${process.env.NODE_ENV}`,{useNewUrlParser : true}, function (err) {
  if (err) console.log('connection to db failed')
  else {
    console.log(`connection to db eCom-${process.env.NODE_ENV} success`)
  }
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',route)
app.use(errorHandler)

app.listen(PORT, ()=>{
  console.log(`listening to port: ${PORT}`);
})

module.exports = app