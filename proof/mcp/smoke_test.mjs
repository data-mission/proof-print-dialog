/* Smoke test: spawn server.js over stdio, drive it with the real MCP
 * Client SDK (handles initialize handshake for us), call every tool,
 * print results. Run: node smoke_test.mjs */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['server.js'],
});

const client = new Client({ name: 'proof-smoke-test', version: '1.0.0' });
await client.connect(transport);

console.log('=== tools/list ===');
const list = await client.listTools();
console.log(JSON.stringify(list, null, 2));

console.log('\n=== proof({doc: "Q3_Operating_Review_FINAL_v4.docx"}) ===');
const proofRes = await client.callTool({ name: 'proof', arguments: { doc: 'Q3_Operating_Review_FINAL_v4.docx' } });
console.log(proofRes.content[0].text);

console.log('\n=== waste_report({doc: "Q3_Operating_Review_FINAL_v4.docx"}) ===');
const wasteRes = await client.callTool({ name: 'waste_report', arguments: { doc: 'Q3_Operating_Review_FINAL_v4.docx' } });
console.log(wasteRes.content[0].text);

console.log('\n=== drop_pages({doc, pages:[4,6,9,11,13]}) ===');
const dropRes = await client.callTool({
  name: 'drop_pages',
  arguments: { doc: 'Q3_Operating_Review_FINAL_v4.docx', pages: [4, 6, 9, 11, 13] },
});
console.log(dropRes.content[0].text);

console.log('\n=== ink_cost({doc}) default drop = waste pages ===');
const costRes = await client.callTool({ name: 'ink_cost', arguments: { doc: 'Q3_Operating_Review_FINAL_v4.docx' } });
console.log(costRes.content[0].text);

await client.close();
process.exit(0);
