import { test as base } from '@playwright/test';
import { LoginRequest } from "@requestObject/login.request";

type LoginFixtures = {
    loginRequest: LoginRequest;
};

export const test = base.extend<LoginFixtures>({
    loginRequest: async ({ request }, use) => {
        await use(new LoginRequest(request));
    },
});