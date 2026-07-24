# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**160 providers · 5393 models · Updated 2026-07-24**
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
| Zhipu AI | `zhipuai` |
| LucidQuery | `lucidquery` |
| Tencent TokenHub | `tencent-tokenhub` |
| Fireworks AI | `fireworks-ai` |
| Weights & Biases | `wandb` |
| CrossModel | `crossmodel` |
| LLMTR | `llmtr` |
| Claudinio | `claudinio` |
| Cohere | `cohere` |
| OpenCode Go | `opencode-go` |
| Poe | `poe` |
| Baseten | `baseten` |
| Nvidia | `nvidia` |
| Nebius Token Factory | `nebius` |
| Vivgrid | `vivgrid` |
| Google | `google` |
| Thinking Machines | `thinkingmachines` |
| Lilac | `lilac` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| NanoGPT | `nano-gpt` |
| FastRouter | `fastrouter` |
| NEAR AI Cloud | `nearai` |
| DaoXE | `daoxe` |
| CrofAI | `crof` |
| abliteration.ai | `abliteration-ai` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| LLM Gateway | `llmgateway` |
| Kenari | `kenari` |
| Friendli | `friendli` |
| OpenCode Zen | `opencode` |
| Sakana AI | `sakana` |
| Atomic Chat | `atomic-chat` |
| Inception | `inception` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| ModelScope | `modelscope` |
| GitHub Copilot | `github-copilot` |
| 302.AI | `302ai` |
| Helicone | `helicone` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| submodel | `submodel` |
| Neon | `neon` |
| Ambient | `ambient` |
| DInference | `dinference` |
| Privatemode AI | `privatemode-ai` |
| UnoRouter | `unorouter` |
| FrogBot | `frogbot` |
| SAP AI Core | `sap-ai-core` |
| Upstage | `upstage` |
| ClinePass | `cline-pass` |
| Regolo AI | `regolo-ai` |
| Pioneer | `pioneer` |
| SiliconFlow | `siliconflow` |
| AI-ROUTER | `ai-router` |
| ZenMux | `zenmux` |
| Inference | `inference` |
| evroc | `evroc` |
| Abacus | `abacus` |
| Inceptron | `inceptron` |
| EmpirioLabs AI | `empiriolabs` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Meta | `meta` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Wafer | `wafer.ai` |
| Clarifai | `clarifai` |
| iFlow | `iflowcn` |
| GitLab Duo | `gitlab` |
| Bailing | `bailing` |
| Venice AI | `venice` |
| Mixlayer | `mixlayer` |
| Scaleway | `scaleway` |
| Together AI | `togetherai` |
| DigitalOcean | `digitalocean` |
| Moonshot AI (China) | `moonshotai-cn` |
| D.Run (China) | `drun` |
| LMStudio | `lmstudio` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Zeldoc | `zeldoc` |
| Auriko | `auriko` |
| Azure | `azure` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| QiHang | `qihang-ai` |
| Berget.AI | `berget` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Moark | `moark` |
| Nova | `nova` |
| Vultr | `vultr` |
| IO.NET | `io-net` |
| Neuralwatt | `neuralwatt` |
| AKI.IO | `aki-io` |
| xAI | `xai` |
| Zenifra | `zenifra` |
| AIHubMix | `aihubmix` |
| Morph | `morph` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Mistral | `mistral` |
| Umans AI | `umans-ai` |
| Ofox | `ofox` |
| OrcaRouter | `orcarouter` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| v0 | `v0` |
| Poolside | `poolside` |
| routing.run | `routing-run` |
| Vertex | `google-vertex` |
| Tencent Token Plan | `tencent-token-plan` |
| Synthetic | `synthetic` |
| Z.AI Coding Plan | `zai-coding-plan` |
| GMI Cloud | `gmicloud` |
| FreeModel | `freemodel` |
| Amazon Bedrock | `amazon-bedrock` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| MiniMax (minimax.io) | `minimax` |
| Groq | `groq` |
| DeepSeek | `deepseek` |
| Kimi For Coding | `kimi-for-coding` |
| Requesty | `requesty` |
| Llama | `llama` |
| Kilo Gateway | `kilo` |
| Merge Gateway | `merge-gateway` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Subconscious | `subconscious` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Alibaba | `alibaba` |
| GitHub Models | `github-models` |
| Vercel AI Gateway | `vercel` |
| Alibaba (China) | `alibaba-cn` |
| NovitaAI | `novita-ai` |
| OpenRouter | `openrouter` |
| Hugging Face | `huggingface` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| SiliconFlow (China) | `siliconflow-cn` |
| Tinfoil | `tinfoil` |
| Xiaomi | `xiaomi` |
| STACKIT | `stackit` |
| Deep Infra | `deepinfra` |
| Anthropic | `anthropic` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Lynkr | `lynkr` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| StepFun (Global) | `stepfun-ai` |
| Chutes | `chutes` |
| Cerebras | `cerebras` |
| Qiniu | `qiniu-ai` |
| LongCat | `longcat` |
| Jiekou.AI | `jiekou` |
| Perplexity | `perplexity` |
| Perplexity Agent | `perplexity-agent` |
| Moonshot AI | `moonshotai` |
| OpenAI | `openai` |
| Xpersona | `xpersona` |
| Z.AI | `zai` |
| InferX | `inferx` |
| Meganova | `meganova` |
| StepFun (China) | `stepfun` |
| Cortecs | `cortecs` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| HPC-AI | `hpc-ai` |
| MiniMax (minimaxi.com) | `minimax-cn` |
| EBCloud | `ebcloud` |
| Databricks | `databricks` |
| MiniMax Token Plan (minimaxi.com) | `minimax-cn-coding-plan` |
<!-- PROVIDERS:END -->

## License

MIT
