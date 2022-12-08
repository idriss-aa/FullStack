const mongoose = require("mongoose");


module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL);
        console.log('connection database created');
    } catch (error) {
        console.log(error);
    }
}