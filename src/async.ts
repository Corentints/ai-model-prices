export type {
  Model,
  ModelCost,
  ModelCostContextOver200k,
  ModelFilter,
  ModelLimit,
  ModelWithProvider,
  ModalityInput,
  ModalityOutput,
  PriceBreakdown,
  Provider,
  TokenUsage,
} from './types.js';

import { toModel, matchesFilter, type StoredProvider } from './bundle.js';
import { getPrice as _getPrice } from './pricing.js';
import type { Model, ModelFilter, ModelWithProvider, PriceBreakdown, Provider, TokenUsage } from './types.js';

export async function getPrice(model: Model, tokens: TokenUsage): Promise<PriceBreakdown | null>;
export async function getPrice(providerAndModelId: string, tokens: TokenUsage): Promise<PriceBreakdown | null>;
export async function getPrice(modelOrId: Model | string, tokens: TokenUsage): Promise<PriceBreakdown | null> {
  if (typeof modelOrId === 'string') {
    const sep = modelOrId.indexOf('/');
    const model = await getModel(modelOrId.slice(0, sep), modelOrId.slice(sep + 1));
    return model ? _getPrice(model, tokens) : null;
  }
  return _getPrice(modelOrId, tokens);
}

// new Function prevents bundlers from statically analyzing this import —
// provider files are resolved at runtime from disk, not bundled at build time.
const _import = new Function('p', 'return import(p)') as (p: string) => Promise<unknown>;

async function loadProvider(id: string): Promise<StoredProvider | undefined> {
  try {
    const mod = (await _import(`./providers/${id}.js`)) as { provider: StoredProvider };
    return mod.provider;
  } catch {
    return undefined;
  }
}

async function loadAll(): Promise<[string, StoredProvider][]> {
  const { providerIds } = (await _import('./providers/_manifest.js')) as { providerIds: string[] };
  const entries = await Promise.all(
    providerIds.map(async (id) => [id, await loadProvider(id)] as [string, StoredProvider | undefined]),
  );
  return entries.filter((e): e is [string, StoredProvider] => e[1] != null);
}

function toProvider(id: string, p: StoredProvider): Provider {
  return {
    id,
    name: p.name,
    models: Object.fromEntries(Object.entries(p.models).map(([mid, m]) => [mid, toModel(mid, m)])),
  };
}

export async function getProviders(): Promise<Provider[]> {
  return (await loadAll()).map(([id, p]) => toProvider(id, p));
}

export async function getProvider(id: string): Promise<Provider | undefined> {
  const p = await loadProvider(id);
  return p ? toProvider(id, p) : undefined;
}

export async function getModel(providerId: string, modelId: string): Promise<Model | undefined> {
  const p = await loadProvider(providerId);
  const m = p?.models[modelId];
  return m ? toModel(modelId, m) : undefined;
}

export async function getModelsByProvider(providerId: string): Promise<Model[]> {
  const p = await loadProvider(providerId);
  if (!p) {
    return [];
  }
  return Object.entries(p.models).map(([mid, m]) => toModel(mid, m));
}

export async function getModels(): Promise<ModelWithProvider[]> {
  return (await loadAll()).flatMap(([pid, p]) =>
    Object.entries(p.models).map(([mid, m]) => ({ ...toModel(mid, m), providerId: pid, providerName: p.name })),
  );
}

export async function filterModels(filter: ModelFilter): Promise<ModelWithProvider[]> {
  const providerList = filter.provider
    ? Array.isArray(filter.provider)
      ? filter.provider
      : [filter.provider]
    : null;

  const entries = providerList
    ? (
        await Promise.all(
          providerList.map(async (id) => [id, await loadProvider(id)] as [string, StoredProvider | undefined]),
        )
      ).filter((e): e is [string, StoredProvider] => e[1] != null)
    : await loadAll();

  return entries.flatMap(([pid, p]) =>
    Object.entries(p.models)
      .filter(([, m]) => matchesFilter(m, filter))
      .map(([mid, m]) => ({ ...toModel(mid, m), providerId: pid, providerName: p.name })),
  );
}

export async function cheapestModel(filter?: ModelFilter): Promise<ModelWithProvider | undefined> {
  return (await filterModels(filter ?? {})).sort(
    (a, b) => (a.cost?.input ?? Infinity) - (b.cost?.input ?? Infinity),
  )[0];
}

export async function mostExpensiveModel(filter?: ModelFilter): Promise<ModelWithProvider | undefined> {
  return (await filterModels(filter ?? {})).sort((a, b) => (b.cost?.input ?? 0) - (a.cost?.input ?? 0))[0];
}
