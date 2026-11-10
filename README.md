# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8573 models · Updated 2026-11-10**
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
| routing.run | `routing-run` |
| Inference | `inference` |
| Inception | `inception` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| SAP AI Core | `sap-ai-core` |
| DigitalOcean | `digitalocean` |
| Wafer | `wafer.ai` |
| Moark | `moark` |
| EBCloud | `ebcloud` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Upstage | `upstage` |
| Ambient | `ambient` |
| QiHang | `qihang-ai` |
| CommandCode | `commandcode` |
| Charm Hyper | `hyper` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Kenari | `kenari` |
| Clarifai | `clarifai` |
| Google | `google` |
| Hopper | `hopper` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Reflection | `reflection` |
| SambaNova | `sambanova` |
| Munito AI (EU) | `munito-eu` |
| Bailing | `bailing` |
| OVHcloud AI Endpoints | `ovhcloud` |
| NeoSmith | `neosmith` |
| Claudinio | `claudinio` |
| Melious | `melious` |
| Pareto Inference | `pareto` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Boundless | `boundless` |
| FreeModel | `freemodel` |
| NaN | `nan` |
| Anthropic | `anthropic` |
| Together AI | `togetherai` |
| MiniMax (minimax.io) | `minimax` |
| Poolside | `poolside` |
| Atomic Chat | `atomic-chat` |
| Crusoe | `crusoe` |
| Hugging Face | `huggingface` |
| Wallaby | `wallaby` |
| Modular | `modular` |
| OpenCode Go | `opencode-go` |
| LLM Tech | `llmtech` |
| Arcee | `arcee` |
| Moonshot AI | `moonshotai` |
| Alibaba (China) | `alibaba-cn` |
| NEAR AI Cloud | `nearai` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Berget.AI | `berget` |
| Agnes AI | `agnes` |
| Snowflake Cortex | `snowflake-cortex` |
| Infomaniak | `infomaniak` |
| Umans AI | `umans-ai` |
| Jiekou.AI | `jiekou` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| TokenGo | `tokengo` |
| Lilac | `lilac` |
| Nova | `nova` |
| xAI | `xai` |
| Kilo Gateway | `kilo` |
| Modal | `modal` |
| OrcaRouter | `orcarouter` |
| Privatemode AI | `privatemode-ai` |
| Alibaba | `alibaba` |
| OpenAI | `openai` |
| Friendli | `friendli` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Cohere | `cohere` |
| watsonx.ai | `watsonx` |
| Mistral | `mistral` |
| Tempr Gateway | `tempr` |
| ModelScope | `modelscope` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| OpenReason | `openreason` |
| LMStudio | `lmstudio` |
| Merge Gateway | `merge-gateway` |
| Vertex | `google-vertex` |
| SenseNova (China) | `sensenova` |
| Zeldoc | `zeldoc` |
| LucidQuery | `lucidquery` |
| GitHub Copilot | `github-copilot` |
| QVAC | `qvac` |
| Jalapeno Cloud | `jalapeno` |
| Perplexity | `perplexity` |
| SiliconFlow | `siliconflow` |
| Cerebras | `cerebras` |
| Pendra | `pendra` |
| Neon | `neon` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Pioneer | `pioneer` |
| Ofox | `ofox` |
| Amazon Bedrock | `amazon-bedrock` |
| Scaleway | `scaleway` |
| LongCat | `longcat` |
| Qiniu | `qiniu-ai` |
| Wally | `wally` |
| Chutes | `chutes` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| CrossModel | `crossmodel` |
| AI21 Labs | `ai21` |
| AIHubMix | `aihubmix` |
| Volcengine Ark | `volcengine` |
| Zenifra | `zenifra` |
| Regolo AI | `regolo-ai` |
| Nebius Token Factory | `nebius` |
| Inco | `inco` |
| Vispark | `vispark` |
| Cortecs | `cortecs` |
| Inceptron | `inceptron` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| InferX | `inferx` |
| 302.AI | `302ai` |
| SCX.ai | `scx-ai` |
| Mixlayer | `mixlayer` |
| Tinfoil | `tinfoil` |
| engy | `engy` |
| Sakana AI | `sakana` |
| Vultr | `vultr` |
| IteraCompute | `iteracompute` |
| ainetcafe | `ainetcafe` |
| ai& | `aiand` |
| Novita AI | `novita-ai` |
| ZenMux | `zenmux` |
| GitLab Duo | `gitlab` |
| Bee by HEOSSI | `bee` |
| DevPass (LLM Gateway) | `llmgateway` |
| OpenRouter | `openrouter` |
| Venice AI | `venice` |
| AKI.IO | `aki-io` |
| LLMTR | `llmtr` |
| Groq | `groq` |
| Modelis | `modelis` |
| AI-ROUTER | `ai-router` |
| StepFun (China) | `stepfun` |
| Fireworks AI | `fireworks-ai` |
| Baseten | `baseten` |
| Munito AI | `munito` |
| Eden AI | `edenai` |
| LLM Gateway | `llmgateway-providers` |
| Meganova | `meganova` |
| above.dev | `above` |
| Meta | `meta` |
| TensorX | `tensorx` |
| submodel | `submodel` |
| Opper | `opper` |
| Echo | `echo` |
| Infer by Flow7 | `infer` |
| Perplexity Agent | `perplexity-agent` |
| DInference | `dinference` |
| OpenCode | `opencode` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Moonshot AI (China) | `moonshotai-cn` |
| Neuralwatt | `neuralwatt` |
| Tencent Token Plan | `tencent-token-plan` |
| SCNet Token Plan | `scnet-token-plan` |
| AMD | `amd` |
| Ollama Cloud | `ollama-cloud` |
| Impossibl | `impossibl` |
| SiliconFlow (China) | `siliconflow-cn` |
| FastRouter | `fastrouter` |
| Auriko | `auriko` |
| DeepSeek | `deepseek` |
| STACKIT | `stackit` |
| Standard Compute | `standardcompute` |
| klokintegration.se | `klokintegration` |
| Azure | `azure` |
| FrogBot | `frogbot` |
| abliteration.ai | `abliteration-ai` |
| Requesty | `requesty` |
| CoralBricks | `coralbricks` |
| AI/ML API | `aimlapi` |
| Abacus | `abacus` |
| Synthetic | `synthetic` |
| SaladCloud AI Gateway | `salad-cloud` |
| DaoXE | `daoxe` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Xiaomi | `xiaomi` |
| D.Run (China) | `drun` |
| Prime Inference | `prime` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| EmpirioLabs AI | `empiriolabs` |
| Z.AI | `zai` |
| Lynkr | `lynkr` |
| Zhipu AI | `zhipuai` |
| RunInfra | `runinfra` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Poe | `poe` |
| Deep Infra | `deepinfra` |
| HPC-AI | `hpc-ai` |
| IO.NET | `io-net` |
| LowRouter | `lowrouter` |
| OCI Generative AI | `oci` |
| GMI Cloud | `gmicloud` |
| GreenPT | `greenpt` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Databricks | `databricks` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Tencent TokenHub | `tencent-tokenhub` |
| Vancine | `vancine` |
| Hetzner | `hetzner` |
| Thinking Machines | `thinkingmachines` |
| MiniMax (minimax.cn) | `minimax-cn` |
| evroc | `evroc` |
| Morph | `morph` |
| CoreWeave | `wandb` |
| Kosmik Compute | `kosmik` |
| Vivgrid | `vivgrid` |
| NanoGPT | `nano-gpt` |
| Xpersona | `xpersona` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Bothub | `bothub` |
| UnoRouter | `unorouter` |
| StepFun (Global) | `stepfun-ai` |
| Aixy | `aixy` |
| Subconscious | `subconscious` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Sarvam AI | `sarvam` |
| Helicone | `helicone` |
| Vercel AI Gateway | `vercel` |
| Nvidia | `nvidia` |
| ClinePass | `cline-pass` |
| TokenRouter | `tokenrouter` |
<!-- PROVIDERS:END -->

## License

MIT
