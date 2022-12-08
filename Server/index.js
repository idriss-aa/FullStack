const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const connect = require("./Config/db");
const app = express();
app.use(bodyParser.json());
const userRoutes = require('./Routes/User')
const authRoute = require("./Routes/auth");

//connect to database
connect();

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }else {
        next();
    }});




app.use('/api/auth', authRoute)
app.use('/api/users', userRoutes)





app.listen(process.env.PORT, process.env.domain ,() =>{
    console.log(`Server is Running on ${process.env.PORT}`);
})