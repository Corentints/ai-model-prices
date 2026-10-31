# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8538 models · Updated 2026-10-31**
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
| OpenReason | `openreason` |
| DaoXE | `daoxe` |
| Chutes | `chutes` |
| Anthropic | `anthropic` |
| Vercel AI Gateway | `vercel` |
| Melious | `melious` |
| STACKIT | `stackit` |
| klokintegration.se | `klokintegration` |
| Munito AI (EU) | `munito-eu` |
| Perplexity | `perplexity` |
| Bothub | `bothub` |
| InferX | `inferx` |
| Novita AI | `novita-ai` |
| NanoGPT | `nano-gpt` |
| SAP AI Core | `sap-ai-core` |
| Jiekou.AI | `jiekou` |
| Subconscious | `subconscious` |
| Vertex | `google-vertex` |
| SCNet Token Plan | `scnet-token-plan` |
| Berget.AI | `berget` |
| Inco | `inco` |
| Google | `google` |
| Thinking Machines | `thinkingmachines` |
| Echo | `echo` |
| Amazon Bedrock | `amazon-bedrock` |
| HPC-AI | `hpc-ai` |
| LMStudio | `lmstudio` |
| Ambient | `ambient` |
| Ofox | `ofox` |
| Infomaniak | `infomaniak` |
| Vivgrid | `vivgrid` |
| SiliconFlow (China) | `siliconflow-cn` |
| Clarifai | `clarifai` |
| ai& | `aiand` |
| Tencent Token Plan | `tencent-token-plan` |
| Sarvam AI | `sarvam` |
| Hopper | `hopper` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Ollama Cloud | `ollama-cloud` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| QiHang | `qihang-ai` |
| AMD | `amd` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| LongCat | `longcat` |
| Mixlayer | `mixlayer` |
| Eden AI | `edenai` |
| Crusoe | `crusoe` |
| Hetzner | `hetzner` |
| IO.NET | `io-net` |
| Bee by HEOSSI | `bee` |
| Reflection | `reflection` |
| ClinePass | `cline-pass` |
| CoralBricks | `coralbricks` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Fireworks AI | `fireworks-ai` |
| Databricks | `databricks` |
| OpenRouter | `openrouter` |
| OpenCode Go | `opencode-go` |
| Requesty | `requesty` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| OpenAI | `openai` |
| DevPass (LLM Gateway) | `llmgateway` |
| Kenari | `kenari` |
| Xiaomi | `xiaomi` |
| Meta | `meta` |
| Neuralwatt | `neuralwatt` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Pareto Inference | `pareto` |
| Lilac | `lilac` |
| Morph | `morph` |
| Aixy | `aixy` |
| MiniMax (minimax.io) | `minimax` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Pendra | `pendra` |
| Deep Infra | `deepinfra` |
| TokenGo | `tokengo` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| IteraCompute | `iteracompute` |
| Synthetic | `synthetic` |
| Prime Inference | `prime` |
| Wallaby | `wallaby` |
| Upstage | `upstage` |
| SambaNova | `sambanova` |
| Tencent TokenHub | `tencent-tokenhub` |
| GitLab Duo | `gitlab` |
| Umans AI | `umans-ai` |
| Regolo AI | `regolo-ai` |
| Cerebras | `cerebras` |
| EBCloud | `ebcloud` |
| Modal | `modal` |
| Impossibl | `impossibl` |
| ainetcafe | `ainetcafe` |
| Cortecs | `cortecs` |
| RunInfra | `runinfra` |
| Venice AI | `venice` |
| Poolside | `poolside` |
| CrossModel | `crossmodel` |
| Charm Hyper | `hyper` |
| Alibaba Token Plan | `alibaba-token-plan` |
| SaladCloud AI Gateway | `salad-cloud` |
| Infer by Flow7 | `infer` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Mistral | `mistral` |
| Claudinio | `claudinio` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Vispark | `vispark` |
| Poe | `poe` |
| xAI | `xai` |
| Volcengine Ark | `volcengine` |
| Jalapeno Cloud | `jalapeno` |
| QVAC | `qvac` |
| Auriko | `auriko` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| TokenRouter | `tokenrouter` |
| Kosmik Compute | `kosmik` |
| Qiniu | `qiniu-ai` |
| NEAR AI Cloud | `nearai` |
| NaN | `nan` |
| AI-ROUTER | `ai-router` |
| OCI Generative AI | `oci` |
| Moonshot AI | `moonshotai` |
| 302.AI | `302ai` |
| Arcee | `arcee` |
| StepFun (Global) | `stepfun-ai` |
| above.dev | `above` |
| FastRouter | `fastrouter` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Z.AI | `zai` |
| abliteration.ai | `abliteration-ai` |
| Kilo Gateway | `kilo` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| LLMTR | `llmtr` |
| Lynkr | `lynkr` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Nebius Token Factory | `nebius` |
| Meganova | `meganova` |
| NeoSmith | `neosmith` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Nova | `nova` |
| SenseNova (China) | `sensenova` |
| routing.run | `routing-run` |
| Azure | `azure` |
| LowRouter | `lowrouter` |
| Modular | `modular` |
| Standard Compute | `standardcompute` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Privatemode AI | `privatemode-ai` |
| Zenifra | `zenifra` |
| Helicone | `helicone` |
| AI/ML API | `aimlapi` |
| DInference | `dinference` |
| Pioneer | `pioneer` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Merge Gateway | `merge-gateway` |
| ModelScope | `modelscope` |
| Atomic Chat | `atomic-chat` |
| GMI Cloud | `gmicloud` |
| Wally | `wally` |
| watsonx.ai | `watsonx` |
| Baseten | `baseten` |
| evroc | `evroc` |
| Bailing | `bailing` |
| LucidQuery | `lucidquery` |
| Vultr | `vultr` |
| StepFun (China) | `stepfun` |
| Munito AI | `munito` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Hugging Face | `huggingface` |
| Vancine | `vancine` |
| Zhipu AI | `zhipuai` |
| Perplexity Agent | `perplexity-agent` |
| AKI.IO | `aki-io` |
| Agnes AI | `agnes` |
| DeepSeek | `deepseek` |
| FreeModel | `freemodel` |
| Snowflake Cortex | `snowflake-cortex` |
| Inception | `inception` |
| TensorX | `tensorx` |
| AIHubMix | `aihubmix` |
| Opper | `opper` |
| CommandCode | `commandcode` |
| Alibaba | `alibaba` |
| Azure Cognitive Services | `azure-cognitive-services` |
| OVHcloud AI Endpoints | `ovhcloud` |
| submodel | `submodel` |
| SCX.ai | `scx-ai` |
| Groq | `groq` |
| LLM Tech | `llmtech` |
| Together AI | `togetherai` |
| Inference | `inference` |
| Xpersona | `xpersona` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| SiliconFlow | `siliconflow` |
| engy | `engy` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| EmpirioLabs AI | `empiriolabs` |
| CoreWeave | `wandb` |
| Zeldoc | `zeldoc` |
| Moark | `moark` |
| Neon | `neon` |
| Moonshot AI (China) | `moonshotai-cn` |
| Scaleway | `scaleway` |
| D.Run (China) | `drun` |
| GreenPT | `greenpt` |
| GitHub Copilot | `github-copilot` |
| Friendli | `friendli` |
| Alibaba (China) | `alibaba-cn` |
| FrogBot | `frogbot` |
| Wafer | `wafer.ai` |
| Nvidia | `nvidia` |
| OpenCode | `opencode` |
| AI21 Labs | `ai21` |
| ZenMux | `zenmux` |
| UnoRouter | `unorouter` |
| Modelis | `modelis` |
| OrcaRouter | `orcarouter` |
| Tinfoil | `tinfoil` |
| DigitalOcean | `digitalocean` |
| Boundless | `boundless` |
| Abacus | `abacus` |
| LLM Gateway | `llmgateway-providers` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Cohere | `cohere` |
| Tempr Gateway | `tempr` |
| Sakana AI | `sakana` |
| Inceptron | `inceptron` |
<!-- PROVIDERS:END -->

## License

MIT
