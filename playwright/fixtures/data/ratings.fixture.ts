import { ratingsPayloadSchema } from '@requestObject/ratings.request';

export const sendMinRating = (pizzaId: number) =>
    ratingsPayloadSchema.parse({
        pizza_id: pizzaId,
        stars: 1,
    });

export const sendMaxRating = (pizzaId: number) =>
    ratingsPayloadSchema.parse({
        pizza_id: pizzaId,
        stars: 5,
    });

export const sendOverLimitRating = (pizzaId: number) =>
    ratingsPayloadSchema.parse({
        pizza_id: pizzaId,
        stars: 6,
    });