import mongoose from "mongoose";
import { clearCart, GetItemsByUserId } from "../models/cart.model";

export const getOrders = async (req, res, next) => {
    try {
        const orders = await GetItemsByUserId(req.session.userId);
        res.render("orders", { 
            orders, 
            isUser: req.session.userId,
            success: req.flash("success"), 
            error: req.flash("error")      
        });
    } catch (error) {
        res.redirect("/");
    }
};

export const confirmOrders = async (req, res) => {
    try {
        const orders = await GetItemsByUserId(req.session.userId);

        if (orders.length === 0) {
            req.flash("error", "There is no orders");
            return res.redirect("/orders");
        }

        req.flash("success", "Orders are confirmed successfully");
        res.redirect("/orders");
    } catch (error) {
        res.redirect("/orders");
    } finally {
        await mongoose.disconnect();
    }
};

export const deleteAllOrders = async (req, res) => {
    try {
        await clearCart(req.session.userId);

        req.flash("success", "All orders deleted successfully"); 
        res.redirect("/orders");
    } catch (error) {
        res.redirect("/orders");
    } finally {
        await mongoose.disconnect();
    }
};