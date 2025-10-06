import { test as base } from '@playwright/test';
import { QuotesRequest } from "@requestObject/quotes.request";

type QuotesFixtures = {
    quotesRequest: QuotesRequest;
};

export const test = base.extend<QuotesFixtures>({
    quotesRequest: async ({ request }, use) => {
        await use(new QuotesRequest(request));
    },
});