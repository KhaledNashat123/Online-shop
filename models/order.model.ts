import dotenv from 'dotenv';
dotenv.config();

import mongoose, { Schema, Document, Model } from "mongoose";


interface Order extends Document {
    userId: string;
    items: { name: string; price: number; amount: number; productId: string }[];
    totalPrice: number;
    status: "pending" | "sent" | "completed";
}

const orderSchema: Schema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            amount: { type: Number, required: true },
            productId: { type: String, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ["pending", "sent", "completed"], 
        default: "pending"
    }
});

const OrderModel: Model<Order> = mongoose.model<Order>("Order", orderSchema);

export const CreateOrder = async (userId, items) => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.amount, 0);
        const order = new OrderModel({ userId, items, totalPrice, status: "pending" });
        return await order.save();
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

export const GetUserOrders = async (userId) => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        return await OrderModel.find({ userId });
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};


export const ClearOrders = async (userId) => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        await OrderModel.deleteMany({ userId });
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};


export const UpdateStatus = async (orderId,status) => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        const order = await OrderModel.findById(orderId);

        if (!order) {
            throw new Error("order is not found ");
        }

        order.status = status;
        await order.save();  

    }catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}