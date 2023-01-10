const mongoose = require('mongoose');


const CategorieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    StoreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique' },
    title: { type: String, required: true },
},
    { timestamps: true },
)

module.exports = mongoose.model('Categorie',CategorieSchema)


