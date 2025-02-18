import { GetProductById } from "../models/products.model";
import { GetFirstProduct } from "../models/products.model";


export const firstproduct_in_DB_controller= (req , res, next) => {

    GetFirstProduct().then(product =>
        res.render("product" ,{
            product : product ,
            isUser:req.session.userId,
            isAdmin : req.session.isAdmin,
            pageTitle : "Product"
        }).catch((err) => { 
            next(err);
        })
    )
}


export const productcontroller = (req, res, next) => {
    let id = req.params.id;

    GetProductById(id)
        .then((product) => {
            res.render('product', {
                product: product,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle : "Product"
            });
        })
        .catch((err) => {
            next(err);
        });
};