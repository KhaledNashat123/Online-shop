import { check, ValidationChain } from "express-validator";


export const Cart_validator = () : ValidationChain[] => {
    return [
    check("amount").not().isEmpty().withMessage("The amount is required").isInt({min:1}).withMessage("the amount must be greater than 0")
        ];
};