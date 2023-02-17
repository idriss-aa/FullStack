const Boutique = require('../models/Boutique');
const { verifyTokenAndAdminOrManager, verifyTokenAndisAdmin} = require('./verifyToken')
const router = require("express").Router();
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken')

/**
   * @openapi
   * '/api/store/add':
   *  post:
   *     tags:
   *     - Store
   *     summary: Add a Store
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AddStoreInput'
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description : You are not alowed to do That !  
   */

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

/**
   * @openapi
   * '/api/store/edit/{id}':
   *  put:
   *     tags:
   *     - Store
   *     summary: Update a Store
   *     parameters:
   *      - name: id
   *        description: The id of Store
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AddStoreInput'
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description : You are not alowed to do That !  
   *       404:
   *         description : Store Not Found  
   */

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

/**
   * @openapi
   * '/api/store/{id}':
   *  delete:
   *     tags:
   *     - Store
   *     summary: Delete a store
   *     parameters:
   *      - name: id
   *        description: The id of Store
   *        required: true
   *     responses:
   *       200:
   *         description: Store has been deleted...
   *       403:
   *         description : You are not alowed to do That !  
   *       404:
   *         description : Store Not Found  
   */


//DELETE SHOP
router.delete('/:id', verifyTokenAndAdminOrManager, async (req, res) => { 
    try {
        await Boutique.findByIdAndDelete(req.params.id)
        return res.status(200).json('Store has been deleted...')
    } catch (err) {
        return res.status(500).json(err)
    }
});

 /**
   * @openapi
   * api/store/find/{id}:
   *  get:
   *     tags:
   *     - Store
   *     summary: Get store by id
   *     description: Get store by id
   *     parameters:
   *       - name: id
   *         description: The id of store
   *         required: true
   *     responses:
   *       200:
   *         contents:
   *            application/json
   *         description: Get store by id
   *       403:
   *         description : store Not Found
   */

//GET SHOP by ID
router.get('/find/:id', async (req, res) => { 
    try {
        const boutique = await Boutique.findById(req.params.id)
        if(boutique == null){
            return res.status(403).json('Erreur : boutique non trouvée')
        }
        return res.status(200).json(boutique)
    } catch (err) {
        return res.status(500).json(err)
    }
});

/**
   * @openapi
   * '/api/product/':
   *  get:
   *     tags:
   *     - Store
   *     summary: Get all Store
   *     responses:
   *       200:
   *         description: all Store
   */

//GET ALL SHOPS
router.get('/', async (req, res) => { 
   
    try { 

        let decoded ;
        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1];
            try {
                decoded = jwt.verify(authorization, process.env.JWT_SEC);
            } catch (e) {
                console.log(e)
            }
        } 
       
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
         obj[sort] = 1;

     
         if(decoded && decoded.isVendorDeliveryMan){
            match = {...match, CreatedBy: decoded.id }
         }

        const boutiques = await Boutique.find(match).sort(obj);
        return res.status(200).json(boutiques)
    } catch (err) {
        return res.status(500).json(err)
    }
});


module.exports = router;
