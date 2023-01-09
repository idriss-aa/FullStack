const Categorie = require('../models/Categorie');
const { verifyTokenAndisAdmin} = require('./verifyToken')
const router = require("express").Router();


//CREATE
router.post('/add', verifyTokenAndisAdmin, async (req, res) => {
    const newCategorie =  new Categorie(req.body);
    try {
        const savedCategorie = await newCategorie.save();
        return res.status(200).json(savedCategorie);
    } catch (err) {
        return res.status(500).json(err);
    }
})



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


//DELETE
router.delete('/:id', verifyTokenAndisAdmin, async (req, res) => { 
    try {
        await Categorie.findByIdAndDelete(req.params.id)
        return res.status(200).json('Categorie has been deleted...')
    } catch (err) {
        return res.status(500).json(err)
    }
})

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


        if(categories == null){
            return res.status(404).json('Data Not Found');  
        }
        return res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router;
