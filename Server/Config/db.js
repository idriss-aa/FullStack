const mongoose = require("mongoose");


module.exports = connect = async () => {
    try {
        mongoose.set('strictQuery', true);
        const response = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connection database created');
    } catch (error) {
        console.log(error);
    }
}



