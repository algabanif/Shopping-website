const express = require('express')
const app = express()
const DB = require('./DB')
const axios = require('axios');
const port = 3004
app.set('view engine', 'ejs')
const userRoutes = require('./public/routes/users.routes');
const productRoutes = require('./public/routes/products.routes');

app.use(express.static('public'))
app.use(express.json());
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
    axios.get('http://127.0.0.1:3004/product/getallproducts') // Make a GET request to the API endpoint
        .then(response => {
            const products = response.data; // Assuming the API returns an array of products
            res.render('home', { products });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
        });
    // res.render("home")

})

app.get('/home', (req, res) => {
    axios.get('http://127.0.0.1:3004/product/getallproducts') // Make a GET request to the API endpoint
        .then(response => {
            const products = response.data; // Assuming the API returns an array of products
            res.render('home', { products });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
        });
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
app.get('/addproduct', (req, res) => {
    res.render("addproduct")
})
app.get('/products', (req, res) => {
    axios.get('http://127.0.0.1:3004/product/getallproducts') // Make a GET request to the API endpoint
        .then(response => {
            const products = response.data; // Assuming the API returns an array of products
            res.render('products', { products });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
        });
})
app.get('/Admin', (req, res) => {
    axios.get('http://127.0.0.1:3004/product/getallproducts') // Make a GET request to the API endpoint
        .then(response => {
            const products = response.data; // Assuming the API returns an array of products
            res.render('Admin', { products });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
        });
    // res.render("Admin")
})
app.get('/profile', (req, res) => {
    res.render("profile")
})
app.get('/edit-product/:id', (req, res) => {
    const productId = req.params.id;
    // Call the getbyid API passing the productId
    // Handle the response and render the "editproduct" view with the data
    // Example of using Axios to make the API call
    axios.get(`http://127.0.0.1:3004/product/getproductbyid/${productId}`)
        .then(response => {
            const product = response.data[0];
            res.render("edit-product", { product });
        })
        .catch(error => {
            console.log("Error fetching product:", error);
            res.render("error");
        });
    // res.render("edit-product", { product });
});
app.get('/services', (req, res) => {
    res.render("services")
})
app.get('/signUp', (req, res) => {
    res.render("signUp")
})
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use((req, res) => { //Error link 
        res.status(404).send(" - Sorry can't find this page (404 Error) ")
    })
    //End Routing 





app.listen(port, () => {
        console.log(`Example app listening at http://127.0.0.1:${port}`)
    })