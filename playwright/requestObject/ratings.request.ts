import { APIRequestContext, expect } from "@playwright/test";
import { z } from "zod";
import { sendOverLimitRating } from "@fixtures/data/ratings.fixture";
import { errorsMessages } from "@utils/constants";

const ratingsResponseSchema = z.object({
    id: z.number(),
    pizza_id: z.number(),
    stars: z.number().min(1).max(5),
});

export const ratingsPayloadSchema = z.object({
    pizza_id: z.number(),
    stars: z.number().min(1).max(5),
});

type RatingsResponseSchema = z.infer<typeof ratingsResponseSchema>;
type RatingsPayloadSchema = z.infer<typeof ratingsPayloadSchema>;

export class RatingsRequest {
    private request: APIRequestContext;
    private url: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.url = '/api/ratings';

    }

    async sendRatings(data: RatingsPayloadSchema, token?: string) {
        const response = await this.request.post(this.url, {
            headers: token ? {
                'Authorization': `token ${token}`,
            } : undefined,
            data: data
        });
        expect(response.status()).toBe(201);
        return await response.json();
    }

    async validateSuccessRatingsResponseSchema(body) {
        expect(() => {
            ratingsResponseSchema.parse(body);
        }).not.toThrow();
    }

    async validateFailedRatingsResponseSchema(pizzaId: number) {
        expect(() => sendOverLimitRating(pizzaId)).toThrowError(errorsMessages.ratingOverLimit);
    }
}
