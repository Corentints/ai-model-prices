/// <reference types="node" />
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { defineConfig } from 'tsup';

async function writeProviderFiles() {
  const data = JSON.parse(await readFile('src/data.json', 'utf8')) as Record<string, unknown>;

  await mkdir('dist/providers', { recursive: true });
  await Promise.all([
    ...Object.entries(data).map(([pid, provider]) =>
      writeFile(`dist/providers/${pid}.js`, `export const provider=${JSON.stringify(provider)};`),
    ),
    writeFile(
      'dist/providers/_manifest.js',
      `export const providerIds=${JSON.stringify(Object.keys(data))};`,
    ),
    writeFile('dist/providers/package.json', '{"type":"module"}'),
  ]);
  console.log(`  Generated ${Object.keys(data).length} provider files + manifest.`);
}

export default defineConfig({
  entry: { index: 'src/index.ts', async: 'src/async.ts' },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  async onSuccess() {
    await writeProviderFiles();
  },
});
