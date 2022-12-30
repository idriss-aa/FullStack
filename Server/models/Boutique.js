const mongoose = require('mongoose');


const BoutiqueSchema = new mongoose.Schema({
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
        immutable : true
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
            day: { type: String }, //mon - sun
            periods: [{
                start: { type : Date },
                end:   { type : Date }
            }]
    }],
    CreationDate: {type: Date, default: null }
},
    { timestamps: true }
)

module.exports = mongoose.model('Boutique',BoutiqueSchema)