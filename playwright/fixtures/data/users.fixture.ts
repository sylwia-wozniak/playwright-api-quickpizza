type UserCredentials = {
    username: string;
    password: string;
};

export const getUserCredential = (): UserCredentials => {
    const userCredentialsData = process.env.PLAYWRIGHT_USER;

    if (!userCredentialsData) {
        throw new Error('Missing PLAYWRIGHT_USER environment variable');
    }

    return JSON.parse(userCredentialsData) as UserCredentials;
}

export interface User {
    username: string;
    password: string;
    role: string;
}

export const regularUser: User = {
    username: getUserCredential().username as string,
    password: getUserCredential().password as string,
    role: 'regular',
};

export const usersWithSession: User[] = [regularUser];