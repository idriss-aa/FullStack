const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')
const { verifyToken, verifyUserToken } = require('./verifyToken')

//REGISTER
router.post('/register', async (req, res) => {

    try {
    const SameUsername = await User.findOne({ username : req.body.username });
    if(SameUsername) return res.status(401).json('Il existe déja un utilisateur avec ce pseudo');
    
    const Sameemail = await User.findOne({ email : req.body.email });
    if(Sameemail) return res.status(401).json('Il existe déja un utilisateur avec cet email');

    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser)
    } catch (err) {
        return res.status(500).json(err)
    }
});

//LOGIN

router.post('/login', async (req, res) =>{

    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(401).json("Wrong credentials !")
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (Originalpassword !== req.body.password){
            return res.status(401).json("Wrong credentials !")
        }
        
       const accessToken = jwt.sign({
        id : user._id,
        isAdmin: user.isAdmin,
        isVendorDeliveryMan:user.isVendorDeliveryMan
       },
        process.env.JWT_SEC,
        {expiresIn: "3d"}
       );
       
        const { password, ...data } = user._doc;
        return res.status(200).json({...data, accessToken});
    } catch (err) {
        return res.status(500).json(err);
    }
})

//Verify Token
router.get('/validate', verifyUserToken ,async (req, res) => {});


module.exports = router;
