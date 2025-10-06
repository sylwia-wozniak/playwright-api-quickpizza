import { test as base } from '@playwright/test';
import { ToolsRequest } from "@requestObject/tools.request";

type ToolsFixtures = {
    toolsRequest: ToolsRequest;
};

export const test = base.extend<ToolsFixtures>({
    toolsRequest: async ({ request }, use) => {
        await use(new ToolsRequest(request));
    },
});