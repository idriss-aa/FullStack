const Categorie = require('../models/Categorie');
const Boutique = require('../models/Boutique');
const { verifyTokenAndisAdmin} = require('./verifyToken')
const router = require("express").Router();

/**
   * @openapi
   * '/api/categorie/add':
   *  post:
   *     tags:
   *     - Categories
   *     summary: Add a Categorie
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AddCategorieInput'
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description : Store Not Found
   *       403:
   *         description : You are not alowed to do That !  
   */

//CREATE
router.post('/add', verifyTokenAndisAdmin, async (req, res) => {
    
    try {
        
        const store = await Boutique.findOneAndUpdate( 
            { _id: req.body.StoreId }, 
            { $inc : {'Nb_Categories' : 1}},
            );

            if(store == null){
                return res.status(404).json('Store Not Found')
            }    
            const newCategorie =  new Categorie(req.body);
            const savedCategorie = await newCategorie.save();
        return res.status(200).json(savedCategorie);
    } catch (err) {
        return res.status(500).json(err);
    }
})


/**
   * @openapi
   * '/api/categorie/{id}':
   *  put:
   *     tags:
   *     - Categories
   *     summary: Update a category
   *     parameters:
   *      - name: id
   *        description: The id of categorie
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AddCategorieInput'
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description : You are not alowed to do That !  
   *       404:
   *         description : Store Not Found  
   */

//UPDATE 
router.put('/:id', verifyTokenAndisAdmin, async (req, res) => {

    try {
        const updatedCategorie = await Categorie.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new: true }
     );
     return res.status(200).json(updatedCategorie);
    } catch (error) {
        return  res.status(500).json(err)
    }
});

/**
   * @openapi
   * '/api/categorie/{id}':
   *  delete:
   *     tags:
   *     - Categories
   *     summary: Delete a category
   *     parameters:
   *      - name: id
   *        description: The id of categorie
   *        required: true
   *     responses:
   *       200:
   *         description: Categorie has been deleted...
   *       403:
   *         description : You are not alowed to do That !  
   *       404:
   *         description : Store Not Found  
   */


//DELETE
router.delete('/:id', verifyTokenAndisAdmin, async (req, res) => { 
    try {
        await Categorie.findByIdAndDelete(req.params.id)
        return res.status(200).json('Categorie has been deleted...')
    } catch (err) {
        return res.status(500).json(err)
    }
})

 /**
   * @openapi
   * api/categorie/find/{id}:
   *  get:
   *     tags:
   *     - Categories
   *     summary: Get Categorie by id
   *     description: Get Categorie by id
   *     parameters:
   *       - name: id
   *         description: The id of categorie
   *         required: true
   *     responses:
   *       200:
   *         contents:
   *            application/json
   *         description: Get All users
   *       403:
   *         description : Categorie Not Found
   */

//GET CATEGORIE
router.get('/find/:id' , async (req, res) => { 
    try {
        const categorie = await Categorie.findById(req.params.id)
        if(categorie == null){
            return res.status(403).json('Erreur : Catégorie non trouvée')
        }
        return res.status(200).json(categorie)
    } catch (err) {
        res.status(500).json(err)
    }
})


/**
   * @openapi
   * '/api/categorie/':
   *  get:
   *     tags:
   *     - Categories
   *     summary: Get all categories
   *     responses:
   *       200:
   *         description: all categories
   */
//GET ALL CATEGORIES
router.get('/' , async (req, res) => { 
    try {
        const categories = await Categorie.find();
        return res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json(err)
    }
})


//GET ALL CATEGORIES By Store
router.get('/ByStore/:id', async (req, res) => { 
    try {
        const categories = await Categorie.find({StoreId : req.params.id});

        if(categories.length === 0){
            return res.status(404).json('Data Not Found');  
        }
        return res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router;
