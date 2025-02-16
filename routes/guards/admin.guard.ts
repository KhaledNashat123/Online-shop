export const isAdmin = (req,res,next) =>{
    if(req.session.isAdmin) return next()
    return res.redirect('/')
}