import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

function fmt(n) {
  return n % 1 === 0 ? `$${n}` : `$${parseFloat(n.toPrecision(4))}`;
}

const newData = JSON.parse(await readFile('src/data.json', 'utf8'));

let oldData = {};
try {
  oldData = JSON.parse(execSync('git show HEAD:src/data.json', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }));
} catch {
  // First commit — no previous data to diff against
}

const addedProviders = Object.keys(newData).filter((id) => !oldData[id]);
const removedProviders = Object.keys(oldData).filter((id) => !newData[id]);

const addedModels = [];
const removedModels = [];
const priceChanges = [];

for (const pid of Object.keys(newData)) {
  const newP = newData[pid];
  const oldP = oldData[pid];
  if (!oldP) {
    continue;
  }
  for (const mid of Object.keys(newP.models)) {
    if (!oldP.models[mid]) {
      addedModels.push(`${pid}/${mid}`);
      continue;
    }
    const o = oldP.models[mid].cost;
    const n = newP.models[mid].cost;
    const changes = [];
    if (o.input !== n.input) {
      changes.push(`input ${fmt(o.input)}→${fmt(n.input)}`);
    }
    if (o.output !== n.output) {
      changes.push(`output ${fmt(o.output)}→${fmt(n.output)}`);
    }
    if (changes.length > 0) {
      priceChanges.push(`${pid}/${mid}: ${changes.join(', ')}`);
    }
  }
  for (const mid of Object.keys(oldP.models)) {
    if (!newP.models[mid]) {
      removedModels.push(`${pid}/${mid}`);
    }
  }
}

function list(items, max = 5) {
  const shown = items.slice(0, max).join(', ');
  return items.length > max ? `${shown}, +${items.length - max} more` : shown;
}

const lines = [];
if (addedProviders.length > 0) {
  lines.push(`Added providers: ${list(addedProviders)}`);
}
if (removedProviders.length > 0) {
  lines.push(`Removed providers: ${list(removedProviders)}`);
}
if (addedModels.length > 0) {
  lines.push(`New models (${addedModels.length}): ${list(addedModels)}`);
}
if (removedModels.length > 0) {
  lines.push(`Removed models (${removedModels.length}): ${list(removedModels)}`);
}
if (priceChanges.length > 0) {
  lines.push(`Price changes (${priceChanges.length}): ${list(priceChanges, 3)}`);
}

if (lines.length > 0) {
  console.log(lines.join('\n'));
}
