# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8542 models · Updated 2026-11-01**
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
| AIHubMix | `aihubmix` |
| Regolo AI | `regolo-ai` |
| OpenReason | `openreason` |
| Moark | `moark` |
| Snowflake Cortex | `snowflake-cortex` |
| Echo | `echo` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Tencent TokenHub | `tencent-tokenhub` |
| SaladCloud AI Gateway | `salad-cloud` |
| Hugging Face | `huggingface` |
| OpenCode Go | `opencode-go` |
| DeepSeek | `deepseek` |
| submodel | `submodel` |
| OpenRouter | `openrouter` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Zhipu AI | `zhipuai` |
| Nebius Token Factory | `nebius` |
| Volcengine Ark | `volcengine` |
| Google | `google` |
| D.Run (China) | `drun` |
| GMI Cloud | `gmicloud` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Melious | `melious` |
| routing.run | `routing-run` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Deep Infra | `deepinfra` |
| SenseNova (China) | `sensenova` |
| NEAR AI Cloud | `nearai` |
| Munito AI | `munito` |
| Clarifai | `clarifai` |
| Xpersona | `xpersona` |
| SAP AI Core | `sap-ai-core` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Opper | `opper` |
| Nova | `nova` |
| Qiniu | `qiniu-ai` |
| CoreWeave | `wandb` |
| MiniMax (minimax.io) | `minimax` |
| FastRouter | `fastrouter` |
| Agnes AI | `agnes` |
| Ollama Cloud | `ollama-cloud` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Privatemode AI | `privatemode-ai` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Cohere | `cohere` |
| Perplexity | `perplexity` |
| Reflection | `reflection` |
| Modelis | `modelis` |
| SiliconFlow (China) | `siliconflow-cn` |
| LLMTR | `llmtr` |
| Modular | `modular` |
| Tencent Token Plan | `tencent-token-plan` |
| Nvidia | `nvidia` |
| OpenAI | `openai` |
| ModelScope | `modelscope` |
| StepFun (China) | `stepfun` |
| FrogBot | `frogbot` |
| Synthetic | `synthetic` |
| Jiekou.AI | `jiekou` |
| AI-ROUTER | `ai-router` |
| Alibaba | `alibaba` |
| Aixy | `aixy` |
| Infomaniak | `infomaniak` |
| Meganova | `meganova` |
| Mixlayer | `mixlayer` |
| InferX | `inferx` |
| Vertex | `google-vertex` |
| Vivgrid | `vivgrid` |
| Arcee | `arcee` |
| GitLab Duo | `gitlab` |
| Anthropic | `anthropic` |
| OCI Generative AI | `oci` |
| GitHub Copilot | `github-copilot` |
| QVAC | `qvac` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Tinfoil | `tinfoil` |
| Atomic Chat | `atomic-chat` |
| DigitalOcean | `digitalocean` |
| SiliconFlow | `siliconflow` |
| ainetcafe | `ainetcafe` |
| Vispark | `vispark` |
| LowRouter | `lowrouter` |
| Azure | `azure` |
| OpenCode | `opencode` |
| ai& | `aiand` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| RunInfra | `runinfra` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Thinking Machines | `thinkingmachines` |
| NeoSmith | `neosmith` |
| Z.AI Coding Plan | `zai-coding-plan` |
| ZenMux | `zenmux` |
| Eden AI | `edenai` |
| DevPass (LLM Gateway) | `llmgateway` |
| Databricks | `databricks` |
| Sakana AI | `sakana` |
| Poe | `poe` |
| Wally | `wally` |
| Zeldoc | `zeldoc` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| above.dev | `above` |
| Kenari | `kenari` |
| Neon | `neon` |
| Vercel AI Gateway | `vercel` |
| Ambient | `ambient` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Fireworks AI | `fireworks-ai` |
| Impossibl | `impossibl` |
| Groq | `groq` |
| Kosmik Compute | `kosmik` |
| IO.NET | `io-net` |
| Together AI | `togetherai` |
| LLM Tech | `llmtech` |
| Lynkr | `lynkr` |
| Poolside | `poolside` |
| abliteration.ai | `abliteration-ai` |
| Requesty | `requesty` |
| Bailing | `bailing` |
| Pioneer | `pioneer` |
| Pendra | `pendra` |
| Moonshot AI (China) | `moonshotai-cn` |
| EBCloud | `ebcloud` |
| watsonx.ai | `watsonx` |
| CrossModel | `crossmodel` |
| QiHang | `qihang-ai` |
| Pareto Inference | `pareto` |
| NaN | `nan` |
| TensorX | `tensorx` |
| Novita AI | `novita-ai` |
| Neuralwatt | `neuralwatt` |
| Baseten | `baseten` |
| Subconscious | `subconscious` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| AKI.IO | `aki-io` |
| 302.AI | `302ai` |
| DInference | `dinference` |
| Cerebras | `cerebras` |
| Umans AI | `umans-ai` |
| Abacus | `abacus` |
| Meta | `meta` |
| evroc | `evroc` |
| CommandCode | `commandcode` |
| SambaNova | `sambanova` |
| Ofox | `ofox` |
| Venice AI | `venice` |
| Perplexity Agent | `perplexity-agent` |
| Chutes | `chutes` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Hetzner | `hetzner` |
| Morph | `morph` |
| TokenRouter | `tokenrouter` |
| Cortecs | `cortecs` |
| LucidQuery | `lucidquery` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Wafer | `wafer.ai` |
| Standard Compute | `standardcompute` |
| ClinePass | `cline-pass` |
| SCNet Token Plan | `scnet-token-plan` |
| Infer by Flow7 | `infer` |
| DaoXE | `daoxe` |
| AI/ML API | `aimlapi` |
| StepFun (Global) | `stepfun-ai` |
| Mistral | `mistral` |
| Kilo Gateway | `kilo` |
| Helicone | `helicone` |
| klokintegration.se | `klokintegration` |
| NanoGPT | `nano-gpt` |
| GreenPT | `greenpt` |
| Vultr | `vultr` |
| Upstage | `upstage` |
| Inference | `inference` |
| Tempr Gateway | `tempr` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Jalapeno Cloud | `jalapeno` |
| Prime Inference | `prime` |
| engy | `engy` |
| Crusoe | `crusoe` |
| CoralBricks | `coralbricks` |
| Modal | `modal` |
| Bothub | `bothub` |
| Auriko | `auriko` |
| Amazon Bedrock | `amazon-bedrock` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Moonshot AI | `moonshotai` |
| TokenGo | `tokengo` |
| STACKIT | `stackit` |
| Hopper | `hopper` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Charm Hyper | `hyper` |
| AMD | `amd` |
| Claudinio | `claudinio` |
| AI21 Labs | `ai21` |
| Scaleway | `scaleway` |
| Inception | `inception` |
| IteraCompute | `iteracompute` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| LongCat | `longcat` |
| Berget.AI | `berget` |
| Inceptron | `inceptron` |
| Munito AI (EU) | `munito-eu` |
| Merge Gateway | `merge-gateway` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| FreeModel | `freemodel` |
| EmpirioLabs AI | `empiriolabs` |
| xAI | `xai` |
| Inco | `inco` |
| Vancine | `vancine` |
| HPC-AI | `hpc-ai` |
| Alibaba (China) | `alibaba-cn` |
| Boundless | `boundless` |
| Xiaomi | `xiaomi` |
| Zenifra | `zenifra` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Sarvam AI | `sarvam` |
| OrcaRouter | `orcarouter` |
| LLM Gateway | `llmgateway-providers` |
| Lilac | `lilac` |
| Bee by HEOSSI | `bee` |
| Wallaby | `wallaby` |
| Z.AI | `zai` |
| LMStudio | `lmstudio` |
| Friendli | `friendli` |
| UnoRouter | `unorouter` |
| SCX.ai | `scx-ai` |
<!-- PROVIDERS:END -->

## License

MIT
