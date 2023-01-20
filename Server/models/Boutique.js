const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    AddStoreInput:
 *      type: object
 *      required:
 *        - CreatedBy
 *        - title
 *        - isOpen
 *        - opening_hours 
 *      properties:
 *        CreatedBy:
 *          type: string
 *        title:
 *          type: 
 *            fr:
 *              type: string
 */


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
                start: { type: String },
                end:   { type: String }
            }]
    }],
    CreationDate: {type: Date, default: () => Date.now() + 1*60*60*1000  },
},
    { timestamps: true }
)

module.exports = mongoose.model('Boutique', BoutiqueSchema)