import type { Model, ModelCost, ModelFilter } from './types.js';

export interface StoredModel {
  name: string;
  cost: ModelCost;
  limit?: { context: number };
}

export interface StoredProvider {
  name: string;
  models: Record<string, StoredModel>;
}

export function toModel(id: string, m: StoredModel): Model {
  return { id, name: m.name, cost: m.cost, ...(m.limit ? { limit: m.limit } : {}) };
}

export function matchesFilter(m: StoredModel, filter: ModelFilter): boolean {
  if (filter.maxInputCost != null && m.cost.input > filter.maxInputCost) {
    return false;
  }
  if (filter.maxOutputCost != null && m.cost.output > filter.maxOutputCost) {
    return false;
  }
  if (filter.minContextWindow != null && (m.limit?.context == null || m.limit.context < filter.minContextWindow)) {
    return false;
  }
  return true;
}
