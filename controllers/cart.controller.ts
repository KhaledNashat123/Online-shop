import { AddItem } from "../models/cart.model"
import { validationResult } from "express-validator";

export const getCart = (req,res,next) => {
    res.send("nash20000t")
} 


export const postCart = (req,res,next) => {
    const err = validationResult(req);

    if(err.isEmpty()){          
        AddItem({
            name : req.body.name,
            amount : req.body.amount,
            price : req.body.price,
            productId : req.body.productId,
            userId : req.session.userId,
        }).then(() =>{
            res.redirect('/cart')
        }).catch(error => {
            console.log(error);
        })   
    }
    else {
        req.flash("validationErrors" , validationResult(req).array())
        res.redirect('/')
    }
}