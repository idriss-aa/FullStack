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


module.exports = router;
