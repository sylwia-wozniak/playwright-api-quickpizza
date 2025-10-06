import { LoginPayloadSchema, loginPayloadSchema } from '@requestObject/login.request';
import { getUserCredential } from "@fixtures/data/users.fixture";

export const validCredentials = (): LoginPayloadSchema => {
    const { username, password } = getUserCredential();
    loginPayloadSchema.parse({
        username,
        password,
        csrf: '',
    });
    return { username, password, csrf: '' };
}

export const invalidUsername = () => {
    const { password } = getUserCredential();
    return loginPayloadSchema.parse({
        username: 'wrongUser',
        password,
        csrf: '',
    });
};

export const invalidPassword = () => {
    const { username } = getUserCredential();
    return loginPayloadSchema.parse({
        username,
        password: 'wrongPassword',
        csrf: '',
    });
};