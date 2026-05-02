import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

interface ModelCost {
  input: number;
  output: number;
}

interface Model {
  name: string;
  cost: ModelCost;
}

interface Provider {
  name: string;
  models: Record<string, Model>;
}

type Data = Record<string, Provider>;

function fmt(value: number): string {
  return `$${parseFloat(value.toPrecision(4))}`;
}

const newData: Data = JSON.parse(await readFile('src/data.json', 'utf8'));

let oldData: Data = {};
try {
  oldData = JSON.parse(
    execSync('git show HEAD:src/data.json', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }),
  );
} catch {
  // First commit — no previous data to diff against
}

const addedProviders = Object.keys(newData).filter((id) => !oldData[id]);
const removedProviders = Object.keys(oldData).filter((id) => !newData[id]);

interface PriceChange {
  pid: string;
  mid: string;
  modelName: string;
  providerName: string;
  changes: string[];
}

const addedModels: Array<{ pid: string; mid: string; name: string; providerName: string }> = [];
const removedModels: Array<{ pid: string; mid: string; name: string; providerName: string }> = [];
const priceChanges: PriceChange[] = [];

for (const pid of Object.keys(newData)) {
  const newProvider = newData[pid];
  const oldProvider = oldData[pid];
  if (!oldProvider) {
    continue;
  }
  for (const mid of Object.keys(newProvider.models)) {
    const newModel = newProvider.models[mid];
    if (!oldProvider.models[mid]) {
      addedModels.push({ pid, mid, name: newModel.name, providerName: newProvider.name });
      continue;
    }
    const oldCost = oldProvider.models[mid].cost;
    const newCost = newModel.cost;
    const changes: string[] = [];
    if (oldCost.input !== newCost.input) {
      changes.push(`input ${fmt(oldCost.input)} → ${fmt(newCost.input)}`);
    }
    if (oldCost.output !== newCost.output) {
      changes.push(`output ${fmt(oldCost.output)} → ${fmt(newCost.output)}`);
    }
    if (changes.length > 0) {
      priceChanges.push({ pid, mid, modelName: newModel.name, providerName: newProvider.name, changes });
    }
  }
  for (const mid of Object.keys(oldProvider.models)) {
    if (!newProvider.models[mid]) {
      removedModels.push({ pid, mid, name: oldProvider.models[mid].name, providerName: oldProvider.name });
    }
  }
}

const sections: string[] = [];

if (addedProviders.length > 0) {
  sections.push(
    `### New providers (${addedProviders.length})\n` +
      addedProviders.map((id) => `- **${newData[id].name}** (\`${id}\`)`).join('\n'),
  );
}

if (removedProviders.length > 0) {
  sections.push(
    `### Removed providers (${removedProviders.length})\n` +
      removedProviders.map((id) => `- **${oldData[id].name}** (\`${id}\`)`).join('\n'),
  );
}

if (addedModels.length > 0) {
  sections.push(
    `### New models (${addedModels.length})\n` +
      addedModels.map((entry) => `- **${entry.providerName}** — ${entry.name} (\`${entry.mid}\`)`).join('\n'),
  );
}

if (removedModels.length > 0) {
  sections.push(
    `### Removed models (${removedModels.length})\n` +
      removedModels.map((entry) => `- **${entry.providerName}** — ${entry.name} (\`${entry.mid}\`)`).join('\n'),
  );
}

if (priceChanges.length > 0) {
  sections.push(
    `### Price changes (${priceChanges.length})\n` +
      priceChanges.map((change) => `- **${change.providerName}** — ${change.modelName}: ${change.changes.join(', ')}`).join('\n'),
  );
}

if (sections.length > 0) {
  console.log(sections.join('\n\n'));
}
