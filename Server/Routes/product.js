const Product = require('../models/Product');
const Boutique = require('../models/Boutique');
const { verifyTokenAndAdminOrManager, verifyTokenAndisAdmin} = require('./verifyToken')
const router = require("express").Router();



//CREATE
router.post('/add', verifyTokenAndAdminOrManager, async (req, res) => {
    const newProduct =  new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
});


//UPDATE 
router.put('/:id', verifyTokenAndAdminOrManager, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new: true }
     );
     return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(err)
    }
});

//DELETE
router.delete('/:id', verifyTokenAndAdminOrManager, async (req, res) => { 
    try {
        await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json('Product has been deleted...')
    } catch (err) {
        return res.status(500).json(err)
    }
});

//GET PRODUCT
router.get('/find/:id' , async (req, res) => { 
    try {
        const produit = await Product.findById(req.params.id)
        if(produit == null){
            return res.status(403).json('Erreur : Catégorie non trouvée')
        }
        return res.status(200).json(produit)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//GET ALL Products
router.get('/' , async (req, res) => { 
    try {
        const produits = await Product.find();
        return res.status(200).json(produits)
    } catch (err) {
        return res.status(500).json(err)
    }
})



//GET ALL Products By Store
router.get('/ByStore/:id' , async (req, res) => { 
    try {
        const produits = await Product.find({StoreId : req.params.id});

        if(produits.length === 0){
            return res.status(404).json('Data Not Found');  
        }
        return res.status(200).json(produits)
    } catch (err) {
        return res.status(500).json(err)
    }
})





//SORT PRODUCTS 
router.get('/sort' , async (req, res) => { 
    try {
        const by = req.query.by
        console.log(typeof(by))
        const SortBy = { by : -1 };
        const produits = await Product.find().sort({by : 1});
       /* if(by){
            console.log(by)
            produits = await Product.find().sort({"title":-1});
            console.log(produits)
        }*/
        return res.status(200).json(produits)
    } catch (err) {
        return res.status(500).json(err)
    }
})




module.exports = router;



