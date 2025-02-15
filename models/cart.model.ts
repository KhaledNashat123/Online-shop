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

const Cart : Model<cart> = mongoose.model<cart>('cart' , schema)

export const AddItem = async (data) => {
    try {
        await mongoose.connect(DB_URL);
        let item = await new Cart(data);
        return item.save();

    } catch (error) {
        console.error("Error in saving item :", error);
        throw error;
    }
};


export const GetItemByUserId = async (userId) => {
    try {
        await mongoose.connect(DB_URL);
        return Cart.find({userId })

    } catch (error) {
        console.error("Error in getting items :", error);
        throw error;
    }
};



export const EditItem = async (id , NewAmount) => {
    try {
        await mongoose.connect(DB_URL);
        return Cart.updateOne({ _id: id }, { $set: { amount: NewAmount } });

    } catch (error) {
        console.error("Error in saving item :", error);
        throw error;
    }
};


export const DeleteItem = async (id) => {
    try {
        await mongoose.connect(DB_URL);
        return Cart.deleteOne({ _id: id });

    } catch (error) {
        console.error("Error in saving item :", error);
        throw error;
    }
};