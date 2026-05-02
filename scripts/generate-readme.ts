import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

type Model = { name: string; cost?: { input: number; output: number } };
type Provider = { name: string; models: Record<string, Model> };
type Data = Record<string, Provider>;

const data: Data = JSON.parse(await readFile(join(import.meta.dirname, '../src/data.json'), 'utf-8'));

const providerIds = Object.keys(data);
const totalModels = providerIds.reduce((total, pid) => total + Object.keys(data[pid].models).length, 0);

function providerRow(pid: string): string {
  const provider = data[pid];
  return `| ${provider.name} | \`${pid}\` |`;
}

const providerTable = ['| Provider | ID |', '|---|---|', ...providerIds.map(providerRow)].join('\n');

const readmePath = join(import.meta.dirname, '../README.md');
let readme = await readFile(readmePath, 'utf-8');

readme = readme.replace(
  /<!-- STATS:START -->[\s\S]*?<!-- STATS:END -->/,
  `<!-- STATS:START -->\n**${providerIds.length} providers · ${totalModels} models · Updated ${new Date().toISOString().slice(0, 10)}**\n<!-- STATS:END -->`,
);

readme = readme.replace(
  /<!-- PROVIDERS:START -->[\s\S]*?<!-- PROVIDERS:END -->/,
  `<!-- PROVIDERS:START -->\n${providerTable}\n<!-- PROVIDERS:END -->`,
);

await writeFile(readmePath, readme, 'utf-8');
console.log(`Updated README.md (${providerIds.length} providers, ${totalModels} models)`);
