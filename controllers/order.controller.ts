import mongoose from "mongoose";
import { clearCart } from "../models/cart.model";
import { clearOrders, getUserOrders, updateStatus } from "../models/order.model";


export const getOrders = async (req, res, next) => {
    try {
        const orders = await getUserOrders(req.session.userId);
        res.render("orders", { 
            orders, 
            isUser: req.session.userId,
            isAdmin : req.session.isAdmin,
            success: req.flash("success"), 
            error: req.flash("error")      
        });
    } catch (error) {
        res.redirect("/");
    }
};

export const getManageOrder = async (req, res,next) => {
    try {
        const orders = await getUserOrders(req.session.userId);

        res.render("manage-orders", {
            success: 0,
            error: 0,
            orders: orders,
            isUser:req.session.userId,
            isAdmin : true,
        });
    } catch (error) {
        res.redirect("/orders");
    } finally {
        await mongoose.disconnect();
    }
};

export const confirmOrders = async (req, res,next) => {
    try {
        const orders = await getUserOrders(req.session.userId);

        if (orders.length === 0) {
            req.flash("error", "There is no orders");
            return res.redirect("/orders");
        }

        req.flash("success", "Orders are confirmed successfully");
        res.render("manage-orders", {
            success: req.flash("success"),
            error: req.flash("error"),
            orders: orders,
            isUser:req.session.userId,
            isAdmin : true,
        });
    } catch (error) {
        res.redirect("/orders");
    } finally {
        await mongoose.disconnect();
    }
};

export const deleteAllOrders = async (req, res,next) => {
    try {
        await clearCart(req.session.userId);
        await clearOrders(req.session.userId);

        req.flash("success", "All orders deleted successfully"); 
        res.redirect("/orders");
    } catch (error) {
        res.redirect("/orders");
    } finally {
        await mongoose.disconnect();
    }
};




export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params; 
        const { status } = req.body; 

        await updateStatus(orderId,status)
        res.redirect('/orders/manage-orders')

    } catch (error) {
            res.redirect("/orders");
    } finally {
        await mongoose.disconnect();
    }

};
