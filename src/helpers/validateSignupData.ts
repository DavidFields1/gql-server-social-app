import { SignUpArgs } from "../interfaces";
import validator from "validator";

export const validateSignupData = ({ credentials: { email, password }, name, bio }: SignUpArgs) => {
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) return { isValid: false, error: "Email is invalid" };

    const isValidPassword = validator.isLength(password, { min: 6 })
    if (!isValidPassword) return { isValid: false, error: "Password must be at least 6 characters" };

    if(!name || !bio) return { isValid: false, error: "Name and Bio are required" };

    return { isValid: true, error: null };
}