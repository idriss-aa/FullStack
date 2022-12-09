const Boutique = require('../models/Boutique');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')
const router = require("express").Router();


//CREATE
router.post('/add', verifyToken, async (req, res) => {
    const newBoutique =  new Boutique(req.body);
    try {
        const savedBoutique = await newBoutique.save();
        res.status(200).json(savedBoutique);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE 
router.put('/:id', verifyToken, async (req, res) => {

    try {
        const updatedBoutique = await Boutique.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new: true }
     );
     res.status(200).json(updatedBoutique);
    } catch (error) {
        res.status(500).json(err)
    }
});


//DELETE
router.delete('/:id', verifyToken, async (req, res) => { 
    try {
        await Boutique.findByIdAndDelete(req.params.id)
        res.status(200).json('Store has been deleted...')
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET CATEGORIE
router.get('/find/:id', verifyToken , async (req, res) => { 
    try {
        const boutique = await Boutique.findById(req.params.id)
        
        res.status(200).json(boutique)
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL CATEGORIES
router.get('/', verifyToken , async (req, res) => { 
    try {
        const boutiques = await Boutique.find();
        res.status(200).json(boutiques)
    } catch (err) {
        res.status(500).json(err)
    }
});



module.exports = router;
