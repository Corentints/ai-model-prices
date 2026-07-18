# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**157 providers · 5297 models · Updated 2026-07-18**
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
| Mixlayer | `mixlayer` |
| Ambient | `ambient` |
| Claudinio | `claudinio` |
| xAI | `xai` |
| FrogBot | `frogbot` |
| Llama | `llama` |
| LucidQuery | `lucidquery` |
| GitHub Models | `github-models` |
| Mistral | `mistral` |
| Abacus | `abacus` |
| NanoGPT | `nano-gpt` |
| Pioneer | `pioneer` |
| Kimi For Coding | `kimi-for-coding` |
| CrossModel | `crossmodel` |
| evroc | `evroc` |
| Databricks | `databricks` |
| Vertex | `google-vertex` |
| Meganova | `meganova` |
| Fireworks AI | `fireworks-ai` |
| routing.run | `routing-run` |
| CrofAI | `crof` |
| AIHubMix | `aihubmix` |
| Amazon Bedrock | `amazon-bedrock` |
| GitLab Duo | `gitlab` |
| Cohere | `cohere` |
| Inference | `inference` |
| Xiaomi | `xiaomi` |
| LLM Gateway | `llmgateway` |
| Morph | `morph` |
| EmpirioLabs AI | `empiriolabs` |
| Nova | `nova` |
| Tencent Token Plan | `tencent-token-plan` |
| FreeModel | `freemodel` |
| Meta | `meta` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Clarifai | `clarifai` |
| LLMTR | `llmtr` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Hugging Face | `huggingface` |
| AI-ROUTER | `ai-router` |
| EBCloud | `ebcloud` |
| Subconscious | `subconscious` |
| Umans AI | `umans-ai` |
| StepFun (Global) | `stepfun-ai` |
| Upstage | `upstage` |
| StepFun (China) | `stepfun` |
| STACKIT | `stackit` |
| Lilac | `lilac` |
| Nvidia | `nvidia` |
| Weights & Biases | `wandb` |
| FastRouter | `fastrouter` |
| Inception | `inception` |
| Moonshot AI (China) | `moonshotai-cn` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Venice AI | `venice` |
| Berget.AI | `berget` |
| NEAR AI Cloud | `nearai` |
| Merge Gateway | `merge-gateway` |
| Azure Cognitive Services | `azure-cognitive-services` |
| UnoRouter | `unorouter` |
| Cerebras | `cerebras` |
| Kenari | `kenari` |
| Auriko | `auriko` |
| abliteration.ai | `abliteration-ai` |
| MiniMax Token Plan (minimaxi.com) | `minimax-cn-coding-plan` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| LMStudio | `lmstudio` |
| Zeldoc | `zeldoc` |
| Azure | `azure` |
| Cortecs | `cortecs` |
| Neuralwatt | `neuralwatt` |
| SAP AI Core | `sap-ai-core` |
| Perplexity Agent | `perplexity-agent` |
| Alibaba Token Plan | `alibaba-token-plan` |
| OpenCode Zen | `opencode` |
| Helicone | `helicone` |
| SiliconFlow | `siliconflow` |
| GitHub Copilot | `github-copilot` |
| HPC-AI | `hpc-ai` |
| D.Run (China) | `drun` |
| Vivgrid | `vivgrid` |
| IO.NET | `io-net` |
| Privatemode AI | `privatemode-ai` |
| Neon | `neon` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Thinking Machines | `thinkingmachines` |
| Nebius Token Factory | `nebius` |
| Perplexity | `perplexity` |
| SiliconFlow (China) | `siliconflow-cn` |
| v0 | `v0` |
| Moark | `moark` |
| Qiniu | `qiniu-ai` |
| OpenCode Go | `opencode-go` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| DigitalOcean | `digitalocean` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Requesty | `requesty` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Atomic Chat | `atomic-chat` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Sakana AI | `sakana` |
| Xpersona | `xpersona` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Z.AI | `zai` |
| Vultr | `vultr` |
| DInference | `dinference` |
| Synthetic | `synthetic` |
| GMI Cloud | `gmicloud` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Anthropic | `anthropic` |
| Kilo Gateway | `kilo` |
| Scaleway | `scaleway` |
| Tencent TokenHub | `tencent-tokenhub` |
| Deep Infra | `deepinfra` |
| Zenifra | `zenifra` |
| Moonshot AI | `moonshotai` |
| OpenRouter | `openrouter` |
| submodel | `submodel` |
| Regolo AI | `regolo-ai` |
| Lynkr | `lynkr` |
| Jiekou.AI | `jiekou` |
| Baseten | `baseten` |
| 302.AI | `302ai` |
| MiniMax (minimax.io) | `minimax` |
| Alibaba | `alibaba` |
| ModelScope | `modelscope` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Tinfoil | `tinfoil` |
| DaoXE | `daoxe` |
| MiniMax (minimaxi.com) | `minimax-cn` |
| Bailing | `bailing` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| OrcaRouter | `orcarouter` |
| Together AI | `togetherai` |
| Vercel AI Gateway | `vercel` |
| QiHang | `qihang-ai` |
| DeepSeek | `deepseek` |
| LongCat | `longcat` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| NovitaAI | `novita-ai` |
| Zhipu AI | `zhipuai` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Friendli | `friendli` |
| InferX | `inferx` |
| Poe | `poe` |
| Chutes | `chutes` |
| Google | `google` |
| Wafer | `wafer.ai` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Alibaba (China) | `alibaba-cn` |
| OpenAI | `openai` |
| iFlow | `iflowcn` |
| Groq | `groq` |
| ZenMux | `zenmux` |
| Poolside | `poolside` |
| Inceptron | `inceptron` |
<!-- PROVIDERS:END -->

## License

MIT
