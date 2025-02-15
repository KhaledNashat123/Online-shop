export const isauth_home = (req,res,next) =>{
    if(req.session.userId) return next()
    return res.redirect('/login')

}

export const notauth_home = (req,res,next) =>{
    if(!req.session.userId) return next()
    return res.redirect('/')

}