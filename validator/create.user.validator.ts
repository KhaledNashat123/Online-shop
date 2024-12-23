import { check, ValidationChain } from "express-validator";


export const user_validator = () : ValidationChain[] => {
    return [
    check("username")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

    check("email").isEmail().withMessage("invalid Email EX: Nashatinho@gmail.com"),

    check("password")
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters")
            .matches(/[0-9]/).withMessage("Password must contain at least one number")
            .matches(/[a-z]/).withMessage("Password must contain at least one lowercase character")
            .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase character"),

    check("confirmPassword")
            .notEmpty().withMessage("Confirm Password is required")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Confirm Password must match Password");
                }
                return true;
            }),
        
        ];
};