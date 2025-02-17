import mongoose, {Schema , Document,Model} from "mongoose";
import { createOrder } from "./order.model";

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
        let exist = await Cart.findOne({ name: data.name, userId: data.userId });

        if (exist) {
            exist.amount = Number(exist.amount) + Number(data.amount);
            await exist.save();
        } else {
            let item = new Cart(data);
            await item.save();
        }

        const orderItems = [{ 
            name: data.name, 
            price: data.price, 
            amount: data.amount, 
            productId: data.productId 
        }];

        await createOrder(data.userId, orderItems);

    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};


export const GetItemsByUserId = async (userId) => {
    try {
        await mongoose.connect(DB_URL);
        return Cart.find({userId })

    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};



export const EditItem = async (id , NewAmount) => {
    try {
        await mongoose.connect(DB_URL);
        return Cart.updateOne({ _id: id }, { $set: { amount: NewAmount } });

    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};


export const DeleteItem = async (id) => {
    try {
        await mongoose.connect(DB_URL);
        return Cart.deleteOne({ _id: id });

    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};


export const getCartItems = async (userId) => {
    try {
        await mongoose.connect(DB_URL);
        return await Cart.find({ userId });
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

export const clearCart = async (userId) => {
    try {
        await mongoose.connect(DB_URL);
        await Cart.deleteMany({ userId });
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};