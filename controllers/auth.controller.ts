
import { CreateNewUser } from "../models/auth.model";


export const authcontroller_getsignup = (req,res,next) => {

    res.render('signup');
}

export const authcontroller_postsignup = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    CreateNewUser(username, email, password)
        .then((result) => {
            res.redirect('/login');
        })
        .catch((error) => {
            res.render('signup' , {
                error : error.message
            })
        });
};




