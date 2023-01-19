const mongoose = require('mongoose');


const BoutiqueSchema = new mongoose.Schema({
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
        immutable : true
    },
    title: { type: String, required: true },
    isOpen: {
        type: Boolean,
        default:false,
    },
    Nb_products: { type: Number, default : 0 },
    Nb_Categories: { type: Number, default : 0 },
    opening_hours: [{
            day: { type: String }, //mon - sun
            periods: [{
                start: { type : Date },
                end:   { type : Date }
            }]
    }],
    CreationDate: {type: Date, default: () => Date.now() + 1*60*60*1000  },
},
    { timestamps: true }
)

module.exports = mongoose.model('Boutique', BoutiqueSchema)