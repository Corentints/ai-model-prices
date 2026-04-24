export type ModalityInput = 'text' | 'image' | 'audio' | 'video' | 'pdf' | (string & {});
export type ModalityOutput = 'text' | 'image' | 'audio' | (string & {});

export interface ModelModalities {
  input: ModalityInput[];
  output: ModalityOutput[];
}

export interface ModelCostContextOver200k {
  input: number;
  output: number;
  cache_read?: number;
  cache_write?: number;
  [key: string]: unknown;
}

export interface ModelCost {
  /** Cost per 1M input tokens (USD) */
  input: number;
  /** Cost per 1M output tokens (USD) */
  output: number;
  /** Cost per 1M reasoning tokens (USD) */
  reasoning?: number;
  /** Cost per 1M cache read tokens (USD) */
  cache_read?: number;
  /** Cost per 1M cache write tokens (USD) */
  cache_write?: number;
  /** Cost per 1M input audio tokens (USD) */
  input_audio?: number;
  /** Cost per 1M output audio tokens (USD) */
  output_audio?: number;
  /** Pricing override for context windows over 200k tokens */
  context_over_200k?: ModelCostContextOver200k;
}

export interface ModelLimit {
  /** Maximum context window size in tokens */
  context: number;
  /** Maximum output tokens */
  output?: number;
  /** Maximum input tokens (when different from context) */
  input?: number;
}

export interface Model {
  id: string;
  name: string;
  /** Model family (e.g. "gpt", "claude", "gemini", "llama") */
  family?: string;
  /** Supports file/image attachments */
  attachment?: boolean;
  /** Has extended reasoning / chain-of-thought capability */
  reasoning?: boolean;
  /** Supports tool/function calling */
  tool_call?: boolean;
  /** Supports temperature parameter */
  temperature?: boolean;
  /** Supports structured output / JSON mode */
  structured_output?: boolean;
  /** Supports interleaved thinking (may be an object with field config on some providers) */
  interleaved?: boolean | Record<string, unknown>;
  /** Model status (e.g. "deprecated") */
  status?: string;
  /** Knowledge cutoff date (YYYY-MM format) */
  knowledge?: string;
  /** Release date */
  release_date?: string;
  /** Last updated date */
  last_updated?: string;
  /** Whether model weights are publicly available */
  open_weights?: boolean;
  modalities?: ModelModalities;
  cost?: ModelCost;
  limit?: ModelLimit;
  /** Forward-compatible: any additional fields from the API */
  [key: string]: unknown;
}

export interface Provider {
  id: string;
  name: string;
  /** Required environment variable(s) for the API key */
  env?: string[];
  /** AI SDK npm package */
  npm?: string;
  /** Base API URL */
  api?: string;
  /** Documentation URL */
  doc?: string;
  models: Record<string, Model>;
}

export type ProvidersData = Record<string, Provider>;

export interface TokenUsage {
  /** Number of non-cached input tokens */
  noCacheInput?: number;
  /** Number of non-cached output tokens */
  noCacheOutput?: number;
  /** Number of reasoning tokens (billed separately on some models) */
  reasoning?: number;
  /** Number of cached input tokens (cache read) */
  cacheInput?: number;
  /** Number of cache write tokens */
  cacheWrite?: number;
  /** Number of input audio tokens */
  inputAudio?: number;
  /** Number of output audio tokens */
  outputAudio?: number;
}

export interface PriceBreakdown {
  /** Cost for non-cached input tokens (USD) */
  noCacheInput: number;
  /** Cost for non-cached output tokens (USD) */
  noCacheOutput: number;
  /** Cost for reasoning tokens (USD) */
  reasoning: number;
  /** Cost for cached input tokens (USD) */
  cacheInput: number;
  /** Cost for cache write tokens (USD) */
  cacheWrite: number;
  /** Cost for audio tokens (USD) */
  audio: number;
  /** Total cost (USD) */
  total: number;
}

export interface ModelWithProvider extends Model {
  /** Provider ID */
  providerId: string;
  /** Provider display name */
  providerName: string;
}

export interface ModelFilter {
  /** Filter by one or more provider IDs */
  provider?: string | string[];
  /** Filter by reasoning capability */
  reasoning?: boolean;
  /** Filter by tool call support */
  tool_call?: boolean;
  /** Filter by attachment support */
  attachment?: boolean;
  /** Filter by structured output support */
  structured_output?: boolean;
  /** Filter by open weights availability */
  open_weights?: boolean;
  /** Filter by required input modalities */
  inputModalities?: ModalityInput[];
  /** Filter by required output modalities */
  outputModalities?: ModalityOutput[];
  /** Maximum input cost per 1M tokens (USD) */
  maxInputCost?: number;
  /** Maximum output cost per 1M tokens (USD) */
  maxOutputCost?: number;
  /** Minimum context window in tokens */
  minContextWindow?: number;
}
