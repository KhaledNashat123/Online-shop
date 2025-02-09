import { login } from "../models/auth.model";


export const authcontroller_getlogin = (req,res,next) => {
    res.render('login');
}


export const authcontroller_postlogin = (req,res,next) => {
    
    let email = req.body.email;
    let password = req.body.password;

    login(email, password)
        .then((id) => {
            req.session.userId = id;
            res.redirect('/');
        })
        .catch((error) => {
            res.render('login' , {
                error : error
            })
        });
}

export const authcontroller_logout = (req,res,next) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
}