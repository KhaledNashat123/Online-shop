import mongoose, { Schema, Document, Model } from "mongoose";

const DB_URL = "mongodb://localhost:27017/online-shop";

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

export const createOrder = async (userId, items) => {
    try {
        await mongoose.connect(DB_URL);
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.amount, 0);
        const order = new OrderModel({ userId, items, totalPrice, status: "pending" });
        return await order.save();
    } catch (error) {
        console.error("Error in creating order:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

export const getUserOrders = async (userId) => {
    try {
        await mongoose.connect(DB_URL);
        return await OrderModel.find({ userId });
    } catch (error) {
        console.error("Error in fetching orders:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};


export const clearOrders = async (userId) => {
    try {
        await mongoose.connect(DB_URL);
        await OrderModel.deleteMany({ userId });
    } catch (error) {
        console.error("Error in clearing cart:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};


export const updateStatus = async (orderId,status) => {
    try {
        await mongoose.connect(DB_URL);
        const order = await OrderModel.findById(orderId);

        if (!order) {
            throw new Error("order is not found ");
        }

        order.status = status;
        await order.save();  

    }catch (error) {
        console.error("Error in updating status:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}