const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    userId : { type: String, required: true },
    StoreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique' },
    title: {
        fr: { type: String, required: true  },
        en: { type: String, required: true  }
    },
    description: {
        fr: { type: String, required: true  },
        en: { type: String, required: true  }
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