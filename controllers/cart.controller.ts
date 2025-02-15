import { AddItem, DeleteItem, EditItem, GetItemByUserId } from "../models/cart.model"
import { validationResult } from "express-validator";

export const getCart = (req,res,next) => {
    GetItemByUserId(req.session.userId).then(items => {
        res.render('cart' , {
            items : items,
            isUser : true,
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
            console.log(error);
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
            console.log(error);
        })   
    }


export const postDelete = (req,res,next) => {        
        DeleteItem(req.body.cartId
        ).then(() =>{
            res.redirect('/cart')
        }).catch(error => {
            console.log(error);
        })   
    }