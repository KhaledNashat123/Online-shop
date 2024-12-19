 import { getproductbyid } from "../models/products.model";


export const productcontroller= (req , res, next) => {



    let id = req.params.id ;
    

    getproductbyid(id).then( product =>
                res.render('product' , {
                    product : product,
                })
            );
}