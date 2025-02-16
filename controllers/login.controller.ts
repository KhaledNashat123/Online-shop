import { login } from "../models/auth.model";


export const authcontroller_getlogin = (req,res,next) => {
    res.render('login',{
        TheError : req.flash("TheError")[0],
        isUser : req.session.userId,
        isAdmin: false,
    });
}

export const authcontroller_postlogin = (req,res,next) => {
    
    let email = req.body.email;
    let password = req.body.password;

    login(email, password)
        .then((result) => {
            req.session.userId = result.id;
            req.session.isAdmin = result.isAdmin;
            res.redirect('/');
        })
        .catch((error) => {
            req.flash("TheError" , error.message);
            res.redirect("/login");
        });
}

export const authcontroller_logout = (req,res,next) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
}