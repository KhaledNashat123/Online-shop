import { getAllProducts } from "../models/products.model";
import { getproductbycategory } from "../models/products.model";


export const getHome = (req ,res ,next ) => {
    //get products 
    // render home page (index.ejs)

    // getAllProducts().then(products => {
    //     res.render('index' , {
    //         products : products,
    //     });
    // })


    // to filter by the category
    let category = req.query.category;
    let allcatigories  : string[] = ["all" ,"silver" , "gold" ,"black"];
    
    if (allcatigories.includes(category) && category !== "all" ){
        getproductbycategory(category).then( products =>
            res.render('index' , {
                products : products,
            })
        );
        
    }
    else {
        getAllProducts().then(products => {
            res.render('index' , {
                products : products,
            });
        })
    }


};