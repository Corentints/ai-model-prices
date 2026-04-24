import type { Model, PriceBreakdown, TokenUsage } from './types.js';

const M = 1_000_000;

/** Calculates the cost in USD for a given model and token usage. Returns `null` if the model has no pricing data. */
export function getPrice(model: Model, tokens: TokenUsage): PriceBreakdown | null {
  if (!model.cost) {
    return null;
  }

  const cost = model.cost;
  const inputTokens = tokens.noCacheInput ?? 0;
  const outputTokens = tokens.noCacheOutput ?? 0;
  const over200k = cost.context_over_200k != null && inputTokens + outputTokens > 200_000;
  const inputRate = over200k ? (cost.context_over_200k!.input ?? cost.input) : cost.input;
  const outputRate = over200k ? (cost.context_over_200k!.output ?? cost.output) : cost.output;

  const noCacheInput = (inputTokens / M) * inputRate;
  const noCacheOutput = (outputTokens / M) * outputRate;
  const reasoning = ((tokens.reasoning ?? 0) / M) * (cost.reasoning ?? cost.output);
  const cacheInput = ((tokens.cacheInput ?? 0) / M) * (cost.cache_read ?? 0);
  const cacheWrite = ((tokens.cacheWrite ?? 0) / M) * (cost.cache_write ?? 0);
  const audio =
    ((tokens.inputAudio ?? 0) / M) * (cost.input_audio ?? 0) +
    ((tokens.outputAudio ?? 0) / M) * (cost.output_audio ?? 0);

  return {
    noCacheInput,
    noCacheOutput,
    reasoning,
    cacheInput,
    cacheWrite,
    audio,
    total: noCacheInput + noCacheOutput + reasoning + cacheInput + cacheWrite + audio,
  };
}
