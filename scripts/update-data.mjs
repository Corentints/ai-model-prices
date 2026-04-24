import { writeFile } from 'node:fs/promises';

const API_URL = 'https://models.dev/api.json';

function stripToPricing(raw) {
  const out = {};
  for (const [pid, provider] of Object.entries(raw)) {
    const models = {};
    for (const [mid, model] of Object.entries(provider.models ?? {})) {
      if (!model.cost) {
        continue;
      }
      const cost = { input: model.cost.input, output: model.cost.output };
      if (model.cost.reasoning != null) {
        cost.reasoning = model.cost.reasoning;
      }
      if (model.cost.cache_read != null) {
        cost.cache_read = model.cost.cache_read;
      }
      if (model.cost.cache_write != null) {
        cost.cache_write = model.cost.cache_write;
      }
      if (model.cost.input_audio != null) {
        cost.input_audio = model.cost.input_audio;
      }
      if (model.cost.output_audio != null) {
        cost.output_audio = model.cost.output_audio;
      }
      if (model.cost.context_over_200k != null) {
        cost.context_over_200k = model.cost.context_over_200k;
      }
      models[mid] = {
        name: model.name ?? mid,
        cost,
        ...(model.limit?.context ? { limit: { context: model.limit.context } } : {}),
      };
    }
    if (Object.keys(models).length === 0) {
      continue;
    }
    out[pid] = { name: provider.name ?? pid, models };
  }
  return out;
}

process.stdout.write(`Fetching ${API_URL}... `);
const res = await fetch(API_URL);
if (!res.ok) {
  throw new Error(`Failed: ${res.status} ${res.statusText}`);
}
const raw = await res.json();
const data = stripToPricing(raw);

const providerCount = Object.keys(data).length;
const modelCount = Object.values(data).reduce((sum, p) => sum + Object.keys(p.models).length, 0);
console.log(`${providerCount} providers, ${modelCount} priced models.`);

await writeFile('src/data.json', JSON.stringify(data), 'utf8');
console.log('Written src/data.json');
