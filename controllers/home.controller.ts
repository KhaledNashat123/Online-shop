import { getAllProducts } from "../models/products.model";


export const getHome = (req ,res ,next ) => {
    //get products 
    // render home page (index.ejs)

    getAllProducts().then(products => {
        res.render('index' , {
            products : products,

        });
    })
};