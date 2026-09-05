# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**202 providers · 7126 models · Updated 2026-09-05**
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
| Subconscious | `subconscious` |
| TokenGo | `tokengo` |
| Modelis | `modelis` |
| Bothub | `bothub` |
| GreenPT | `greenpt` |
| Qiniu | `qiniu-ai` |
| Ambient | `ambient` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| NanoGPT | `nano-gpt` |
| watsonx.ai | `watsonx` |
| DigitalOcean | `digitalocean` |
| Vivgrid | `vivgrid` |
| Auriko | `auriko` |
| SiliconFlow (China) | `siliconflow-cn` |
| Nova | `nova` |
| Inceptron | `inceptron` |
| Vultr | `vultr` |
| FreeModel | `freemodel` |
| iFlow | `iflowcn` |
| SCX.ai | `scx-ai` |
| evroc | `evroc` |
| Echo | `echo` |
| Aixy | `aixy` |
| Impossibl | `impossibl` |
| LLM Gateway | `llmgateway-providers` |
| Llama | `llama` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Neuralwatt | `neuralwatt` |
| abliteration.ai | `abliteration-ai` |
| Clarifai | `clarifai` |
| Morph | `morph` |
| AIHubMix | `aihubmix` |
| Chutes | `chutes` |
| Groq | `groq` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Volcengine Ark | `volcengine` |
| SenseNova (China) | `sensenova` |
| OrcaRouter | `orcarouter` |
| routing.run | `routing-run` |
| LLM Tech | `llmtech` |
| SAP AI Core | `sap-ai-core` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Regolo AI | `regolo-ai` |
| Kenari | `kenari` |
| Vertex | `google-vertex` |
| StepFun (Global) | `stepfun-ai` |
| Pendra | `pendra` |
| above.dev | `above` |
| Scaleway | `scaleway` |
| Alibaba (China) | `alibaba-cn` |
| Poe | `poe` |
| ModelScope | `modelscope` |
| Poolside | `poolside` |
| Claudinio | `claudinio` |
| NovitaAI | `novita-ai` |
| Nebius Token Factory | `nebius` |
| MiniMax Token Plan (minimaxi.com) | `minimax-cn-coding-plan` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Zeldoc | `zeldoc` |
| DInference | `dinference` |
| Pioneer | `pioneer` |
| Helicone | `helicone` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| StepFun (China) | `stepfun` |
| UnoRouter | `unorouter` |
| CoralBricks | `coralbricks` |
| Charm Hyper | `hyper` |
| Requesty | `requesty` |
| LLMTR | `llmtr` |
| Xiaomi | `xiaomi` |
| Hugging Face | `huggingface` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| DaoXE | `daoxe` |
| CrossModel | `crossmodel` |
| MiniMax (minimax.io) | `minimax` |
| SaladCloud AI Gateway | `salad-cloud` |
| AKI.IO | `aki-io` |
| Alibaba | `alibaba` |
| Nvidia | `nvidia` |
| Jiekou.AI | `jiekou` |
| FrogBot | `frogbot` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Xpersona | `xpersona` |
| Anthropic | `anthropic` |
| Google | `google` |
| Baseten | `baseten` |
| Vercel AI Gateway | `vercel` |
| QVAC | `qvac` |
| Weights & Biases | `wandb` |
| Friendli | `friendli` |
| TokenRouter | `tokenrouter` |
| Thinking Machines | `thinkingmachines` |
| Standard Compute | `standardcompute` |
| TensorX | `tensorx` |
| Meta | `meta` |
| Venice AI | `venice` |
| GMI Cloud | `gmicloud` |
| IO.NET | `io-net` |
| DevPass (LLM Gateway) | `llmgateway` |
| Infomaniak | `infomaniak` |
| Inception | `inception` |
| Lilac | `lilac` |
| FastRouter | `fastrouter` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| GitHub Copilot | `github-copilot` |
| Zhipu AI | `zhipuai` |
| Jalapeno Cloud | `jalapeno` |
| Perplexity Agent | `perplexity-agent` |
| Fireworks AI | `fireworks-ai` |
| Opper | `opper` |
| STACKIT | `stackit` |
| CrofAI | `crof` |
| Crusoe | `crusoe` |
| EmpirioLabs AI | `empiriolabs` |
| klokintegration.se | `klokintegration` |
| Privatemode AI | `privatemode-ai` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| InferX | `inferx` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Databricks | `databricks` |
| Modal | `modal` |
| LucidQuery | `lucidquery` |
| Atomic Chat | `atomic-chat` |
| Umans AI | `umans-ai` |
| Sakana AI | `sakana` |
| Deep Infra | `deepinfra` |
| Wafer | `wafer.ai` |
| Kilo Gateway | `kilo` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| submodel | `submodel` |
| OpenReason | `openreason` |
| Azure | `azure` |
| Amazon Bedrock | `amazon-bedrock` |
| Merge Gateway | `merge-gateway` |
| DeepSeek | `deepseek` |
| Abacus | `abacus` |
| Kosmik Compute | `kosmik` |
| OpenCode Zen | `opencode` |
| Moonshot AI (China) | `moonshotai-cn` |
| NEAR AI Cloud | `nearai` |
| OpenRouter | `openrouter` |
| ClinePass | `cline-pass` |
| IteraCompute | `iteracompute` |
| Ofox | `ofox` |
| Arcee | `arcee` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| EBCloud | `ebcloud` |
| Agnes AI | `agnes` |
| AMD | `amd` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Neon | `neon` |
| QiHang | `qihang-ai` |
| SCNet Token Plan | `scnet-token-plan` |
| Inference | `inference` |
| OpenAI | `openai` |
| ai& | `aiand` |
| SiliconFlow | `siliconflow` |
| Hetzner | `hetzner` |
| Meganova | `meganova` |
| Moonshot AI | `moonshotai` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| 302.AI | `302ai` |
| Cohere | `cohere` |
| Upstage | `upstage` |
| xAI | `xai` |
| Zenifra | `zenifra` |
| Z.AI | `zai` |
| Bailing | `bailing` |
| Tencent TokenHub | `tencent-tokenhub` |
| RunInfra | `runinfra` |
| AI-ROUTER | `ai-router` |
| Berget.AI | `berget` |
| Mistral | `mistral` |
| Synthetic | `synthetic` |
| Mixlayer | `mixlayer` |
| LongCat | `longcat` |
| Cerebras | `cerebras` |
| Together AI | `togetherai` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Moark | `moark` |
| ZenMux | `zenmux` |
| Vancine | `vancine` |
| MiniMax (minimaxi.com) | `minimax-cn` |
| Cortecs | `cortecs` |
| HPC-AI | `hpc-ai` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| v0 | `v0` |
| NaN | `nan` |
| Perplexity | `perplexity` |
| Kimi For Coding | `kimi-for-coding` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| D.Run (China) | `drun` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| OpenCode Go | `opencode-go` |
| Tencent Token Plan | `tencent-token-plan` |
| GitLab Duo | `gitlab` |
| NeoSmith | `neosmith` |
| Tinfoil | `tinfoil` |
| Eden AI | `edenai` |
| LMStudio | `lmstudio` |
| Lynkr | `lynkr` |
<!-- PROVIDERS:END -->

## License

MIT
