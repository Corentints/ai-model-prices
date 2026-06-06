# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**134 providers · 4844 models · Updated 2026-06-06**
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
| Upstage | `upstage` |
| Clarifai | `clarifai` |
| Fireworks AI | `fireworks-ai` |
| Ambient | `ambient` |
| STACKIT | `stackit` |
| OVHcloud AI Endpoints | `ovhcloud` |
| iFlow | `iflowcn` |
| 302.AI | `302ai` |
| NanoGPT | `nano-gpt` |
| Alibaba (China) | `alibaba-cn` |
| DigitalOcean | `digitalocean` |
| submodel | `submodel` |
| Bailing | `bailing` |
| Kimi For Coding | `kimi-for-coding` |
| DInference | `dinference` |
| NovitaAI | `novita-ai` |
| Kilo Gateway | `kilo` |
| Regolo AI | `regolo-ai` |
| Vertex | `google-vertex` |
| DeepSeek | `deepseek` |
| OrcaRouter | `orcarouter` |
| Moonshot AI (China) | `moonshotai-cn` |
| MiniMax Token Plan (minimaxi.com) | `minimax-cn-coding-plan` |
| Inception | `inception` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Chutes | `chutes` |
| CrofAI | `crof` |
| FrogBot | `frogbot` |
| Anthropic | `anthropic` |
| Alibaba | `alibaba` |
| Xiaomi | `xiaomi` |
| Mistral | `mistral` |
| Vivgrid | `vivgrid` |
| Databricks | `databricks` |
| SiliconFlow (China) | `siliconflow-cn` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| xAI | `xai` |
| v0 | `v0` |
| Neuralwatt | `neuralwatt` |
| Friendli | `friendli` |
| GitHub Copilot | `github-copilot` |
| Inference | `inference` |
| Hugging Face | `huggingface` |
| Cohere | `cohere` |
| Azure Cognitive Services | `azure-cognitive-services` |
| OpenRouter | `openrouter` |
| Privatemode AI | `privatemode-ai` |
| Moonshot AI | `moonshotai` |
| Perplexity | `perplexity` |
| LLM Gateway | `llmgateway` |
| Together AI | `togetherai` |
| Moark | `moark` |
| GitHub Models | `github-models` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| LMStudio | `lmstudio` |
| ZenMux | `zenmux` |
| Claudinio | `claudinio` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| ModelScope | `modelscope` |
| QiHang | `qihang-ai` |
| AIHubMix | `aihubmix` |
| Poe | `poe` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Fireworks (Firepass) | `firepass` |
| GMI Cloud | `gmicloud` |
| Mixlayer | `mixlayer` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| evroc | `evroc` |
| Nvidia | `nvidia` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| routing.run | `routing-run` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Deep Infra | `deepinfra` |
| Zhipu AI | `zhipuai` |
| IO.NET | `io-net` |
| Groq | `groq` |
| SAP AI Core | `sap-ai-core` |
| Lilac | `lilac` |
| StepFun AI | `stepfun-ai` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| OpenCode Go | `opencode-go` |
| GitLab Duo | `gitlab` |
| Cortecs | `cortecs` |
| Auriko | `auriko` |
| Wafer | `wafer.ai` |
| Berget.AI | `berget` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Requesty | `requesty` |
| Venice AI | `venice` |
| Azure | `azure` |
| Atomic Chat | `atomic-chat` |
| Merge Gateway | `merge-gateway` |
| StepFun | `stepfun` |
| Vultr | `vultr` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Amazon Bedrock | `amazon-bedrock` |
| Synthetic | `synthetic` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Helicone | `helicone` |
| Z.AI | `zai` |
| Nova | `nova` |
| NEAR AI Cloud | `nearai` |
| Inceptron | `inceptron` |
| Xpersona | `xpersona` |
| Perplexity Agent | `perplexity-agent` |
| Jiekou.AI | `jiekou` |
| abliteration.ai | `abliteration-ai` |
| MiniMax (minimaxi.com) | `minimax-cn` |
| Qiniu | `qiniu-ai` |
| Morph | `morph` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| FastRouter | `fastrouter` |
| SiliconFlow | `siliconflow` |
| Vercel AI Gateway | `vercel` |
| Abacus | `abacus` |
| D.Run (China) | `drun` |
| Google | `google` |
| Weights & Biases | `wandb` |
| Meganova | `meganova` |
| OpenCode Zen | `opencode` |
| OpenAI | `openai` |
| Poolside | `poolside` |
| Baseten | `baseten` |
| LucidQuery AI | `lucidquery` |
| Scaleway | `scaleway` |
| Cerebras | `cerebras` |
| HPC-AI | `hpc-ai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Tencent TokenHub | `tencent-tokenhub` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Nebius Token Factory | `nebius` |
| MiniMax (minimax.io) | `minimax` |
| Llama | `llama` |
<!-- PROVIDERS:END -->

## License

MIT
