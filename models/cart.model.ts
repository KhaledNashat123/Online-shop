import mongoose, {Schema , Document,Model} from "mongoose";

const DB_URL = "mongodb://localhost:27017/online-shop";

interface cart extends Document {
    name : string,
    amount : number,
    price : number,
    userId : string,
    productId : string,
}


const schema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
});

const the_cart : Model<cart> = mongoose.model<cart>('cart' , schema)

export const AddItem = async (data) => {
    try {
        await mongoose.connect(DB_URL);
        let item = await new the_cart(data);
        return item.save();

    } catch (error) {
        console.error("Error in saving item :", error);
        throw error;
    }
};