const express = require('express')
const app = express()
const port = 3004
app.set('view engine', 'ejs')

//for auto refresh 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'pubplic'));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => { setTimeout(() => { liveReloadServer.refresh("/"); }, 100); })
//End refresh

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