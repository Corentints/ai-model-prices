# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8531 models · Updated 2026-11-04**
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
| GitLab Duo | `gitlab` |
| routing.run | `routing-run` |
| Ollama Cloud | `ollama-cloud` |
| Zhipu AI | `zhipuai` |
| Hopper | `hopper` |
| Zeldoc | `zeldoc` |
| Sarvam AI | `sarvam` |
| NaN | `nan` |
| FastRouter | `fastrouter` |
| ai& | `aiand` |
| Merge Gateway | `merge-gateway` |
| Vultr | `vultr` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| OpenCode Go | `opencode-go` |
| AIHubMix | `aihubmix` |
| Poe | `poe` |
| GitHub Copilot | `github-copilot` |
| Aixy | `aixy` |
| Standard Compute | `standardcompute` |
| ModelScope | `modelscope` |
| SaladCloud AI Gateway | `salad-cloud` |
| GMI Cloud | `gmicloud` |
| Thinking Machines | `thinkingmachines` |
| OpenAI | `openai` |
| Eden AI | `edenai` |
| HPC-AI | `hpc-ai` |
| Amazon Bedrock | `amazon-bedrock` |
| LLMTR | `llmtr` |
| Modal | `modal` |
| Databricks | `databricks` |
| Bailing | `bailing` |
| Chutes | `chutes` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| LMStudio | `lmstudio` |
| FreeModel | `freemodel` |
| Munito AI (EU) | `munito-eu` |
| Hetzner | `hetzner` |
| LLM Tech | `llmtech` |
| Groq | `groq` |
| Nvidia | `nvidia` |
| Subconscious | `subconscious` |
| AMD | `amd` |
| EmpirioLabs AI | `empiriolabs` |
| Neon | `neon` |
| evroc | `evroc` |
| Infomaniak | `infomaniak` |
| Xiaomi | `xiaomi` |
| Nebius Token Factory | `nebius` |
| AI/ML API | `aimlapi` |
| OpenRouter | `openrouter` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Prime Inference | `prime` |
| Venice AI | `venice` |
| Reflection | `reflection` |
| StepFun (China) | `stepfun` |
| Meganova | `meganova` |
| watsonx.ai | `watsonx` |
| Arcee | `arcee` |
| Cortecs | `cortecs` |
| Azure | `azure` |
| GreenPT | `greenpt` |
| NanoGPT | `nano-gpt` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Inference | `inference` |
| Bee by HEOSSI | `bee` |
| Claudinio | `claudinio` |
| Regolo AI | `regolo-ai` |
| QVAC | `qvac` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Vivgrid | `vivgrid` |
| Jalapeno Cloud | `jalapeno` |
| Impossibl | `impossibl` |
| Tencent Token Plan | `tencent-token-plan` |
| Jiekou.AI | `jiekou` |
| Kenari | `kenari` |
| Tinfoil | `tinfoil` |
| CrossModel | `crossmodel` |
| OpenReason | `openreason` |
| NeoSmith | `neosmith` |
| Neuralwatt | `neuralwatt` |
| Inception | `inception` |
| Moark | `moark` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Baseten | `baseten` |
| Vancine | `vancine` |
| StepFun (Global) | `stepfun-ai` |
| UnoRouter | `unorouter` |
| Modular | `modular` |
| Z.AI | `zai` |
| Scaleway | `scaleway` |
| Clarifai | `clarifai` |
| OrcaRouter | `orcarouter` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Opper | `opper` |
| ZenMux | `zenmux` |
| IO.NET | `io-net` |
| Melious | `melious` |
| Xpersona | `xpersona` |
| OCI Generative AI | `oci` |
| submodel | `submodel` |
| Agnes AI | `agnes` |
| Wafer | `wafer.ai` |
| AKI.IO | `aki-io` |
| Vercel AI Gateway | `vercel` |
| SiliconFlow | `siliconflow` |
| Upstage | `upstage` |
| Meta | `meta` |
| Charm Hyper | `hyper` |
| Kosmik Compute | `kosmik` |
| Boundless | `boundless` |
| InferX | `inferx` |
| Deep Infra | `deepinfra` |
| Morph | `morph` |
| Alibaba (China) | `alibaba-cn` |
| FrogBot | `frogbot` |
| Wally | `wally` |
| NEAR AI Cloud | `nearai` |
| Mixlayer | `mixlayer` |
| Pioneer | `pioneer` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Abacus | `abacus` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Together AI | `togetherai` |
| Munito AI | `munito` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Vispark | `vispark` |
| Zenifra | `zenifra` |
| above.dev | `above` |
| Novita AI | `novita-ai` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| TensorX | `tensorx` |
| LLM Gateway | `llmgateway-providers` |
| OpenCode | `opencode` |
| Pareto Inference | `pareto` |
| engy | `engy` |
| Auriko | `auriko` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Qiniu | `qiniu-ai` |
| Privatemode AI | `privatemode-ai` |
| Moonshot AI (China) | `moonshotai-cn` |
| DigitalOcean | `digitalocean` |
| Kilo Gateway | `kilo` |
| ClinePass | `cline-pass` |
| MiniMax (minimax.io) | `minimax` |
| LucidQuery | `lucidquery` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| CoralBricks | `coralbricks` |
| Sakana AI | `sakana` |
| STACKIT | `stackit` |
| Berget.AI | `berget` |
| Cerebras | `cerebras` |
| Cohere | `cohere` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Mistral | `mistral` |
| Fireworks AI | `fireworks-ai` |
| SenseNova (China) | `sensenova` |
| AI-ROUTER | `ai-router` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Synthetic | `synthetic` |
| 302.AI | `302ai` |
| Nova | `nova` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Tempr Gateway | `tempr` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Inceptron | `inceptron` |
| DeepSeek | `deepseek` |
| Modelis | `modelis` |
| abliteration.ai | `abliteration-ai` |
| Pendra | `pendra` |
| Perplexity Agent | `perplexity-agent` |
| Bothub | `bothub` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Vertex | `google-vertex` |
| Perplexity | `perplexity` |
| Volcengine Ark | `volcengine` |
| Alibaba | `alibaba` |
| Google | `google` |
| DevPass (LLM Gateway) | `llmgateway` |
| ainetcafe | `ainetcafe` |
| IteraCompute | `iteracompute` |
| Umans AI | `umans-ai` |
| SCX.ai | `scx-ai` |
| SiliconFlow (China) | `siliconflow-cn` |
| klokintegration.se | `klokintegration` |
| Tencent TokenHub | `tencent-tokenhub` |
| Inco | `inco` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Snowflake Cortex | `snowflake-cortex` |
| D.Run (China) | `drun` |
| DInference | `dinference` |
| Friendli | `friendli` |
| Crusoe | `crusoe` |
| Echo | `echo` |
| xAI | `xai` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Poolside | `poolside` |
| TokenGo | `tokengo` |
| Ofox | `ofox` |
| Moonshot AI | `moonshotai` |
| Anthropic | `anthropic` |
| Atomic Chat | `atomic-chat` |
| Helicone | `helicone` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Lynkr | `lynkr` |
| TokenRouter | `tokenrouter` |
| Lilac | `lilac` |
| EBCloud | `ebcloud` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| SCNet Token Plan | `scnet-token-plan` |
| SambaNova | `sambanova` |
| QiHang | `qihang-ai` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| SAP AI Core | `sap-ai-core` |
| CoreWeave | `wandb` |
| Wallaby | `wallaby` |
| Infer by Flow7 | `infer` |
| Requesty | `requesty` |
| Hugging Face | `huggingface` |
| RunInfra | `runinfra` |
| DaoXE | `daoxe` |
| LongCat | `longcat` |
| LowRouter | `lowrouter` |
| AI21 Labs | `ai21` |
| CommandCode | `commandcode` |
| Ambient | `ambient` |
<!-- PROVIDERS:END -->

## License

MIT
