import { test as base } from '@playwright/test';
import { PizzaRequest } from "@requestObject/pizza.request";

type PizzaFixtures = {
    pizzaRequest: PizzaRequest;
};

export const test = base.extend<PizzaFixtures>({
    pizzaRequest: async ({ request }, use) => {
        await use(new PizzaRequest(request));
    },
});