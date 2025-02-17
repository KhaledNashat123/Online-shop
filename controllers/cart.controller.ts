import { AddItem, DeleteItem, EditItem, GetItemsByUserId } from "../models/cart.model"
import { validationResult } from "express-validator";

export const getCart = (req,res,next) => {
    GetItemsByUserId(req.session.userId).then(items => {
        res.render('cart' , {
            items : items,
            isUser : true,
            isAdmin : req.session.isAdmin,
        })
    })
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
            next(error);
        })   
    }
    else {
        req.flash("validationErrors" , validationResult(req).array())
        res.redirect('/')
    }
}

export const postSave = (req,res,next) => {       
        EditItem(req.body.cartId , req.body.amount
        ).then(() =>{
            res.redirect('/cart')
        }).catch(error => {
            next(error);
        })   
    }


export const postDelete = (req,res,next) => {        
        DeleteItem(req.body.cartId
        ).then(() =>{
            res.redirect('/cart')
        }).catch(error => {
            next(error);
        })   
    }