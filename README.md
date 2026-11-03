# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8536 models · Updated 2026-11-03**
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
| Reflection | `reflection` |
| Meta | `meta` |
| DevPass (LLM Gateway) | `llmgateway` |
| CrossModel | `crossmodel` |
| Merge Gateway | `merge-gateway` |
| QiHang | `qihang-ai` |
| SambaNova | `sambanova` |
| Bailing | `bailing` |
| Moonshot AI | `moonshotai` |
| Databricks | `databricks` |
| Perplexity | `perplexity` |
| OpenAI | `openai` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Azure | `azure` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Zhipu AI | `zhipuai` |
| Arcee | `arcee` |
| Tencent Token Plan | `tencent-token-plan` |
| Friendli | `friendli` |
| Upstage | `upstage` |
| Vultr | `vultr` |
| Ofox | `ofox` |
| Z.AI Coding Plan | `zai-coding-plan` |
| ai& | `aiand` |
| Wally | `wally` |
| Jalapeno Cloud | `jalapeno` |
| Kenari | `kenari` |
| RunInfra | `runinfra` |
| FreeModel | `freemodel` |
| Tinfoil | `tinfoil` |
| GMI Cloud | `gmicloud` |
| LMStudio | `lmstudio` |
| Perplexity Agent | `perplexity-agent` |
| Bee by HEOSSI | `bee` |
| LucidQuery | `lucidquery` |
| CommandCode | `commandcode` |
| AI-ROUTER | `ai-router` |
| Vivgrid | `vivgrid` |
| OpenReason | `openreason` |
| Lilac | `lilac` |
| SaladCloud AI Gateway | `salad-cloud` |
| CoralBricks | `coralbricks` |
| Clarifai | `clarifai` |
| Abacus | `abacus` |
| StepFun (Global) | `stepfun-ai` |
| engy | `engy` |
| Agnes AI | `agnes` |
| DeepSeek | `deepseek` |
| STACKIT | `stackit` |
| submodel | `submodel` |
| Prime Inference | `prime` |
| Poolside | `poolside` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Alibaba | `alibaba` |
| Inco | `inco` |
| Scaleway | `scaleway` |
| EBCloud | `ebcloud` |
| NaN | `nan` |
| Umans AI | `umans-ai` |
| FastRouter | `fastrouter` |
| TokenRouter | `tokenrouter` |
| Atomic Chat | `atomic-chat` |
| AI21 Labs | `ai21` |
| IteraCompute | `iteracompute` |
| Baseten | `baseten` |
| Pioneer | `pioneer` |
| Regolo AI | `regolo-ai` |
| OrcaRouter | `orcarouter` |
| Pareto Inference | `pareto` |
| Wallaby | `wallaby` |
| 302.AI | `302ai` |
| Echo | `echo` |
| Aixy | `aixy` |
| LowRouter | `lowrouter` |
| Inceptron | `inceptron` |
| Cerebras | `cerebras` |
| StepFun (China) | `stepfun` |
| Requesty | `requesty` |
| Opper | `opper` |
| Cortecs | `cortecs` |
| Munito AI (EU) | `munito-eu` |
| Vispark | `vispark` |
| Moonshot AI (China) | `moonshotai-cn` |
| Charm Hyper | `hyper` |
| ClinePass | `cline-pass` |
| GitHub Copilot | `github-copilot` |
| Groq | `groq` |
| QVAC | `qvac` |
| Thinking Machines | `thinkingmachines` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| ZenMux | `zenmux` |
| Subconscious | `subconscious` |
| Hetzner | `hetzner` |
| Mixlayer | `mixlayer` |
| Standard Compute | `standardcompute` |
| Sakana AI | `sakana` |
| Kosmik Compute | `kosmik` |
| Amazon Bedrock | `amazon-bedrock` |
| Inference | `inference` |
| Volcengine Ark | `volcengine` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Boundless | `boundless` |
| Jiekou.AI | `jiekou` |
| Vertex | `google-vertex` |
| GitLab Duo | `gitlab` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| NanoGPT | `nano-gpt` |
| watsonx.ai | `watsonx` |
| GreenPT | `greenpt` |
| Google | `google` |
| Inception | `inception` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| LLM Gateway | `llmgateway-providers` |
| AMD | `amd` |
| Eden AI | `edenai` |
| Anthropic | `anthropic` |
| SAP AI Core | `sap-ai-core` |
| Ollama Cloud | `ollama-cloud` |
| evroc | `evroc` |
| Bothub | `bothub` |
| DigitalOcean | `digitalocean` |
| Fireworks AI | `fireworks-ai` |
| LLMTR | `llmtr` |
| NeoSmith | `neosmith` |
| Zeldoc | `zeldoc` |
| Neon | `neon` |
| Qiniu | `qiniu-ai` |
| SenseNova (China) | `sensenova` |
| Munito AI | `munito` |
| LLM Tech | `llmtech` |
| Synthetic | `synthetic` |
| OpenCode | `opencode` |
| Modelis | `modelis` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Modal | `modal` |
| InferX | `inferx` |
| Tempr Gateway | `tempr` |
| Deep Infra | `deepinfra` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Pendra | `pendra` |
| Nebius Token Factory | `nebius` |
| Venice AI | `venice` |
| D.Run (China) | `drun` |
| TensorX | `tensorx` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Morph | `morph` |
| Crusoe | `crusoe` |
| Impossibl | `impossibl` |
| MiniMax (minimax.io) | `minimax` |
| DInference | `dinference` |
| Melious | `melious` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Privatemode AI | `privatemode-ai` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| HPC-AI | `hpc-ai` |
| Hopper | `hopper` |
| Nova | `nova` |
| Modular | `modular` |
| Claudinio | `claudinio` |
| Xiaomi | `xiaomi` |
| above.dev | `above` |
| AIHubMix | `aihubmix` |
| Lynkr | `lynkr` |
| Together AI | `togetherai` |
| Nvidia | `nvidia` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Meganova | `meganova` |
| EmpirioLabs AI | `empiriolabs` |
| Snowflake Cortex | `snowflake-cortex` |
| Poe | `poe` |
| Z.AI | `zai` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| routing.run | `routing-run` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| SCNet Token Plan | `scnet-token-plan` |
| NEAR AI Cloud | `nearai` |
| xAI | `xai` |
| Cohere | `cohere` |
| UnoRouter | `unorouter` |
| Kilo Gateway | `kilo` |
| OpenRouter | `openrouter` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Alibaba (China) | `alibaba-cn` |
| Hugging Face | `huggingface` |
| ainetcafe | `ainetcafe` |
| Ambient | `ambient` |
| Infer by Flow7 | `infer` |
| IO.NET | `io-net` |
| Neuralwatt | `neuralwatt` |
| TokenGo | `tokengo` |
| Novita AI | `novita-ai` |
| Vercel AI Gateway | `vercel` |
| FrogBot | `frogbot` |
| Vancine | `vancine` |
| Helicone | `helicone` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| DaoXE | `daoxe` |
| Moark | `moark` |
| Sarvam AI | `sarvam` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| AKI.IO | `aki-io` |
| LongCat | `longcat` |
| OpenCode Go | `opencode-go` |
| SiliconFlow | `siliconflow` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Berget.AI | `berget` |
| abliteration.ai | `abliteration-ai` |
| OCI Generative AI | `oci` |
| SiliconFlow (China) | `siliconflow-cn` |
| Mistral | `mistral` |
| SCX.ai | `scx-ai` |
| Chutes | `chutes` |
| klokintegration.se | `klokintegration` |
| ModelScope | `modelscope` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Tencent TokenHub | `tencent-tokenhub` |
| Xpersona | `xpersona` |
| Auriko | `auriko` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Zenifra | `zenifra` |
| AI/ML API | `aimlapi` |
| Infomaniak | `infomaniak` |
| CoreWeave | `wandb` |
| Wafer | `wafer.ai` |
<!-- PROVIDERS:END -->

## License

MIT
