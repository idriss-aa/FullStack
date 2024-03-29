const express = require('express');
const cors = require('cors');
require('dotenv').config();
const logger = require("morgan");
const bodyParser = require('body-parser');
const connect = require("./Config/db");
const app = express();
app.use(bodyParser.json());
const userRoutes = require('./Routes/user')
const authRoute = require("./Routes/auth");
const CategorieRoute = require("./Routes/categorie");
const ProductRoute = require("./Routes/product");
const BoutiqueRoute = require("./Routes/boutique");
const session = require("express-session");
const Keycloak = require("keycloak-connect");
const {swaggerDocs} = require('./swagger.js');

//connect to database
connect();

app.use(cors({
	origin:'*'
}))


app.use(function(req, res, next) {
       
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
            if ('OPTIONS' == req.method) {
                res.sendStatus(200);
            }else {
                next();
            }
        });

//app.use(keycloak.middleware());

app.use('/api/auth',authRoute)
app.use('/api/users', userRoutes)
app.use('/api/categorie', CategorieRoute)
app.use('/api/product', ProductRoute)
app.use('/api/store', BoutiqueRoute)


app.listen(process.env.PORT,() =>{
    console.log(`Server is Running on ${process.env.PORT}`);
    swaggerDocs(app,process.env.PORT)
    console.log(`Docs available at http://localhost:${process.env.PORT}/docs`);
})