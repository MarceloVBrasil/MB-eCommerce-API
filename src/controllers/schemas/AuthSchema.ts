import { object, string } from "yup";

export class AuthSchema {
    login() {
        return object().shape({
            email: string().email('invalid email format').required('email is required'),
            password: string().required('password is required'),
        })
    }

    register() {
        return object().shape({
            user: object().shape({
                name: string().required('name is required'),
                password: string().required('password is required'),
                email: string().email('invalid email format').required('email is required'),
            }),

            address: object().shape({
                street: string().required('street is required'),
                city: string().required('city is required'),
                province: string().required('province is required'),
                postalCode: string().required('postalCode is required'),
                complement: string()
            })
        })
    }
}