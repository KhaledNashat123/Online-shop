import { RequestHandler ,  Request, Response, NextFunction } from "express";

export const notFound:RequestHandler = ((req,res,next)=>{
    res.status(404).render('notFoundError')
})

export const serverError = ((err , req:Request, res:Response , next:NextFunction) => {
    res.status(500).render('serverError');
})