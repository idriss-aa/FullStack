const User = require('../models/User');
const {verifyTokenAndisAdmin, verifyToken, verifyTokenAndisAdminOrSameUser} = require('./verifyToken')
const router = require("express").Router();


//UPDATE
router.put('/:id' , verifyTokenAndisAdminOrSameUser ,async (req, res) => {

    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        },
        { new: true }
     );

     if(updatedUser == null){
        return res.status(403).json('Erreur : Utilisateur non trouvée')
    }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(err)
    }
});



//DELETE
router.delete('/:id' , verifyTokenAndisAdmin ,async (req, res) => { 
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json('User has been deleted...')
    } catch (err) {
        return res.status(500).json(err)
    }
})



//GET USER
router.get('/find/:id' , verifyTokenAndisAdmin ,async (req, res) => { 
    try {
        const user = await User.findById(req.params.id)
        const { password, ...data } = user._doc;
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json(err)
    }
})


 /**
   * @openapi
   * /api/users:
   *  get:
   *     tags:
   *     - Users
   *     summary: Get all Users
   *     description: Get All users
   *     responses:
   *       200:
   *         contents:
   *            application/json
   *         description: Get All users
   *       403:
   *         description : Not alowed to get users !
   */

//GET ALL USER
router.get('/' ,verifyTokenAndisAdmin ,async (req, res) => { 
    try {
        const users = await User.find();
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).json(err)
    }
})



 /**
   * @openapi
   * '/api/users/admin/{id}':
   *  get:
   *     tags:
   *     - Users
   *     summary: make user admin
   *     parameters:
   *      - name: id
   *        description: The id of user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description : Not alowed to make user admin !
   */

//MAKE USER ADMIN
router.put('/admin/:id' , verifyTokenAndisAdmin,async (req, res) => { 
    try {

     const updatedUserAdmin = await User.update({_id: req.params.id},{$set:{isAdmin: true}})

     if(updatedUserAdmin == null){
        return res.status(403).json('Erreur : Utilisateur non trouvée')
    }
        return res.status(200).json(await User.findById(req.params.id));
    } catch (error) {
        return res.status(500).json(error)
    }
})

 /**
   * @openapi
   * '/api/users/remove/{id}':
   *  get:
   *     tags:
   *     - Users
   *     summary: remove user admin
   *     parameters:
   *      - name: id
   *        description: The id of user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description : Not alowed to remove user admin !
   */

//REMOVE USER ADMIN
router.put('/admin/remove/:id',verifyTokenAndisAdmin ,async (req, res) => { 
    try {

     const updatedUserAdmin = await User.update({_id: req.params.id},{$set:{isAdmin: false}})

     if(updatedUserAdmin == null){
        return res.status(403).json('Erreur : Utilisateur non trouvée')
    }
        return res.status(200).json(await User.findById(req.params.id));
    } catch (error) {
        return res.status(500).json(error)
    }
})



//MAKE USER MANAGER
router.put('/manager/:id',verifyTokenAndisAdmin ,async (req, res) => { 
    try {

     const updatedUserAdmin = await User.update({_id: req.params.id},{$set:{isVendorDeliveryMan: true}})

     if(updatedUserAdmin == null){
        return res.status(403).json('Erreur : Utilisateur non trouvée')
    }
        return res.status(200).json(await User.findById(req.params.id));
    } catch (error) {
        return res.status(500).json(error)
    }
})

//REMOVE USER MANAGER
router.put('/manager/remove/:id',verifyTokenAndisAdmin ,async (req, res) => { 
    try {

     const updatedUserAdmin = await User.update({_id: req.params.id},{$set:{isVendorDeliveryMan: false}})

     if(updatedUserAdmin == null){
        return res.status(403).json('Erreur : Utilisateur non trouvée')
    }
        return res.status(200).json(await User.findById(req.params.id));
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router