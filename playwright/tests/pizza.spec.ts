import { test } from '@fixtures/pizza.fixture';
import { defaultPizzaPayload } from '@fixtures/data/pizza.fixture';

test('Create a default pizza', async ({ pizzaRequest }) => {
    await pizzaRequest.createPizza(defaultPizzaPayload, process.env.PLAYWRIGHT_TOKEN_REGULAR);
});
