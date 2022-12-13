const Product = require('../models/Product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')
const router = require("express").Router();



//CREATE
router.post('/add', verifyToken, async (req, res) => {
    const newProduct =  new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE 
router.put('/:id', verifyToken, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new: true }
     );
     res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(err)
    }
});

//DELETE
router.delete('/:id', verifyToken, async (req, res) => { 
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted...')
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET CATEGORIE
router.get('/find/:id', verifyToken , async (req, res) => { 
    try {
        const produit = await Product.findById(req.params.id)
        
        res.status(200).json(produit)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL Products
router.get('/', verifyToken , async (req, res) => { 
    try {
        const produits = await Product.find();
        res.status(200).json(produits)
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router;



