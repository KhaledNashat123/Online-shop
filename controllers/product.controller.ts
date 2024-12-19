import { getproductbyid } from "../models/products.model";
import { getfirstproduct } from "../models/products.model";


export const firstproduct_in_DB_controller= (req , res, next) => {

    getfirstproduct().then(product =>
        res.render("product" ,{
            product : product 
        })
    )
}


export const productcontroller= (req , res, next) => {



    let id = req.params.id ;
    

    getproductbyid(id).then( product =>
                res.render('product' , {
                    product : product,
                })
            );
}