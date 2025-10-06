import { APIRequestContext, expect } from "@playwright/test";
import { z } from "zod";
import { errorsMessages } from "@utils/constants";

const loginResponseSchema = z.object({
    token: z.string(),
});

export const loginPayloadSchema = z.object({
    username: z.string(),
    password: z.string(),
    csrf: z.string().default(''),
});

type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
export type LoginPayloadSchema = z.infer<typeof loginPayloadSchema>;

export class LoginRequest {
    private request: APIRequestContext;
    private url: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.url = '/api/users/token/login?set_cookie=true';

    }

    async sendLogin(data: LoginPayloadSchema, statusCode: number = 200) {
        const response = await this.request.post(this.url, {
            data: data
        });
        expect(response.status()).toBe(statusCode);

        if (response.status() === 200) {
            const json = await response.json();
            if (!json.token) throw new Error('No token returned from login');

            return { token: json.token };
        }
        return await response.json()
    }

    async validateSuccessLoginResponseSchema(body) {
        expect(() => {
            loginResponseSchema.parse(body);
        }).not.toThrow();
    }

    async validateFailedLoginResponseSchema(body) {
        expect(body.error).toBe(errorsMessages.authenticationFailed);
    }
}
