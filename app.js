const express = require('express')
const app = express()
const port = 3004
app.set('view engine', 'ejs')
app.use(express.static('public'))

//for auto refresh 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => { 
  setTimeout(() => {
    liveReloadServer.refresh("/"); 
  }, 100); 
});
//End refresh




//Routing 
app.get('/', (req, res) => {
  res.render("home")
})
app.get('/home', (req, res) => {
  res.render("home")
})
app.get('/index', (req, res) => {
  res.render("home")
})
app.get('/Cart', (req, res) => {
  res.render("Cart")
})
app.get('/cartEmpty', (req, res) => {
  res.render("cartEmpty")
})
app.get('/category', (req, res) => {
  res.render("category")
})
app.get('/Admin', (req, res) => {
  res.render("Admin")
})
app.get('/profile', (req, res) => {
  res.render("profile")
})
app.get('/services', (req, res) => {
  res.render("services")
})
app.get('/signUp', (req, res) => {
  res.render("signUp")
})
app.use((req,res) => { //Error link 
  res.status(404).send(" - Sorry can't find this page (404 Error) ")
})
//End Routing 





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// 1st run this file then run DB 