type ErrorMessages = {
    ratingOverLimit: string;
    authenticationFailed: string;
};

export const errorsMessages: ErrorMessages = {
    ratingOverLimit: 'Too big: expected number to be <=5',
    authenticationFailed: 'authentication failed'
};