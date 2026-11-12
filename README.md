# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8594 models · Updated 2026-11-12**
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
| NEAR AI Cloud | `nearai` |
| Tempr Gateway | `tempr` |
| Anthropic | `anthropic` |
| evroc | `evroc` |
| Databricks | `databricks` |
| FreeModel | `freemodel` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Baseten | `baseten` |
| OpenCode | `opencode` |
| MiniMax (minimax.cn) | `minimax-cn` |
| EmpirioLabs AI | `empiriolabs` |
| Tinfoil | `tinfoil` |
| Tencent TokenHub | `tencent-tokenhub` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| ClinePass | `cline-pass` |
| LLM Gateway | `llmgateway-providers` |
| DInference | `dinference` |
| Kilo Gateway | `kilo` |
| LowRouter | `lowrouter` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Pendra | `pendra` |
| Ollama Cloud | `ollama-cloud` |
| GMI Cloud | `gmicloud` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Auriko | `auriko` |
| Perplexity | `perplexity` |
| Mistral | `mistral` |
| routing.run | `routing-run` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Fireworks AI | `fireworks-ai` |
| Modal | `modal` |
| DeepSeek | `deepseek` |
| TensorX | `tensorx` |
| Mixlayer | `mixlayer` |
| Novita AI | `novita-ai` |
| Aixy | `aixy` |
| Google | `google` |
| Wally | `wally` |
| Atomic Chat | `atomic-chat` |
| Zeldoc | `zeldoc` |
| Chutes | `chutes` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| DigitalOcean | `digitalocean` |
| Munito AI | `munito` |
| abliteration.ai | `abliteration-ai` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| LLM Tech | `llmtech` |
| NanoGPT | `nano-gpt` |
| Friendli | `friendli` |
| LucidQuery | `lucidquery` |
| Subconscious | `subconscious` |
| Poolside | `poolside` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Zhipu AI | `zhipuai` |
| Vercel AI Gateway | `vercel` |
| LongCat | `longcat` |
| Venice AI | `venice` |
| Agnes AI | `agnes` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Claudinio | `claudinio` |
| AMD | `amd` |
| Prime Inference | `prime` |
| above.dev | `above` |
| QiHang | `qihang-ai` |
| AI/ML API | `aimlapi` |
| Pareto Inference | `pareto` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Z.AI | `zai` |
| Regolo AI | `regolo-ai` |
| watsonx.ai | `watsonx` |
| CoralBricks | `coralbricks` |
| 302.AI | `302ai` |
| RunInfra | `runinfra` |
| Qiniu | `qiniu-ai` |
| Amazon Bedrock | `amazon-bedrock` |
| Vispark | `vispark` |
| Snowflake Cortex | `snowflake-cortex` |
| Munito AI (EU) | `munito-eu` |
| Melious | `melious` |
| Together AI | `togetherai` |
| Vivgrid | `vivgrid` |
| Vertex | `google-vertex` |
| Nebius Token Factory | `nebius` |
| UnoRouter | `unorouter` |
| AKI.IO | `aki-io` |
| Eden AI | `edenai` |
| AI-ROUTER | `ai-router` |
| Bothub | `bothub` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Neuralwatt | `neuralwatt` |
| Meganova | `meganova` |
| Crusoe | `crusoe` |
| DevPass (LLM Gateway) | `llmgateway` |
| TokenGo | `tokengo` |
| EBCloud | `ebcloud` |
| Moonshot AI | `moonshotai` |
| GreenPT | `greenpt` |
| Jalapeno Cloud | `jalapeno` |
| STACKIT | `stackit` |
| Tencent Token Plan | `tencent-token-plan` |
| Alibaba | `alibaba` |
| Groq | `groq` |
| OpenAI | `openai` |
| Volcengine Ark | `volcengine` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Wafer | `wafer.ai` |
| Inco | `inco` |
| Impossibl | `impossibl` |
| GitLab Duo | `gitlab` |
| Cohere | `cohere` |
| Synthetic | `synthetic` |
| Kosmik Compute | `kosmik` |
| Bee by HEOSSI | `bee` |
| SenseNova (China) | `sensenova` |
| SaladCloud AI Gateway | `salad-cloud` |
| Xiaomi | `xiaomi` |
| AIHubMix | `aihubmix` |
| klokintegration.se | `klokintegration` |
| Modelis | `modelis` |
| Standard Compute | `standardcompute` |
| Inceptron | `inceptron` |
| Vancine | `vancine` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| HPC-AI | `hpc-ai` |
| Cerebras | `cerebras` |
| Perplexity Agent | `perplexity-agent` |
| engy | `engy` |
| Poe | `poe` |
| Z.AI Coding Plan | `zai-coding-plan` |
| CoreWeave | `wandb` |
| Hopper | `hopper` |
| ModelScope | `modelscope` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Scaleway | `scaleway` |
| MiniMax (minimax.io) | `minimax` |
| Requesty | `requesty` |
| SiliconFlow (China) | `siliconflow-cn` |
| Thinking Machines | `thinkingmachines` |
| Moonshot AI (China) | `moonshotai-cn` |
| OpenCode Go | `opencode-go` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Reflection | `reflection` |
| Helicone | `helicone` |
| Upstage | `upstage` |
| InferX | `inferx` |
| Lynkr | `lynkr` |
| Alibaba (China) | `alibaba-cn` |
| IO.NET | `io-net` |
| NeoSmith | `neosmith` |
| Meta | `meta` |
| Deep Infra | `deepinfra` |
| Azure | `azure` |
| Echo | `echo` |
| Ambient | `ambient` |
| SCX.ai | `scx-ai` |
| Cortecs | `cortecs` |
| StepFun (China) | `stepfun` |
| DaoXE | `daoxe` |
| LMStudio | `lmstudio` |
| ZenMux | `zenmux` |
| SiliconFlow | `siliconflow` |
| Modular | `modular` |
| Infer by Flow7 | `infer` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Neon | `neon` |
| ai& | `aiand` |
| Boundless | `boundless` |
| Charm Hyper | `hyper` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| QVAC | `qvac` |
| OpenRouter | `openrouter` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| D.Run (China) | `drun` |
| submodel | `submodel` |
| SambaNova | `sambanova` |
| ainetcafe | `ainetcafe` |
| Moark | `moark` |
| Inception | `inception` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Berget.AI | `berget` |
| GitHub Copilot | `github-copilot` |
| Xpersona | `xpersona` |
| OCI Generative AI | `oci` |
| Opper | `opper` |
| FastRouter | `fastrouter` |
| SCNet Token Plan | `scnet-token-plan` |
| Hetzner | `hetzner` |
| SAP AI Core | `sap-ai-core` |
| Umans AI | `umans-ai` |
| Lilac | `lilac` |
| CommandCode | `commandcode` |
| OrcaRouter | `orcarouter` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Merge Gateway | `merge-gateway` |
| Privatemode AI | `privatemode-ai` |
| Nvidia | `nvidia` |
| StepFun (Global) | `stepfun-ai` |
| Nova | `nova` |
| Ofox | `ofox` |
| Abacus | `abacus` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Sarvam AI | `sarvam` |
| Arcee | `arcee` |
| Morph | `morph` |
| xAI | `xai` |
| OpenReason | `openreason` |
| Sakana AI | `sakana` |
| Wallaby | `wallaby` |
| NaN | `nan` |
| Hugging Face | `huggingface` |
| Kenari | `kenari` |
| Vultr | `vultr` |
| AI21 Labs | `ai21` |
| Clarifai | `clarifai` |
| TokenRouter | `tokenrouter` |
| IteraCompute | `iteracompute` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| LLMTR | `llmtr` |
| Inference | `inference` |
| Zenifra | `zenifra` |
| Pioneer | `pioneer` |
| CrossModel | `crossmodel` |
| Infomaniak | `infomaniak` |
| Bailing | `bailing` |
| FrogBot | `frogbot` |
| Jiekou.AI | `jiekou` |
<!-- PROVIDERS:END -->

## License

MIT
