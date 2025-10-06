import { test } from '@fixtures/ratings.fixture';
import { defaultPizzaPayload } from '@fixtures/data/pizza.fixture';
import { sendMaxRating, sendMinRating, sendOverLimitRating } from "@fixtures/data/ratings.fixture";
import { expect } from "@playwright/test";
import { errorsMessages } from "@utils/constants";

let pizzaId: number;

test.beforeEach(async ({ pizzaRequest}) => {
    const pizzaResponse = await pizzaRequest.createPizza(defaultPizzaPayload);
    pizzaId = await pizzaRequest.getPizzaId(pizzaResponse);
});

test('Send minimum ratings', async ({ ratingsRequest }) => {
    const ratingData = sendMinRating(pizzaId);
    const ratingResponse = await ratingsRequest.sendRatings(ratingData);
    await ratingsRequest.validateSuccessRatingsResponseSchema(ratingResponse);
});

test('Send maximum ratings', async ({ ratingsRequest }) => {
    const ratingData = sendMaxRating(pizzaId);
    const ratingResponse = await ratingsRequest.sendRatings(ratingData);
    await ratingsRequest.validateSuccessRatingsResponseSchema(ratingResponse);
});

test('Send over limit ratings', async ({ ratingsRequest }) => {
    await ratingsRequest.validateFailedRatingsResponseSchema(pizzaId);
});
