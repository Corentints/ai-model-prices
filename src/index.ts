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
export type { ModelIdsByProvider, ProviderId } from './generated-types.gen.js';

import _raw from './data.json';
import { toModel, matchesFilter, type StoredProvider } from './bundle.js';
import { getPrice as _getPrice } from './pricing.js';
import type { Model, ModelFilter, ModelWithProvider, PriceBreakdown, Provider, TokenUsage } from './types.js';
import type { ModelIdsByProvider, ProviderId } from './generated-types.gen.js';

export function getPrice(model: Model, tokens: TokenUsage): PriceBreakdown | null;
export function getPrice(providerAndModelId: string, tokens: TokenUsage): PriceBreakdown | null;
export function getPrice<P extends ProviderId>(
  provider: P,
  model: ModelIdsByProvider[P],
  tokens: TokenUsage,
): PriceBreakdown | null;
export function getPrice(
  modelOrId: Model | string,
  tokensOrModelId: TokenUsage | string,
  tokens?: TokenUsage,
): PriceBreakdown | null {
  if (typeof tokensOrModelId === 'string') {
    const model = getModel(modelOrId as ProviderId, tokensOrModelId as never);
    return model && tokens ? _getPrice(model, tokens) : null;
  }
  if (typeof modelOrId === 'string') {
    const sep = modelOrId.indexOf('/');
    const model = getModel(modelOrId.slice(0, sep) as ProviderId, modelOrId.slice(sep + 1) as never);
    return model ? _getPrice(model, tokensOrModelId) : null;
  }
  return _getPrice(modelOrId, tokensOrModelId);
}

const _data = _raw as unknown as Record<string, StoredProvider>;

function toProvider(id: string, stored: StoredProvider): Provider {
  return {
    id,
    name: stored.name,
    models: Object.fromEntries(
      Object.entries(stored.models).map(([modelId, storedModel]) => [modelId, toModel(modelId, storedModel)]),
    ),
  };
}

export function getProviders(): Provider[] {
  return Object.entries(_data).map(([id, stored]) => toProvider(id, stored));
}

export function getProvider(id: ProviderId): Provider | undefined {
  const stored = _data[id];
  return stored ? toProvider(id, stored) : undefined;
}

export function getModels(): ModelWithProvider[] {
  return Object.entries(_data).flatMap(([providerId, provider]) =>
    Object.entries(provider.models).map(([modelId, storedModel]) => ({
      ...toModel(modelId, storedModel),
      providerId,
      providerName: provider.name,
    })),
  );
}

export function getModelsByProvider(providerId: ProviderId): Model[] {
  const provider = _data[providerId];
  if (!provider) {
    return [];
  }
  return Object.entries(provider.models).map(([modelId, storedModel]) => toModel(modelId, storedModel));
}

export function getModel<P extends ProviderId>(providerId: P, modelId: ModelIdsByProvider[P]): Model | undefined {
  const storedModel = _data[providerId]?.models[modelId];
  return storedModel ? toModel(modelId, storedModel) : undefined;
}

export function filterModels(filter: ModelFilter): ModelWithProvider[] {
  return resolveEntries(filter.provider as string | string[]).flatMap(([providerId, provider]) =>
    Object.entries(provider.models)
      .filter(([, storedModel]) => matchesFilter(storedModel, filter))
      .map(([modelId, storedModel]) => ({
        ...toModel(modelId, storedModel),
        providerId,
        providerName: provider.name,
      })),
  );
}

function resolveEntries(provider?: string | string[]): [string, StoredProvider][] {
  if (!provider) {
    return Object.entries(_data);
  }
  return (Array.isArray(provider) ? provider : [provider]).flatMap((id) => {
    const stored = _data[id];
    return stored ? [[id, stored] as [string, StoredProvider]] : [];
  });
}
