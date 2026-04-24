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

import _raw from './data.json';
import { toModel, matchesFilter, type StoredProvider } from './bundle.js';
import { getPrice as _getPrice } from './pricing.js';
import type { Model, ModelFilter, ModelWithProvider, PriceBreakdown, Provider, TokenUsage } from './types.js';

export function getPrice(model: Model, tokens: TokenUsage): PriceBreakdown | null;
export function getPrice(providerAndModelId: string, tokens: TokenUsage): PriceBreakdown | null;
export function getPrice(modelOrId: Model | string, tokens: TokenUsage): PriceBreakdown | null {
  if (typeof modelOrId === 'string') {
    const sep = modelOrId.indexOf('/');
    const model = getModel(modelOrId.slice(0, sep), modelOrId.slice(sep + 1));
    return model ? _getPrice(model, tokens) : null;
  }
  return _getPrice(modelOrId, tokens);
}

const _data = _raw as unknown as Record<string, StoredProvider>;

function toProvider(id: string, p: StoredProvider): Provider {
  return {
    id,
    name: p.name,
    models: Object.fromEntries(Object.entries(p.models).map(([mid, m]) => [mid, toModel(mid, m)])),
  };
}

export function getProviders(): Provider[] {
  return Object.entries(_data).map(([id, p]) => toProvider(id, p));
}

export function getProvider(id: string): Provider | undefined {
  const p = _data[id];
  return p ? toProvider(id, p) : undefined;
}

export function getModels(): ModelWithProvider[] {
  return Object.entries(_data).flatMap(([pid, p]) =>
    Object.entries(p.models).map(([mid, m]) => ({ ...toModel(mid, m), providerId: pid, providerName: p.name })),
  );
}

export function getModelsByProvider(providerId: string): Model[] {
  const p = _data[providerId];
  if (!p) {
    return [];
  }
  return Object.entries(p.models).map(([mid, m]) => toModel(mid, m));
}

export function getModel(providerId: string, modelId: string): Model | undefined {
  const m = _data[providerId]?.models[modelId];
  return m ? toModel(modelId, m) : undefined;
}

export function filterModels(filter: ModelFilter): ModelWithProvider[] {
  return resolveEntries(filter.provider).flatMap(([pid, p]) =>
    Object.entries(p.models)
      .filter(([, m]) => matchesFilter(m, filter))
      .map(([mid, m]) => ({ ...toModel(mid, m), providerId: pid, providerName: p.name })),
  );
}

function resolveEntries(provider?: string | string[]): [string, StoredProvider][] {
  if (!provider) {
    return Object.entries(_data);
  }
  return (Array.isArray(provider) ? provider : [provider]).flatMap((id) => {
    const p = _data[id];
    return p ? [[id, p] as [string, StoredProvider]] : [];
  });
}