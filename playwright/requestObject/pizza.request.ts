import { APIRequestContext, expect } from "@playwright/test";
import { z } from "zod";

const pizzaResponseSchema = z.object({
    pizza: z.object({
        id: z.number(),
        name: z.string(),
        dough: z.object({
            ID: z.number(),
            name: z.string(),
            caloriesPerSlice: z.number(),
        }),
        ingredients: z.array(
            z.object({
                ID: z.number(),
                name: z.string(),
                caloriesPerSlice: z.number(),
                vegetarian: z.boolean(),
            })
        ),
        tool: z.string(),
    }),
    calories: z.number(),
    vegetarian: z.boolean(),
});

export const pizzaPayloadSchema = z.object({
    maxCaloriesPerSlice: z.number().default(1000),
    mustBeVegetarian: z.boolean().default(false),
    excludedIngredients: z.array(z.string()).default([]),
    excludedTools: z.array(z.string()).default([]),
    maxNumberOfToppings: z.number().default(5),
    minNumberOfToppings: z.number().default(2),
    customName: z.string().default(""),
});

type PizzaResponseSchema = z.infer<typeof pizzaResponseSchema>;
type PizzaPayloadSchema = z.infer<typeof pizzaPayloadSchema>;

export class PizzaRequest {
    private request: APIRequestContext;
    private url: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.url = '/api/pizza';

    }

    async createPizza(data: PizzaPayloadSchema):Promise<PizzaResponseSchema> {
        const response = await this.request.post(this.url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token abcdef0123456789',
            },
            data: data
        });
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async validatePizzaResponseSchema(body) {
        expect(() => {
            pizzaResponseSchema.parse(body);
        }).not.toThrow();
    }

    getPizzaId(body) {
        return body.pizza.id;
    }
}
