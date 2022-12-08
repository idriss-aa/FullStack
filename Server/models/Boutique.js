const mongoose = require('mongoose');


const StoreSchema = new mongoose.Schema({
    title: { type: String, required: true , unique:true },
    isOpen: {
        type: Boolean,
        default:false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'

    }],
    opening_hours: [{
            day: { type Date }, //mon - sun
             periods: [{
                start: { type Date },
                end:   { type Date }
            }]
    }]
    { timestamps: true }
})

module.exports = mongoose.model('Store',StoreSchema)