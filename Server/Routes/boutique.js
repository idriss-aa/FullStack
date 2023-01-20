const Boutique = require('../models/Boutique');
const { verifyTokenAndAdminOrManager, verifyTokenAndisAdmin} = require('./verifyToken')
const router = require("express").Router();
const mongoose = require('mongoose');
const moment = require('moment');



//CREATE SHOP
router.post('/add', verifyTokenAndAdminOrManager, async (req, res) => {
    try {    
        
        if(req.body.opening_hours.length != 7){
            return res.status(500).json('Les dates d\'ouvertures doivent contenir tous les jours de la semaine'); 
        }
        
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
        let match = {};
        if (req.query.isOpen){
            match.isOpen = req.query.isOpen ;
        } 
        if (req.query.title){
            match.title = req.query.title ;
        } 
        if(req.query.dateFrom){
            if(!match["CreationDate"]) match["CreationDate"] = {};
            let dateFrom = moment(new Date(req.query.dateFrom)).toDate();
            match["CreationDate"]['$gte'] = dateFrom;
        }

        if(req.query.dateTo){
           if(!match["CreationDate"]) match["CreationDate"] = {};
            let dateTo = moment(new Date(req.query.dateTo)).toDate();
            match["CreationDate"]['$lte'] = dateTo;
        }

         let sort = (req.query.sort == null) ? "createdAt" : req.query.sort;
         const obj = {}

        if(req.query.sort == title){
            obj[sort] = 1;
        }else{
            obj[sort] = -1;
        }


        



        const currentPage = req.query.currentPage;
        const pageSize = req.query.pageSize;
        const skip = pageSize * (currentPage - 1);
        const limit = pageSize;
        const boutiques = await Boutique.find(match).skip(skip).limit(limit).sort(obj);

        return res.status(200).json(boutiques)
    } catch (err) {
        return res.status(500).json(err)
    }
});


module.exports = router;
