import { APIRequestContext, expect } from "@playwright/test";
import { z } from "zod";

const quotesResponseSchema = z.object({
    quotes: z.array(z.string())
});

type QuotesResponseSchema = z.infer<typeof quotesResponseSchema>;

export class QuotesRequest {
    private request: APIRequestContext;
    private url: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.url = '/api/quotes';

    }

    async getQuotes(){
        const response = await this.request.get(this.url);
        expect(response.status()).toBe(200);

        return await response.json();
    }

    async validateQuotesResponseSchema(body) {
        expect(() => {
            quotesResponseSchema.parse(body);
        }).not.toThrow();
    }

    async validateQuotesResponseLength(body) {
        const expectedLength = 6;
        expect(body).toHaveLength(expectedLength);
    }
}
