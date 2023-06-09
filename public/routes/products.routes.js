const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization');
const adminCheck = require('../middlewares/admin-check');
const ProductController = require('./../controllers/products.controllers');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Specify the directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for the uploaded image
    }
});
const upload = multer({ storage: storage });

router.post('/addproduct',auth,adminCheck, upload.single('image'), ProductController.addproduct);
router.get('/getallproducts', ProductController.getallproducts);
router.get('/getproductbyid/:id', ProductController.getproductbyid);
router.put('/editproduct/:id',auth,adminCheck,upload.single('image'), ProductController.editproduct);
router.delete('/deleteproduct/:id',auth,adminCheck, ProductController.deleteproduct);

module.exports = router;
