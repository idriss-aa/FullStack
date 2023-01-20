const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    AddProductInput:
 *      type: object
 *      required:
 *        - userId
 *        - StoreId
 *        - title
 *        - description 
 *        - categories
 *      properties:
 *        userId:
 *          type: string
 *        StoreId:
 *          type: string
 *        title:
 *          type: object
 *          properties:
 *            fr:
 *              type: string
 *            en:
 *              type: string
 * 
 *        categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 */

const ProductSchema = new mongoose.Schema({
    userId : { type: String, required: true },
    StoreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique' },
    title: {
        fr: { type: String, required: true  },
        en: { type: String  }
    },
    description: {
        fr: { type: String, required: true  },
        en: { type: String  }
    },
    categories : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }],
    price: { type: Number, required: true },
    CreationDate: {type: Date, default: () => Date.now() + 1*60*60*1000  },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product',ProductSchema)