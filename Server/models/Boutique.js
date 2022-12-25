const mongoose = require('mongoose');


const BoutiqueSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: { type: String, required: true , unique:true },
    isOpen: {
        type: Boolean,
        default:false,
    },
    products : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'

    }],
    opening_hours: [{
            day: { type : Date }, //mon - sun
            periods: [{
                start: { type : Date },
                end:   { type : Date }
            }]
    }],
    categories : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }],
    
},
    { timestamps: true }
)

module.exports = mongoose.model('Boutique',BoutiqueSchema)