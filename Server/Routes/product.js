const Product = require('../models/Product');
const Boutique = require('../models/Boutique');
const { verifyTokenAndAdminOrManager, verifyTokenAndisAdmin} = require('./verifyToken')
const router = require("express").Router();



//CREATE
router.post('/add', verifyTokenAndAdminOrManager, async (req, res) => { 
    try {
        const Newstore = await Boutique.findOneAndUpdate( 
                            { _id: req.body.StoreId }, 
                            { $inc : {'Nb_products' : 1}},
                            );

        if(Newstore == null){
            return res.status(404).json("Store Not Found");
        }
        
        const newProduct =  new Product(req.body);
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
        const produit = await Product.findById(req.params.id)
        if(produit == null){
            return res.status(404).json('Product Not Found')
        }
        const Newstore = await Boutique.findOneAndUpdate( 
                 { _id: produit.StoreId._id }, 
                 { $inc : {'Nb_products' : -1}},
             );
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
        const produits = await Product.find().populate('categories')
        return res.status(200).json(produits)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//GET ALL Products By Store
router.get('/ByStore/:id' , async (req, res) => { 
    try {
        const produits = await Product.find({StoreId : req.params.id}).populate('categories');
    
        if(produits == null){
            return res.status(404).json('Data Not Found');  
        }
        return res.status(200).json(produits);
    } catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router;



