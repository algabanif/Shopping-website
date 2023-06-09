var products = require('../models/products.model');
const { ObjectId } = require('mongodb');

const productsController = {};

productsController.addproduct = async (req, res) => {
    try {
        var obj = {
            productName: req.body.productName,
            description: req.body.description,
            quantity: req.body.quantity,
            status: req.body.status,
            category: req.body.category,
            type: req.body.type,
            // image: req.file.filename // Get the filename of the uploaded image from the req.file object
        };
        if (req.file) {
            obj.image = req.file.filename
           }
        let productsResult = await products.create(obj);

        if (productsResult._id) {
            res.status(200).send("Product added");
        } else {
            res.status(402).send("Error in insertion");
        }
    } catch (ex) {
        res.status(402).send("Something went wrong");
    }
};

productsController.getallproducts = async (req, res) => {
    try {
        let productsResult = await products.find({})
        if (productsResult && productsResult.length > 0) {
            res.status(200).send(productsResult)
        }
        else {
            res.status(201).send("Nothing found in the database")
        }
    } catch (ex) {
        res.status(402).send("Something went wrong")
    }
}

productsController.getproductbyid = async (req, res) => {
    try {
        let productsResult = await products.find({ _id: new ObjectId(req.params.id) })
        if (productsResult && productsResult.length > 0) {
            res.status(200).send(productsResult)
        }
        else {
            res.status(402).send("Nothing found in the database")
        }
    } catch (ex) {
        res.status(402).send("Something went wrong")
    }
}

productsController.editproduct = async (req, res) => {
    try {
        const obj = {
            productName: req.body.productName,
            description: req.body.description,
            quantity: req.body.quantity,
            status: req.body.status,
            category: req.body.category,
            type: req.body.type,
            // image: req.file.filename // Get the filename of the uploaded image from the req.file object
        };
        if (req.file) {
            obj.image = req.file.filename
           }
        const updateResult = await products.updateOne(
            { _id: new ObjectId(req.params.id) }, // Specify the document to update using its _id field
            { $set: obj } // Set the new values using the $set operator
        );
        if (updateResult.modifiedCount) {
            res.status(200).send("Updated Successfully");
        }
        else {
            res.status(201).send("Nothing Updated")
        }
    } catch (ex) {
        res.status(402).send("Something went wrong")
    }
}

productsController.deleteproduct = async (req, res) => {
    try {
        let deleteResult = await products.deleteOne({ _id: new ObjectId(req.params.id) })
        if (deleteResult && deleteResult.deletedCount == 1) {
            res.status(200).send("Deleted Successfully");
        }
        else {
            res.status(402).send("Nothing Deleted")
        }

    } catch (ex) {
        res.status(402).send("Something went wrong")
    }
}

module.exports = productsController;