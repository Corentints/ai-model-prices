# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**182 providers · 6410 models · Updated 2026-08-19**
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
| HPC-AI | `hpc-ai` |
| AI-ROUTER | `ai-router` |
| Mixlayer | `mixlayer` |
| Qiniu | `qiniu-ai` |
| Neuralwatt | `neuralwatt` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Meganova | `meganova` |
| Infomaniak | `infomaniak` |
| OrcaRouter | `orcarouter` |
| Zenifra | `zenifra` |
| Nvidia | `nvidia` |
| QVAC | `qvac` |
| iFlow | `iflowcn` |
| Claudinio | `claudinio` |
| Cortecs | `cortecs` |
| NanoGPT | `nano-gpt` |
| ModelScope | `modelscope` |
| Synthetic | `synthetic` |
| Jalapeno Cloud | `jalapeno` |
| abliteration.ai | `abliteration-ai` |
| DeepSeek | `deepseek` |
| GreenPT | `greenpt` |
| Xpersona | `xpersona` |
| Tencent TokenHub | `tencent-tokenhub` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Vertex | `google-vertex` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Google | `google` |
| Deep Infra | `deepinfra` |
| Meta | `meta` |
| Hugging Face | `huggingface` |
| Impossibl | `impossibl` |
| Jiekou.AI | `jiekou` |
| LongCat | `longcat` |
| Inception | `inception` |
| OpenRouter | `openrouter` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Poolside | `poolside` |
| Hetzner | `hetzner` |
| Regolo AI | `regolo-ai` |
| Lynkr | `lynkr` |
| LucidQuery | `lucidquery` |
| Auriko | `auriko` |
| DaoXE | `daoxe` |
| Moonshot AI | `moonshotai` |
| CrossModel | `crossmodel` |
| Kenari | `kenari` |
| Clarifai | `clarifai` |
| Anthropic | `anthropic` |
| Cohere | `cohere` |
| Z.AI | `zai` |
| routing.run | `routing-run` |
| STACKIT | `stackit` |
| Databricks | `databricks` |
| Moark | `moark` |
| SaladCloud AI Gateway | `salad-cloud` |
| Alibaba (China) | `alibaba-cn` |
| Kosmik Compute | `kosmik` |
| MiniMax Token Plan (minimaxi.com) | `minimax-cn-coding-plan` |
| Amazon Bedrock | `amazon-bedrock` |
| UnoRouter | `unorouter` |
| Crusoe | `crusoe` |
| DInference | `dinference` |
| OpenAI | `openai` |
| OpenCode Go | `opencode-go` |
| xAI | `xai` |
| StepFun (Global) | `stepfun-ai` |
| LMStudio | `lmstudio` |
| Ambient | `ambient` |
| Vivgrid | `vivgrid` |
| Nebius Token Factory | `nebius` |
| Echo | `echo` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| NEAR AI Cloud | `nearai` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Tinfoil | `tinfoil` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| LLMTR | `llmtr` |
| Merge Gateway | `merge-gateway` |
| Inceptron | `inceptron` |
| OVHcloud AI Endpoints | `ovhcloud` |
| AKI.IO | `aki-io` |
| StepFun (China) | `stepfun` |
| Llama | `llama` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| D.Run (China) | `drun` |
| DigitalOcean | `digitalocean` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| FastRouter | `fastrouter` |
| Privatemode AI | `privatemode-ai` |
| Zeldoc | `zeldoc` |
| Lilac | `lilac` |
| IO.NET | `io-net` |
| Berget.AI | `berget` |
| Xiaomi | `xiaomi` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Alibaba | `alibaba` |
| Sakana AI | `sakana` |
| ZenMux | `zenmux` |
| Perplexity Agent | `perplexity-agent` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Perplexity | `perplexity` |
| GMI Cloud | `gmicloud` |
| Umans AI | `umans-ai` |
| SAP AI Core | `sap-ai-core` |
| Inference | `inference` |
| Arcee | `arcee` |
| QiHang | `qihang-ai` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| submodel | `submodel` |
| SCX.ai | `scx-ai` |
| FreeModel | `freemodel` |
| Nova | `nova` |
| Together AI | `togetherai` |
| Ofox | `ofox` |
| Friendli | `friendli` |
| InferX | `inferx` |
| Helicone | `helicone` |
| Zhipu AI | `zhipuai` |
| Neon | `neon` |
| evroc | `evroc` |
| Azure Cognitive Services | `azure-cognitive-services` |
| 302.AI | `302ai` |
| OpenCode Zen | `opencode` |
| Requesty | `requesty` |
| SiliconFlow | `siliconflow` |
| Atomic Chat | `atomic-chat` |
| Charm Hyper | `hyper` |
| Subconscious | `subconscious` |
| Azure | `azure` |
| Scaleway | `scaleway` |
| FrogBot | `frogbot` |
| Thinking Machines | `thinkingmachines` |
| Baseten | `baseten` |
| SiliconFlow (China) | `siliconflow-cn` |
| MiniMax (minimaxi.com) | `minimax-cn` |
| Poe | `poe` |
| Mistral | `mistral` |
| Modal | `modal` |
| AIHubMix | `aihubmix` |
| ClinePass | `cline-pass` |
| EmpirioLabs AI | `empiriolabs` |
| Morph | `morph` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| SCNet Token Plan | `scnet-token-plan` |
| Cerebras | `cerebras` |
| AMD | `amd` |
| Bailing | `bailing` |
| watsonx.ai | `watsonx` |
| Vercel AI Gateway | `vercel` |
| Eden AI | `edenai` |
| NovitaAI | `novita-ai` |
| Upstage | `upstage` |
| LLM Gateway | `llmgateway` |
| Chutes | `chutes` |
| CrofAI | `crof` |
| v0 | `v0` |
| Groq | `groq` |
| RunInfra | `runinfra` |
| GitLab Duo | `gitlab` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| CoralBricks | `coralbricks` |
| ai& | `aiand` |
| GitHub Copilot | `github-copilot` |
| Wafer | `wafer.ai` |
| Modelis | `modelis` |
| EBCloud | `ebcloud` |
| TensorX | `tensorx` |
| Tencent Token Plan | `tencent-token-plan` |
| Kilo Gateway | `kilo` |
| Pioneer | `pioneer` |
| Venice AI | `venice` |
| Fireworks AI | `fireworks-ai` |
| Moonshot AI (China) | `moonshotai-cn` |
| Weights & Biases | `wandb` |
| Kimi For Coding | `kimi-for-coding` |
| Abacus | `abacus` |
| MiniMax (minimax.io) | `minimax` |
| Vultr | `vultr` |
<!-- PROVIDERS:END -->

## License

MIT
