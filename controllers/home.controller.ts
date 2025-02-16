import { getAllProducts } from "../models/products.model";
import { getproductbycategory } from "../models/products.model";


export const getHome = (req ,res ,next ) => {

    // to filter by the category
    let category = req.query.category || "all";
    let allcatigories  : string[] = ["all" ,"silver watch" , "gold watch" ,"black watch"];
    
    if (allcatigories.includes(category) && category !== "all" ){
        getproductbycategory(category).then( products =>
            res.render('index' , {
                products : products,
                isUser:req.session.userId,
                isAdmin : req.session.isAdmin,
                validationError : req.flash("validationErrors")[0],
            })
        );
        
    }
    else if ( category == "all" ){
        getAllProducts().then(products => {
            res.render('index' , {
                products : products,
                isUser:req.session.userId,
                isAdmin : req.session.isAdmin,
                validationError : req.flash("validationErrors")[0],
            });
        })
    }
    
else {
        res.render('index' , {
            products : [],
            isUser:req.session.userId,
            isAdmin : req.session.isAdmin,
            validationError : req.flash("validationErrors")[0],
        });
    }
};