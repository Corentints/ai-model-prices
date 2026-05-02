# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Typed AI model pricing data, auto-updated daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**113 providers · 4167 models · Updated 2026-05-01**
<!-- STATS:END -->

## Installation

```bash
npm install ai-model-prices
```

## Usage

### Main package

```ts
import { getPrice, findModel, findProvider, getModels } from 'ai-model-prices';

// By provider ID + model ID
getPrice('openai/gpt-4.1-mini', { noCacheInput: 1000, noCacheOutput: 500 });

// Two call signatures
getPrice('openai', 'gpt-4.1-mini', { noCacheInput: 1000, noCacheOutput: 500 });
getPrice('amazon-bedrock', 'claude-3-5-sonnet-20241022-v2:0', { noCacheInput: 500, noCacheOutput: 200 });

// Get a model
const model = getModel('openai', 'gpt-4.1-mini');

// Get a provider
const provider = getProvider('amazon-bedrock');
```

### Provider adapters

Each provider has a lightweight adapter with types scoped to that provider's models only:

```ts
import { getPrice, getModel, getProvider, getModels } from 'ai-model-prices/openai';
import { getPrice as bedrockPrice } from 'ai-model-prices/amazon-bedrock';

// Provider is pre-bound — no need to specify it
const price = getPrice('gpt-4.1-mini', { noCacheInput: 1000, noCacheOutput: 500 });
const model = getModel('gpt-4.1-mini'); // fully typed to OpenAI models only
```

### Async (lazy-loaded)

For environments where bundle size matters — loads each provider's data on demand:

```ts
import { getPrice, getModels, filterModels } from 'ai-model-prices/async';

const models = await filterModels({ maxInputCost: 1, tool_call: true });
```

## API

### `getPrice(model, tokens)`

Returns a `PriceBreakdown` or `null` if the model has no pricing data.

```ts
// Three call signatures:
getPrice(model: Model, tokens: TokenUsage): PriceBreakdown | null
getPrice('providerId/modelId', tokens: TokenUsage): PriceBreakdown | null
getPrice('providerId', 'modelId', tokens: TokenUsage): PriceBreakdown | null
```

```ts
interface TokenUsage {
  noCacheInput?: number;   // regular input tokens
  noCacheOutput?: number;  // output tokens
  cacheInput?: number;     // cache read tokens
  cacheWrite?: number;     // cache write tokens
  reasoning?: number;      // reasoning tokens (o1, etc.)
  inputAudio?: number;
  outputAudio?: number;
}

interface PriceBreakdown {
  noCacheInput: number;
  noCacheOutput: number;
  cacheInput: number;
  cacheWrite: number;
  reasoning: number;
  audio: number;
  total: number;           // USD
}
```

### `getModel(providerId, modelId)`

Strict ID lookup — fully typed, both arguments are constrained to known values.

### `getProvider(id)`

Get provider metadata by ID.

### `getModels()` / `getProviders()` / `getModelsByProvider(providerId)`

Return all models or providers from the bundled data.

### `filterModels(filter)`

```ts
filterModels({
  provider: 'openai',           // one or more provider IDs
  tool_call: true,
  reasoning: false,
  maxInputCost: 5,              // USD per 1M tokens
  maxOutputCost: 20,
  minContextWindow: 128_000,
  inputModalities: ['image'],
})
```

## Supported Providers

<!-- PROVIDERS:START -->
| Provider | ID |
|---|---|
| 302.AI | `302ai` |
| Alibaba | `alibaba` |
| Scaleway | `scaleway` |
| NanoGPT | `nano-gpt` |
| Abacus | `abacus` |
| Perplexity Agent | `perplexity-agent` |
| SiliconFlow (China) | `siliconflow-cn` |
| submodel | `submodel` |
| MiniMax Coding Plan (minimax.io) | `minimax-coding-plan` |
| Perplexity | `perplexity` |
| DeepSeek | `deepseek` |
| Llama | `llama` |
| OpenRouter | `openrouter` |
| Fireworks AI | `fireworks-ai` |
| Kimi For Coding | `kimi-for-coding` |
| Moark | `moark` |
| OpenCode Go | `opencode-go` |
| IO.NET | `io-net` |
| Alibaba (China) | `alibaba-cn` |
| MiniMax Coding Plan (minimaxi.com) | `minimax-cn-coding-plan` |
| Jiekou.AI | `jiekou` |
| Bailing | `bailing` |
| iFlow | `iflowcn` |
| v0 | `v0` |
| Hugging Face | `huggingface` |
| ZenMux | `zenmux` |
| Upstage | `upstage` |
| NovitaAI | `novita-ai` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Weights & Biases | `wandb` |
| Chutes | `chutes` |
| DInference | `dinference` |
| Vivgrid | `vivgrid` |
| Deep Infra | `deepinfra` |
| Kilo Gateway | `kilo` |
| SAP AI Core | `sap-ai-core` |
| Morph | `morph` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| GitHub Copilot | `github-copilot` |
| Mixlayer | `mixlayer` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Z.AI | `zai` |
| OpenCode Zen | `opencode` |
| StepFun | `stepfun` |
| Nebius Token Factory | `nebius` |
| Poe | `poe` |
| Helicone | `helicone` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Amazon Bedrock | `amazon-bedrock` |
| Baseten | `baseten` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Venice AI | `venice` |
| AIHubMix | `aihubmix` |
| Cerebras | `cerebras` |
| Firmware | `firmware` |
| LMStudio | `lmstudio` |
| LucidQuery AI | `lucidquery` |
| Moonshot AI (China) | `moonshotai-cn` |
| Azure Cognitive Services | `azure-cognitive-services` |
| abliteration.ai | `abliteration-ai` |
| Wafer | `wafer.ai` |
| Cohere | `cohere` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| xAI | `xai` |
| Meganova | `meganova` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| evroc | `evroc` |
| Synthetic | `synthetic` |
| Nvidia | `nvidia` |
| Inference | `inference` |
| Inception | `inception` |
| OpenAI | `openai` |
| Requesty | `requesty` |
| DigitalOcean | `digitalocean` |
| Vultr | `vultr` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Mistral | `mistral` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Friendli | `friendli` |
| Cortecs | `cortecs` |
| SiliconFlow | `siliconflow` |
| Vercel AI Gateway | `vercel` |
| MiniMax (minimax.io) | `minimax` |
| LLM Gateway | `llmgateway` |
| Vertex | `google-vertex` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Groq | `groq` |
| Azure | `azure` |
| FastRouter | `fastrouter` |
| STACKIT | `stackit` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Privatemode AI | `privatemode-ai` |
| Google | `google` |
| D.Run (China) | `drun` |
| Moonshot AI | `moonshotai` |
| Berget.AI | `berget` |
| GitHub Models | `github-models` |
| Together AI | `togetherai` |
| QiHang | `qihang-ai` |
| Tencent TokenHub | `tencent-tokenhub` |
| Anthropic | `anthropic` |
| ModelScope | `modelscope` |
| HPC-AI | `hpc-ai` |
| GitLab Duo | `gitlab` |
| Xiaomi | `xiaomi` |
| Clarifai | `clarifai` |
| MiniMax (minimaxi.com) | `minimax-cn` |
| Regolo AI | `regolo-ai` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Zhipu AI | `zhipuai` |
| Nova | `nova` |
<!-- PROVIDERS:END -->

## License

MIT
