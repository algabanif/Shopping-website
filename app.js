const express = require('express')
const app = express()
const port = 3004
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.sendFile("Home/index.html" , {root: __dirname})
})


//Error link 
app.use((req,res) => {
  res.status(404).send(" - Sorry can't find this page (404 Error) ")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// 1st run this file then run DB 