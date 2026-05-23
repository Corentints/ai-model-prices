# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**131 providers · 4608 models · Updated 2026-05-23**
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
| Helicone | `helicone` |
| Auriko | `auriko` |
| Fireworks (Firepass) | `firepass` |
| NanoGPT | `nano-gpt` |
| IO.NET | `io-net` |
| Inception | `inception` |
| submodel | `submodel` |
| Requesty | `requesty` |
| Z.AI | `zai` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Deep Infra | `deepinfra` |
| Clarifai | `clarifai` |
| Moark | `moark` |
| FrogBot | `frogbot` |
| Cohere | `cohere` |
| Weights & Biases | `wandb` |
| GMI Cloud | `gmicloud` |
| CrofAI | `crof` |
| Ambient | `ambient` |
| routing.run | `routing-run` |
| FastRouter | `fastrouter` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Cortecs | `cortecs` |
| Baseten | `baseten` |
| Llama | `llama` |
| NovitaAI | `novita-ai` |
| DigitalOcean | `digitalocean` |
| Moonshot AI | `moonshotai` |
| Mistral | `mistral` |
| Kilo Gateway | `kilo` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| LMStudio | `lmstudio` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| v0 | `v0` |
| Morph | `morph` |
| NEAR AI Cloud | `nearai` |
| Abacus | `abacus` |
| Privatemode AI | `privatemode-ai` |
| MiniMax Token Plan (minimaxi.com) | `minimax-cn-coding-plan` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| OpenAI | `openai` |
| DInference | `dinference` |
| Vivgrid | `vivgrid` |
| Cerebras | `cerebras` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Vultr | `vultr` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| ModelScope | `modelscope` |
| Kimi For Coding | `kimi-for-coding` |
| LucidQuery AI | `lucidquery` |
| Neuralwatt | `neuralwatt` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Jiekou.AI | `jiekou` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Friendli | `friendli` |
| OpenRouter | `openrouter` |
| Regolo AI | `regolo-ai` |
| Claudinio | `claudinio` |
| OrcaRouter | `orcarouter` |
| OpenCode Go | `opencode-go` |
| LLM Gateway | `llmgateway` |
| Poe | `poe` |
| MiniMax (minimax.io) | `minimax` |
| Groq | `groq` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| SiliconFlow | `siliconflow` |
| Vertex | `google-vertex` |
| Databricks | `databricks` |
| Berget.AI | `berget` |
| Moonshot AI (China) | `moonshotai-cn` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| MiniMax (minimaxi.com) | `minimax-cn` |
| Chutes | `chutes` |
| SiliconFlow (China) | `siliconflow-cn` |
| AIHubMix | `aihubmix` |
| Nvidia | `nvidia` |
| Anthropic | `anthropic` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Atomic Chat | `atomic-chat` |
| GitHub Models | `github-models` |
| Qiniu | `qiniu-ai` |
| Google | `google` |
| SAP AI Core | `sap-ai-core` |
| Scaleway | `scaleway` |
| OpenCode Zen | `opencode` |
| Mixlayer | `mixlayer` |
| ZenMux | `zenmux` |
| Perplexity Agent | `perplexity-agent` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Meganova | `meganova` |
| Synthetic | `synthetic` |
| Azure | `azure` |
| Inceptron | `inceptron` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Upstage | `upstage` |
| Amazon Bedrock | `amazon-bedrock` |
| Vercel AI Gateway | `vercel` |
| abliteration.ai | `abliteration-ai` |
| DeepSeek | `deepseek` |
| Perplexity | `perplexity` |
| iFlow | `iflowcn` |
| STACKIT | `stackit` |
| Wafer | `wafer.ai` |
| evroc | `evroc` |
| Nova | `nova` |
| Venice AI | `venice` |
| Fireworks AI | `fireworks-ai` |
| Alibaba | `alibaba` |
| 302.AI | `302ai` |
| Xpersona | `xpersona` |
| StepFun | `stepfun` |
| xAI | `xai` |
| Zhipu AI | `zhipuai` |
| Bailing | `bailing` |
| QiHang | `qihang-ai` |
| Lilac | `lilac` |
| Alibaba (China) | `alibaba-cn` |
| D.Run (China) | `drun` |
| Hugging Face | `huggingface` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Tencent TokenHub | `tencent-tokenhub` |
| GitLab Duo | `gitlab` |
| Nebius Token Factory | `nebius` |
| HPC-AI | `hpc-ai` |
| Xiaomi | `xiaomi` |
| GitHub Copilot | `github-copilot` |
| Together AI | `togetherai` |
| StepFun | `stepfun-ai` |
| Inference | `inference` |
<!-- PROVIDERS:END -->

## License

MIT
