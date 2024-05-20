require('dotenv').config()
const express = require('express')

const app = express()

app.use('/api/v1/test', require('./routes/routes'))

app.use('*',(req, res, next) => {
    res.status(404);
    res.json({
      success: 0,
      message: "Not found"
    })
  })
  

const port = process.env.APP_PORT || 3000
app.listen(port, () => {
    console.log("Server up and running on port",port)
})