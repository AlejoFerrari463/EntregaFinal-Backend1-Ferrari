import { model, Schema } from "mongoose";
import mongoosepaginatev2 from 'mongoose-paginate-v2'

const productsCollections = 'products'

const productsSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        default: []
    }

})


productsSchema.plugin(mongoosepaginatev2)

const productsModel = model(productsCollections,productsSchema)

export default productsModel