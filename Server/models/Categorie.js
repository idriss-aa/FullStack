const mongoose = require('mongoose');


const CategorieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: { type: String, required: true , unique:true },
},
    { timestamps: true },
)

module.exports = mongoose.model('Categorie',CategorieSchema)


