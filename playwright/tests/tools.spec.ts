import { test } from '@fixtures/tools.fixture';

test('Get all tools', async ({toolsRequest }) => {
    const tools = await toolsRequest.getTools();
    await toolsRequest.validateToolsResponseSchema(tools);
    await toolsRequest.validateToolsResponseLength(tools.tools);
});
