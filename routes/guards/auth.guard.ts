export const isauth = (req,res,next) =>{
    if(req.session.userId) return next()
    return res.redirect('/login')

}

export const notauth = (req,res,next) =>{
    if(!req.session.userId) return next()
    return res.redirect('/')

}