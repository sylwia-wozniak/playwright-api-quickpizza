# Pizza API Test Suite

This project uses Playwright and Zod for automated API testing of a pizza ordering website.

## Features

\- **API Testing**: Uses Playwright for HTTP requests and Zod for response validation.  
\- **Request Object Pattern**: Encapsulates API calls in dedicated classes for maintainability.  
\- **TypeScript Support**: Ensures type safety and modern development experience.  
\- **Fixture Data**: Provides reusable test data for consistent test results.  
\- **Constants File**: Centralizes URLs and static data for easy updates.

## Website Under Test

All tests target:  
`https://quickpizza.grafana.com`

## Request Object Pattern

API interactions are encapsulated in classes (e.g., `PizzaRequest`).  
Each class receives a Playwright `APIRequestContext` and exposes async methods for API calls.

## Constants File

All static data (like URLs, pizza types, etc.) is stored in the `constants` directory for easy access and updates.

## Fixture Data

Reusable test data is defined in the `fixtures` directory.  
This ensures tests are consistent and easy to maintain.

## Class Initialization in Fixtures

You can initialize request classes in Playwright fixtures for dependency injection and cleaner test setup.

Example:
```typescript
import { test as base } from '@playwright/test';
import { PizzaRequest } from '../requestObject/PizzaRequest';

const test = base.extend({
  pizzaRequest: async ({ request }, use) => {
    await use(new PizzaRequest(request));
  },
});
