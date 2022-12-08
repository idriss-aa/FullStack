const mongoose = require('mongoose');


const CategorieSchema = new mongoose.Schema({
    title: { type: String, required: true , unique:true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    { timestamps: true }
})

module.exports = mongoose.model('Categorie',CategorieSchema)