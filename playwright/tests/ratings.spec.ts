import { test } from '@fixtures/ratings.fixture';
import { defaultPizzaPayload } from '@fixtures/data/pizza.fixture';
import { sendMaxRating, sendMinRating } from "@fixtures/data/ratings.fixture";

let pizzaId: number;

test.beforeEach(async ({ pizzaRequest }) => {
    const pizzaResponse = await pizzaRequest.createPizza(defaultPizzaPayload, process.env.PLAYWRIGHT_TOKEN_REGULAR);
    pizzaId = await pizzaRequest.getPizzaId(pizzaResponse);
});

test('Send minimum ratings', async ({ ratingsRequest }) => {
    const ratingData = sendMinRating(pizzaId);
    const ratingResponse = await ratingsRequest.sendRatings(ratingData, process.env.PLAYWRIGHT_TOKEN_REGULAR);
    await ratingsRequest.validateSuccessRatingsResponseSchema(ratingResponse);
});

test('Send maximum ratings', async ({ ratingsRequest }) => {
    const ratingData = sendMaxRating(pizzaId);
    const ratingResponse = await ratingsRequest.sendRatings(ratingData, process.env.PLAYWRIGHT_TOKEN_REGULAR);
    await ratingsRequest.validateSuccessRatingsResponseSchema(ratingResponse);
});

test('Send over limit ratings', async ({ ratingsRequest }) => {
    const ratingData = sendMaxRating(pizzaId);
    await ratingsRequest.sendRatings(ratingData, process.env.PLAYWRIGHT_TOKEN_REGULAR);
    await ratingsRequest.validateFailedRatingsResponseSchema(pizzaId);
});
