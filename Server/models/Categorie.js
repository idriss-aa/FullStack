const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    AddCategorieInput:
 *      type: object
 *      required:
 *        - userId
 *        - StoreId
 *        - title
 *      properties:
 *        userId:
 *          type: string
 *        StoreId:
 *          type: string
 *        title:
 *          type: string
 */

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


