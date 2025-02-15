import { CreateNewUser } from "../models/auth.model";
import { validationResult } from "express-validator";



export const authcontroller_getsignup = (req,res,next) => {
    res.render('signup' , {
        validation_error : [],
        isUser:req.session.userId
    });
    
}

export const authcontroller_postsignup = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    const err = validationResult(req);

    if(!err.isEmpty()){
        res.render('signup' , {
            validation_error : err.array(), 
            isUser:req.session.userId,
        });
    }
    else {
        CreateNewUser(username, email, password)
        .then((result) => {
            res.redirect('/login');
        })
        .catch((error) => {
            res.render('signup', {
                error : error.message,
                validation_error : [],
                isUser:req.session.userId,
            })
        });
    }
};








