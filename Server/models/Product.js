const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    userId : { type: String, required: true },
    title: { type: String, required: true , unique:true },
    description: { type: String, required: true }, 
    categories : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }],
    price: { type: Number, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product',ProductSchema)