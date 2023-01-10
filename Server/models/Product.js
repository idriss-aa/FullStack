const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    userId : { type: String, required: true },
    StoreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique' },
    titleFr: { type: String, required: true  },
    titleEn: { type: String, required: true  },
    descriptionFr: { type: String, required: true }, 
    descriptionEn: { type: String, required: true }, 
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