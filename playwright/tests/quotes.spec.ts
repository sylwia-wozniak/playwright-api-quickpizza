import { test } from '@fixtures/quotes.fixture';

test('Get all quotes', async ({ quotesRequest }) => {
    const quotes = await quotesRequest.getQuotes();
    await quotesRequest.validateQuotesResponseSchema(quotes);
    await quotesRequest.validateQuotesResponseLength(quotes.quotes);
});
