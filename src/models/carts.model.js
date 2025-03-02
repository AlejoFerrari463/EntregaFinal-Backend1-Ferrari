import mongoose,{ model, Schema} from "mongoose";
import mongoosepaginatev2 from 'mongoose-paginate-v2'

const cartsCollections = 'carts'

const cartsSchema = new Schema({

    products: {
        type: [{
            idProduct: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number,
            }
        }],
        default: []
    }
})


cartsSchema.plugin(mongoosepaginatev2)

const cartsModel = model(cartsCollections,cartsSchema)

export default cartsModel