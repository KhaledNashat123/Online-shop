import { getAllProducts } from "../models/products.model";
import { getproductbycategory } from "../models/products.model";


export const getHome = (req ,res ,next ) => {

    // to filter by the category
    let category = req.query.category || "all";
    let allcatigories  : string[] = ["all" ,"silver" , "gold" ,"black"];
    
    if (allcatigories.includes(category) && category !== "all" ){
        getproductbycategory(category).then( products =>
            res.render('index' , {
                products : products,
            })
        );
        
    }
    else if ( category == "all" ){
        getAllProducts().then(products => {
            res.render('index' , {
                products : products,
            });
        })
    }
    
else {
        res.render('index' , {
            products : [],
        });
    }
};