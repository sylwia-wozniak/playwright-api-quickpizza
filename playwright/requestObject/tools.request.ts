import { APIRequestContext, expect } from "@playwright/test";
import { z } from "zod";

const toolsResponseSchema = z.object({
    tools: z.array(z.string())
});

type ToolsResponseSchema = z.infer<typeof toolsResponseSchema>;

export class ToolsRequest {
    private request: APIRequestContext;
    private url: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.url = '/api/tools';

    }

    async getTools():Promise<ToolsResponseSchema> {
        const response = await this.request.get(this.url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token abcdef0123456789',
            },
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async validateToolsResponseSchema(body) {
        expect(() => {
            toolsResponseSchema.parse(body);
        }).not.toThrow();
    }

    async validateToolsResponseLength(body) {
        const expectedLength = 3;
        expect(body).toHaveLength(expectedLength);
    }
}
