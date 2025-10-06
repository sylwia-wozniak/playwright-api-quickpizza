import { test as setup } from '@playwright/test';
import { LoginRequest } from '@requestObject/login.request';
import { usersWithSession } from '@fixtures/data/users.fixture';

usersWithSession.forEach(user => {
    setup(`Create token for user with role ${user.role}`, async ({ request }) => {
        const loginRequest = new LoginRequest(request);
        const loginResponse = await loginRequest.sendLogin({
            username: user.username,
            password: user.password,
            csrf: '',
        });
        const token = loginResponse.token;

        if (!token) throw new Error(`No qp_user_token returned for ${user.role}`);
        process.env[`PLAYWRIGHT_TOKEN_${user.role.toUpperCase()}`] = token;
    });
});
