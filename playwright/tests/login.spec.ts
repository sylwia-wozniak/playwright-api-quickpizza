import { test } from '@fixtures/login.fixture';
import { validCredentials, invalidPassword, invalidUsername } from "@fixtures/data/login.fixture";

test('Login with valid credentials', async ({ loginRequest }) => {
    const payload = validCredentials();
    const response = await loginRequest.sendLogin(payload);
    loginRequest.validateSuccessLoginResponseSchema(response);
});

// Test passes even if the password is not valid - the API returns 200 OK with the token value
test('Login with invalid password', async ({ loginRequest }) => {
    const payload = invalidPassword();
    const response = await loginRequest.sendLogin(payload);
    loginRequest.validateSuccessLoginResponseSchema(response);
});

test('Login with invalid username', async ({ loginRequest }) => {
    const payload = invalidUsername();
    const response = await loginRequest.sendLogin(payload, 401);
    loginRequest.validateFailedLoginResponseSchema(response);
});
