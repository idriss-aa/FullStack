const Product = require('../models/Product');
const Boutique = require('../models/Boutique');
const categorie = require('../models/Categorie');
const { verifyTokenAndAdminOrManager, verifyTokenAndisAdmin} = require('./verifyToken');
const Categorie = require('../models/Categorie');
const router = require("express").Router();


/**
   * @openapi
   * '/api/product/add':
   *  post:
   *     tags:
   *     - Product
   *     summary: Add a product
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AddProductInput'
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description : Store Not Found
   *       403:
   *         description : You are not alowed to do That !  
   */

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


/**
   * @openapi
   * '/api/product/{id}':
   *  put:
   *     tags:
   *     - Product
   *     summary: Update a Product
   *     parameters:
   *      - name: id
   *        description: The id of Product
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AddProductInput'
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description : You are not alowed to do That !  
   *       404:
   *         description : Store Not Found  
   */


//UPDATE 
router.put('/:id', verifyTokenAndAdminOrManager, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new: true }
     ).populate('categories');
     return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(err)
    }
});



/**
   * @openapi
   * '/api/product/{id}':
   *  delete:
   *     tags:
   *     - Product
   *     summary: Delete a product
   *     parameters:
   *      - name: id
   *        description: The id of product
   *        required: true
   *     responses:
   *       200:
   *         description: Product has been deleted...
   *       403:
   *         description : You are not alowed to do That !  
   *       404:
   *         description : Store Not Found  
   */
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

/**
   * @openapi
   * api/product/find/{id}:
   *  get:
   *     tags:
   *     - Product
   *     summary: Get Product by id
   *     description: Get Product by id
   *     parameters:
   *       - name: id
   *         description: The id of Product
   *         required: true
   *     responses:
   *       200:
   *         contents:
   *            application/json
   *         description: Get All Product
   *       403:
   *         description : Product Not Found
   */

//GET PRODUCT
router.get('/find/:id' , async (req, res) => { 
    try {
        const produit = await Product.findById(req.params.id).populate('categories')
        if(produit == null){
            return res.status(403).json('Erreur : Produit non trouvé')
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
        let match = {};
        match.StoreId = req.params.id;

        if (req.query.categorie){   
            const categorie = await Categorie.findOne({title : req.query.categorie});   
            match.categories = categorie._id
        } 

        const produits = await Product.find(match).populate('categories');    
        if(produits == null){
            return res.status(404).json('Data Not Found');  
        }
        return res.status(200).json(produits);
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router;



