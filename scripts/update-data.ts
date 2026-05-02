import { writeFile } from 'node:fs/promises';

const API_URL = 'https://models.dev/api.json';

interface RawCost {
  input: number;
  output: number;
  reasoning?: number;
  cache_read?: number;
  cache_write?: number;
  input_audio?: number;
  output_audio?: number;
  context_over_200k?: unknown;
}

interface RawModel {
  name?: string;
  cost?: RawCost;
  limit?: { context?: number };
}

interface RawProvider {
  name?: string;
  models?: Record<string, RawModel>;
}

function stripToPricing(raw: Record<string, RawProvider>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [providerId, provider] of Object.entries(raw)) {
    const models: Record<string, unknown> = {};
    for (const [modelId, model] of Object.entries(provider.models ?? {})) {
      if (!model.cost) {
        continue;
      }
      const cost: Record<string, unknown> = { input: model.cost.input, output: model.cost.output };
      if (model.cost.reasoning != null) cost.reasoning = model.cost.reasoning;
      if (model.cost.cache_read != null) cost.cache_read = model.cost.cache_read;
      if (model.cost.cache_write != null) cost.cache_write = model.cost.cache_write;
      if (model.cost.input_audio != null) cost.input_audio = model.cost.input_audio;
      if (model.cost.output_audio != null) cost.output_audio = model.cost.output_audio;
      if (model.cost.context_over_200k != null) cost.context_over_200k = model.cost.context_over_200k;
      models[modelId] = {
        name: model.name ?? modelId,
        cost,
        ...(model.limit?.context ? { limit: { context: model.limit.context } } : {}),
      };
    }
    if (Object.keys(models).length === 0) {
      continue;
    }
    result[providerId] = { name: provider.name ?? providerId, models };
  }
  return result;
}

process.stdout.write(`Fetching ${API_URL}... `);
const res = await fetch(API_URL);
if (!res.ok) {
  throw new Error(`Failed: ${res.status} ${res.statusText}`);
}

const raw: Record<string, RawProvider> = await res.json();
const data = stripToPricing(raw);

const providerCount = Object.keys(data).length;
const modelCount = Object.values(data).reduce(
  (total: number, provider) => total + Object.keys((provider as { models: object }).models).length,
  0,
);
console.log(`${providerCount} providers, ${modelCount} priced models.`);

await writeFile('src/data.json', JSON.stringify(data), 'utf8');
console.log('Written src/data.json');

await import('./generate-types.ts');
