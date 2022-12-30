const Boutique = require('../models/Boutique');
const { verifyTokenAndAdminOrManager, verifyTokenAndisAdmin} = require('./verifyToken')
const router = require("express").Router();


//CREATE SHOP
router.post('/add', verifyTokenAndAdminOrManager, async (req, res) => {
    const newBoutique =  new Boutique(req.body);
    try {
        const savedBoutique = await newBoutique.save();
        return res.status(200).json(savedBoutique);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//UPDATE SHOP
router.put('/:id', verifyTokenAndAdminOrManager, async (req, res) => {

    try {
        const updatedBoutique = await Boutique.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new: true }
     );
     return res.status(200).json(updatedBoutique);
    } catch (error) {
        return res.status(500).json(err)
    }
});


//DELETE SHOP
router.delete('/:id', verifyTokenAndAdminOrManager, async (req, res) => { 
    try {
        await Boutique.findByIdAndDelete(req.params.id)
        return res.status(200).json('Store has been deleted...')
    } catch (err) {
        return res.status(500).json(err)
    }
});

//GET SHOPS
router.get('/find/:id', async (req, res) => { 
    try {
        const boutique = await Boutique.findById(req.params.id)
        if(boutique == null){
            return res.status(403).json('Erreur : Catégorie non trouvée')
        }
        return res.status(200).json(boutique)
    } catch (err) {
        return res.status(500).json(err)
    }
});

//GET ALL SHOPS
router.get('/', async (req, res) => { 
    try {
        if(){
            const page = parseInt(req.query.page) - 1 || 0;
            const limit = parseInt(req.query.limit) || 9999999999999;
        }
        console.log("aalo")
        console.log(page, limit)
        const boutiques = await Boutique.find().skip(page * limit).limit(limit);
        return res.status(200).json(boutiques)
    } catch (err) {
        return res.status(500).json(err)
    }
});





module.exports = router;
