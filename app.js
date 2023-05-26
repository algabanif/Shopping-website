const express = require('express')
const app = express()
const port = 3004

app.get('/', (req, res) => {
  res.send('Saleh')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// 1st run this file then run DB 