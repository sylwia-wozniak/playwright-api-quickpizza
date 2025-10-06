import { test as base } from '@playwright/test';
import { RatingsRequest } from "@requestObject/ratings.request";
import { PizzaRequest } from "@requestObject/pizza.request";

type RatingsFixtures = {
    ratingsRequest: RatingsRequest;
    pizzaRequest: PizzaRequest;
};

export const test = base.extend<RatingsFixtures>({
    ratingsRequest: async ({ request }, use) => {
        await use(new RatingsRequest(request));
    },
    pizzaRequest: async ({ request }, use) => {
        await use(new PizzaRequest(request));
    },
});