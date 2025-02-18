import { GetAllProducts } from "../models/products.model";
import { GetrPoductByCategory } from "../models/products.model";


export const getHome = (req ,res ,next ) => {

    let category = req.query.category || "all";
    let allcatigories  : string[] = ["all" ,"silver watch" , "gold watch" ,"black watch"];
    
    if (allcatigories.includes(category) && category !== "all" ){
        GetrPoductByCategory(category).then( products =>
            res.render('index' , {
                products : products,
                isUser:req.session.userId,
                isAdmin : req.session.isAdmin,
                validationError : req.flash("validationErrors")[0],
                pageTitle : "Home"
            })
        ).catch((error)=> {
            next(error);
        });
        
    }
    else if ( category == "all" ){
        GetAllProducts().then(products => {
            res.render('index' , {
                products : products,
                isUser:req.session.userId,
                isAdmin : req.session.isAdmin,
                validationError : req.flash("validationErrors")[0],
                pageTitle : "Home"
            });
        }).catch((error)=> {
            next(error);
        })
    }
    
else {
        res.render('index' , {
            products : [],
            isUser:req.session.userId,
            isAdmin : req.session.isAdmin,
            validationError : req.flash("validationErrors")[0],
            pageTitle : "Home"
        });
    }
};