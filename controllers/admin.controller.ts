import { AddProduct } from "../models/products.model";


export const get_AddProduct = (req,res,next) => {
    res.render("add-product" , {
        validationErrors: req.flash("validationErrors"),
        isUser : true,
        isAdmin : true
    }
    );
}

export const post_AddProduct = async (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400).send("No image uploaded");
        }

        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            description: req.body.description,
        };

        await AddProduct(product);
        res.redirect("/admin/add");

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Internal Server Error");
    }
};
