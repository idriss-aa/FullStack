const Boutique = require('../models/Boutique');
const { verifyTokenAndAdminOrManager, verifyTokenAndisAdmin} = require('./verifyToken')
const router = require("express").Router();
const mongoose = require('mongoose');


//CREATE SHOP
router.post('/add', verifyTokenAndAdminOrManager, async (req, res) => {
    try {    
        const newBoutique =  new Boutique(req.body);
        const savedBoutique = await newBoutique.save();
        return res.status(200).json(savedBoutique);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//UPDATE SHOP
router.put('/edit/:id', verifyTokenAndAdminOrManager, async (req, res) => {

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

//GET SHOP by ID
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
        
        let page = -1;
        let limit = 100;

        if(req.query.page && req.query.limit){
            const page = parseInt(req.query.page) - 1 || 0;
            const limit = parseInt(req.query.limit) || 9999999999999;
        }
        const boutiques = await Boutique.find().skip(page * limit).limit(limit).sort({ updatedAt: -1 });;
        return res.status(200).json(boutiques)

    } catch (err) {
        return res.status(500).json(err)
    }
});





module.exports = router;
