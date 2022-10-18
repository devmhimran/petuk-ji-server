
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var cors = require('cors')

app.use(cors())
app.use(express.json())
require('dotenv').config()


app.get('/', (req, res) => {
  res.send('Welcome to Petuk Ji Server')
})

app.post('/contact-form', (req, res) =>{
    const formData = req.body;
    console.log(formData)
    res.send(formData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})