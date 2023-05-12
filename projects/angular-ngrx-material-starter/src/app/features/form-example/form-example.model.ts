export interface Condition {
    name: string;
    value: string;
    text: string;
    class: string;
}

export interface FormExample {
    user: User;
    review: Review;
}

export interface User {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface Review {
    city: string;
    dateStart: string;
    dateEnd: string;
    appreciation : string;
    comment: string;
}

export interface Countries {
    name: string;
    code: string;
}

