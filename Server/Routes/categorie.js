const Categorie = require('../models/Categorie');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')
const router = require("express").Router();


//CREATE
router.post('/add', verifyToken, async (req, res) => {
    const newCategorie =  new Categorie(req.body);
    try {
        const savedCategorie = await newCategorie.save();
        res.status(200).json(savedCategorie);
    } catch (err) {
        res.status(500).json(err);
    }
})



//UPDATE 
router.put('/:id', verifyToken, async (req, res) => {

    try {
        const updatedCategorie = await Categorie.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new: true }
     );
     res.status(200).json(updatedCategorie);
    } catch (error) {
        res.status(500).json(err)
    }
});


//DELETE
router.delete('/:id', verifyToken, async (req, res) => { 
    try {
        await Categorie.findByIdAndDelete(req.params.id)
        res.status(200).json('Categorie has been deleted...')
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET CATEGORIE
router.get('/find/:id', verifyToken , async (req, res) => { 
    try {
        const categorie = await Categorie.findById(req.params.id)
        
        res.status(200).json(categorie)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL CATEGORIES
router.get('/', verifyToken , async (req, res) => { 
    try {
        const categories = await Categorie.find();
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
