# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**139 providers · 4914 models · Updated 2026-06-21**
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

Each provider has a lightweight adapter. Types are scoped to that provider's models only:

```ts
import { getPrice, getModel, getProvider, getModels } from 'ai-model-prices/openai';
import { getPrice as bedrockPrice } from 'ai-model-prices/amazon-bedrock';

// provider is pre-bound
const price = getPrice('gpt-4.1-mini', { noCacheInput: 1000, noCacheOutput: 500 });
const model = getModel('gpt-4.1-mini'); // typed to OpenAI models only
```

### Async (lazy-loaded)

If bundle size matters, provider data is loaded on demand:

```ts
import { getPrice, getModels, filterModels } from 'ai-model-prices/async';

const models = await filterModels({ maxInputCost: 1, tool_call: true });
```

## API

### `getPrice(model, tokens)`

Returns a `PriceBreakdown`, or `null` if the model has no pricing data.

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

Both arguments are typed to known IDs.

### `getProvider(id)`

Look up a provider by ID.

### `getModels()` / `getProviders()` / `getModelsByProvider(providerId)`

Return everything from the bundled data.

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
| Requesty | `requesty` |
| Qiniu | `qiniu-ai` |
| Alibaba (China) | `alibaba-cn` |
| Regolo AI | `regolo-ai` |
| STACKIT | `stackit` |
| Vercel AI Gateway | `vercel` |
| submodel | `submodel` |
| Hugging Face | `huggingface` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| NovitaAI | `novita-ai` |
| xAI | `xai` |
| Privatemode AI | `privatemode-ai` |
| D.Run (China) | `drun` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Moonshot AI | `moonshotai` |
| Fireworks AI | `fireworks-ai` |
| Vultr | `vultr` |
| 302.AI | `302ai` |
| Zhipu AI | `zhipuai` |
| Cortecs | `cortecs` |
| Nebius Token Factory | `nebius` |
| Auriko | `auriko` |
| StepFun AI | `stepfun-ai` |
| Vivgrid | `vivgrid` |
| Mistral | `mistral` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Bailing | `bailing` |
| Google | `google` |
| OpenCode Go | `opencode-go` |
| DigitalOcean | `digitalocean` |
| Venice AI | `venice` |
| LMStudio | `lmstudio` |
| Poolside | `poolside` |
| ZenMux | `zenmux` |
| OpenAI | `openai` |
| Berget.AI | `berget` |
| GitHub Models | `github-models` |
| Neuralwatt | `neuralwatt` |
| SiliconFlow (China) | `siliconflow-cn` |
| Merge Gateway | `merge-gateway` |
| QiHang | `qihang-ai` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| ModelScope | `modelscope` |
| Groq | `groq` |
| Mixlayer | `mixlayer` |
| OrcaRouter | `orcarouter` |
| Helicone | `helicone` |
| Z.AI | `zai` |
| NEAR AI Cloud | `nearai` |
| LLM Gateway | `llmgateway` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Abacus | `abacus` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Moonshot AI (China) | `moonshotai-cn` |
| Morph | `morph` |
| Deep Infra | `deepinfra` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| v0 | `v0` |
| Azure | `azure` |
| Cerebras | `cerebras` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Nvidia | `nvidia` |
| evroc | `evroc` |
| Xiaomi | `xiaomi` |
| Inception | `inception` |
| Anthropic | `anthropic` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| FreeModel | `freemodel` |
| SAP AI Core | `sap-ai-core` |
| OpenCode Zen | `opencode` |
| Inference | `inference` |
| Inceptron | `inceptron` |
| Llama | `llama` |
| LLMTR | `llmtr` |
| Cohere | `cohere` |
| StepFun | `stepfun` |
| HPC-AI | `hpc-ai` |
| MiniMax (minimaxi.com) | `minimax-cn` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Poe | `poe` |
| Kimi For Coding | `kimi-for-coding` |
| DInference | `dinference` |
| Perplexity Agent | `perplexity-agent` |
| SiliconFlow | `siliconflow` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| IO.NET | `io-net` |
| GMI Cloud | `gmicloud` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Zeldoc | `zeldoc` |
| Scaleway | `scaleway` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Friendli | `friendli` |
| Tencent TokenHub | `tencent-tokenhub` |
| Weights & Biases | `wandb` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| GitLab Duo | `gitlab` |
| Kilo Gateway | `kilo` |
| LucidQuery | `lucidquery` |
| Meganova | `meganova` |
| Perplexity | `perplexity` |
| Amazon Bedrock | `amazon-bedrock` |
| Umans AI | `umans-ai` |
| Together AI | `togetherai` |
| FrogBot | `frogbot` |
| OpenRouter | `openrouter` |
| Jiekou.AI | `jiekou` |
| Nova | `nova` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Alibaba | `alibaba` |
| Databricks | `databricks` |
| CrofAI | `crof` |
| FastRouter | `fastrouter` |
| abliteration.ai | `abliteration-ai` |
| Xpersona | `xpersona` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Baseten | `baseten` |
| Atomic Chat | `atomic-chat` |
| routing.run | `routing-run` |
| AIHubMix | `aihubmix` |
| Vertex | `google-vertex` |
| NanoGPT | `nano-gpt` |
| Moark | `moark` |
| Lilac | `lilac` |
| Ambient | `ambient` |
| Neon | `neon` |
| Upstage | `upstage` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Chutes | `chutes` |
| MiniMax Token Plan (minimaxi.com) | `minimax-cn-coding-plan` |
| DeepSeek | `deepseek` |
| Wafer | `wafer.ai` |
| MiniMax (minimax.io) | `minimax` |
| GitHub Copilot | `github-copilot` |
| Clarifai | `clarifai` |
| Synthetic | `synthetic` |
| iFlow | `iflowcn` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Claudinio | `claudinio` |
<!-- PROVIDERS:END -->

## License

MIT
