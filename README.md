# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8547 models · Updated 2026-11-05**
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
| Amazon Bedrock | `amazon-bedrock` |
| Friendli | `friendli` |
| AI21 Labs | `ai21` |
| DevPass (LLM Gateway) | `llmgateway` |
| IO.NET | `io-net` |
| Modular | `modular` |
| Cohere | `cohere` |
| AI/ML API | `aimlapi` |
| Nebius Token Factory | `nebius` |
| Perplexity | `perplexity` |
| Standard Compute | `standardcompute` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| routing.run | `routing-run` |
| OpenRouter | `openrouter` |
| Hugging Face | `huggingface` |
| Echo | `echo` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Wallaby | `wallaby` |
| Impossibl | `impossibl` |
| Cerebras | `cerebras` |
| Ollama Cloud | `ollama-cloud` |
| Aixy | `aixy` |
| Lynkr | `lynkr` |
| Baseten | `baseten` |
| submodel | `submodel` |
| EmpirioLabs AI | `empiriolabs` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Kenari | `kenari` |
| Meganova | `meganova` |
| Requesty | `requesty` |
| Zenifra | `zenifra` |
| xAI | `xai` |
| Bailing | `bailing` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| TokenGo | `tokengo` |
| Alibaba (China) | `alibaba-cn` |
| Pioneer | `pioneer` |
| ZenMux | `zenmux` |
| Tinfoil | `tinfoil` |
| Sarvam AI | `sarvam` |
| ClinePass | `cline-pass` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| EBCloud | `ebcloud` |
| Helicone | `helicone` |
| Moonshot AI | `moonshotai` |
| AIHubMix | `aihubmix` |
| Deep Infra | `deepinfra` |
| above.dev | `above` |
| ainetcafe | `ainetcafe` |
| AMD | `amd` |
| LLM Tech | `llmtech` |
| Upstage | `upstage` |
| Clarifai | `clarifai` |
| Databricks | `databricks` |
| watsonx.ai | `watsonx` |
| Chutes | `chutes` |
| Atomic Chat | `atomic-chat` |
| OrcaRouter | `orcarouter` |
| Inco | `inco` |
| FreeModel | `freemodel` |
| Scaleway | `scaleway` |
| InferX | `inferx` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Wafer | `wafer.ai` |
| StepFun (China) | `stepfun` |
| Reflection | `reflection` |
| abliteration.ai | `abliteration-ai` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Nova | `nova` |
| Azure | `azure` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| GitHub Copilot | `github-copilot` |
| SCNet Token Plan | `scnet-token-plan` |
| Modal | `modal` |
| SiliconFlow | `siliconflow` |
| klokintegration.se | `klokintegration` |
| 302.AI | `302ai` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Sakana AI | `sakana` |
| RunInfra | `runinfra` |
| Agnes AI | `agnes` |
| SambaNova | `sambanova` |
| Hetzner | `hetzner` |
| Boundless | `boundless` |
| QiHang | `qihang-ai` |
| Thinking Machines | `thinkingmachines` |
| Claudinio | `claudinio` |
| Kosmik Compute | `kosmik` |
| Wally | `wally` |
| LucidQuery | `lucidquery` |
| ModelScope | `modelscope` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Eden AI | `edenai` |
| LongCat | `longcat` |
| Moonshot AI (China) | `moonshotai-cn` |
| Vivgrid | `vivgrid` |
| Merge Gateway | `merge-gateway` |
| SaladCloud AI Gateway | `salad-cloud` |
| engy | `engy` |
| GreenPT | `greenpt` |
| Tencent Token Plan | `tencent-token-plan` |
| DeepSeek | `deepseek` |
| Regolo AI | `regolo-ai` |
| LowRouter | `lowrouter` |
| DaoXE | `daoxe` |
| D.Run (China) | `drun` |
| Inceptron | `inceptron` |
| Cortecs | `cortecs` |
| GitLab Duo | `gitlab` |
| NeoSmith | `neosmith` |
| Hopper | `hopper` |
| DInference | `dinference` |
| OCI Generative AI | `oci` |
| AI-ROUTER | `ai-router` |
| Neon | `neon` |
| NaN | `nan` |
| Prime Inference | `prime` |
| Xpersona | `xpersona` |
| OpenAI | `openai` |
| Lilac | `lilac` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Opper | `opper` |
| DigitalOcean | `digitalocean` |
| Mixlayer | `mixlayer` |
| Jiekou.AI | `jiekou` |
| Tencent TokenHub | `tencent-tokenhub` |
| Novita AI | `novita-ai` |
| SCX.ai | `scx-ai` |
| OVHcloud AI Endpoints | `ovhcloud` |
| FrogBot | `frogbot` |
| GMI Cloud | `gmicloud` |
| Fireworks AI | `fireworks-ai` |
| CoralBricks | `coralbricks` |
| Groq | `groq` |
| Vercel AI Gateway | `vercel` |
| Charm Hyper | `hyper` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Crusoe | `crusoe` |
| Alibaba | `alibaba` |
| Modelis | `modelis` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Together AI | `togetherai` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Qiniu | `qiniu-ai` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| OpenCode | `opencode` |
| MiniMax (minimax.io) | `minimax` |
| NanoGPT | `nano-gpt` |
| LMStudio | `lmstudio` |
| Volcengine Ark | `volcengine` |
| LLMTR | `llmtr` |
| Inception | `inception` |
| Snowflake Cortex | `snowflake-cortex` |
| Anthropic | `anthropic` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Alibaba Token Plan | `alibaba-token-plan` |
| CommandCode | `commandcode` |
| QVAC | `qvac` |
| Privatemode AI | `privatemode-ai` |
| Melious | `melious` |
| Tempr Gateway | `tempr` |
| Google | `google` |
| TensorX | `tensorx` |
| Xiaomi | `xiaomi` |
| Perplexity Agent | `perplexity-agent` |
| Morph | `morph` |
| Vispark | `vispark` |
| StepFun (Global) | `stepfun-ai` |
| SiliconFlow (China) | `siliconflow-cn` |
| TokenRouter | `tokenrouter` |
| Arcee | `arcee` |
| OpenCode Go | `opencode-go` |
| Kilo Gateway | `kilo` |
| Venice AI | `venice` |
| IteraCompute | `iteracompute` |
| Vancine | `vancine` |
| Ambient | `ambient` |
| Berget.AI | `berget` |
| Nvidia | `nvidia` |
| SenseNova (China) | `sensenova` |
| FastRouter | `fastrouter` |
| Subconscious | `subconscious` |
| Jalapeno Cloud | `jalapeno` |
| Bee by HEOSSI | `bee` |
| Munito AI (EU) | `munito-eu` |
| AKI.IO | `aki-io` |
| SAP AI Core | `sap-ai-core` |
| CrossModel | `crossmodel` |
| Auriko | `auriko` |
| Moark | `moark` |
| Poe | `poe` |
| Munito AI | `munito` |
| Zhipu AI | `zhipuai` |
| Umans AI | `umans-ai` |
| Vultr | `vultr` |
| Pendra | `pendra` |
| CoreWeave | `wandb` |
| Pareto Inference | `pareto` |
| Inference | `inference` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Synthetic | `synthetic` |
| UnoRouter | `unorouter` |
| Infer by Flow7 | `infer` |
| Z.AI | `zai` |
| Vertex | `google-vertex` |
| LLM Gateway | `llmgateway-providers` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| ai& | `aiand` |
| OpenReason | `openreason` |
| Mistral | `mistral` |
| Zeldoc | `zeldoc` |
| Ofox | `ofox` |
| Abacus | `abacus` |
| evroc | `evroc` |
| NEAR AI Cloud | `nearai` |
| HPC-AI | `hpc-ai` |
| Bothub | `bothub` |
| Meta | `meta` |
| Neuralwatt | `neuralwatt` |
| STACKIT | `stackit` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Poolside | `poolside` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Infomaniak | `infomaniak` |
| Azure Cognitive Services | `azure-cognitive-services` |
<!-- PROVIDERS:END -->

## License

MIT
