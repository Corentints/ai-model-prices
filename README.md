# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**224 providers · 8526 models · Updated 2026-10-30**
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
| Poolside | `poolside` |
| Boundless | `boundless` |
| Friendli | `friendli` |
| SAP AI Core | `sap-ai-core` |
| AKI.IO | `aki-io` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Perplexity Agent | `perplexity-agent` |
| Clarifai | `clarifai` |
| OpenReason | `openreason` |
| SaladCloud AI Gateway | `salad-cloud` |
| FreeModel | `freemodel` |
| OpenRouter | `openrouter` |
| Crusoe | `crusoe` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Poe | `poe` |
| Arcee | `arcee` |
| Infer by Flow7 | `infer` |
| InferX | `inferx` |
| LMStudio | `lmstudio` |
| SenseNova (China) | `sensenova` |
| Moonshot AI | `moonshotai` |
| Alibaba | `alibaba` |
| Mixlayer | `mixlayer` |
| Claudinio | `claudinio` |
| Sakana AI | `sakana` |
| AI/ML API | `aimlapi` |
| Echo | `echo` |
| Sarvam AI | `sarvam` |
| QVAC | `qvac` |
| Kosmik Compute | `kosmik` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Tinfoil | `tinfoil` |
| Google | `google` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Infomaniak | `infomaniak` |
| Umans AI | `umans-ai` |
| GreenPT | `greenpt` |
| SCNet Token Plan | `scnet-token-plan` |
| Merge Gateway | `merge-gateway` |
| Scaleway | `scaleway` |
| 302.AI | `302ai` |
| Modelis | `modelis` |
| Kenari | `kenari` |
| Z.AI | `zai` |
| Hugging Face | `huggingface` |
| EmpirioLabs AI | `empiriolabs` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Bailing | `bailing` |
| Cortecs | `cortecs` |
| klokintegration.se | `klokintegration` |
| QiHang | `qihang-ai` |
| DInference | `dinference` |
| Bothub | `bothub` |
| CommandCode | `commandcode` |
| LowRouter | `lowrouter` |
| Moonshot AI (China) | `moonshotai-cn` |
| Helicone | `helicone` |
| Together AI | `togetherai` |
| Upstage | `upstage` |
| UnoRouter | `unorouter` |
| Regolo AI | `regolo-ai` |
| Inference | `inference` |
| Groq | `groq` |
| Neuralwatt | `neuralwatt` |
| Vertex | `google-vertex` |
| Ollama Cloud | `ollama-cloud` |
| Cohere | `cohere` |
| MiniMax (minimax.io) | `minimax` |
| Pioneer | `pioneer` |
| ClinePass | `cline-pass` |
| Meta | `meta` |
| IO.NET | `io-net` |
| GitHub Copilot | `github-copilot` |
| Anthropic | `anthropic` |
| DaoXE | `daoxe` |
| Morph | `morph` |
| xAI | `xai` |
| abliteration.ai | `abliteration-ai` |
| SiliconFlow | `siliconflow` |
| Aixy | `aixy` |
| TokenGo | `tokengo` |
| Hetzner | `hetzner` |
| Tencent TokenHub | `tencent-tokenhub` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Impossibl | `impossibl` |
| FastRouter | `fastrouter` |
| Pareto Inference | `pareto` |
| Tencent Token Plan | `tencent-token-plan` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| DeepSeek | `deepseek` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Zenifra | `zenifra` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| AI-ROUTER | `ai-router` |
| submodel | `submodel` |
| TokenRouter | `tokenrouter` |
| Xpersona | `xpersona` |
| OpenAI | `openai` |
| Nova | `nova` |
| LongCat | `longcat` |
| AIHubMix | `aihubmix` |
| DigitalOcean | `digitalocean` |
| Moark | `moark` |
| Charm Hyper | `hyper` |
| Inco | `inco` |
| Requesty | `requesty` |
| Munito AI | `munito` |
| Reflection | `reflection` |
| TensorX | `tensorx` |
| Prime Inference | `prime` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| ModelScope | `modelscope` |
| Vultr | `vultr` |
| Kilo Gateway | `kilo` |
| Zeldoc | `zeldoc` |
| Cerebras | `cerebras` |
| Modular | `modular` |
| CoreWeave | `wandb` |
| AI21 Labs | `ai21` |
| engy | `engy` |
| Deep Infra | `deepinfra` |
| LucidQuery | `lucidquery` |
| Modal | `modal` |
| CoralBricks | `coralbricks` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Inception | `inception` |
| Nebius Token Factory | `nebius` |
| Zhipu AI | `zhipuai` |
| Wafer | `wafer.ai` |
| Auriko | `auriko` |
| Berget.AI | `berget` |
| Volcengine Ark | `volcengine` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| IteraCompute | `iteracompute` |
| Bee by HEOSSI | `bee` |
| Jiekou.AI | `jiekou` |
| GitLab Duo | `gitlab` |
| Atomic Chat | `atomic-chat` |
| GMI Cloud | `gmicloud` |
| Privatemode AI | `privatemode-ai` |
| Azure | `azure` |
| Mistral | `mistral` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| NaN | `nan` |
| HPC-AI | `hpc-ai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Vispark | `vispark` |
| Neon | `neon` |
| Inceptron | `inceptron` |
| evroc | `evroc` |
| NeoSmith | `neosmith` |
| Subconscious | `subconscious` |
| Synthetic | `synthetic` |
| Eden AI | `edenai` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Wallaby | `wallaby` |
| SCX.ai | `scx-ai` |
| NanoGPT | `nano-gpt` |
| Snowflake Cortex | `snowflake-cortex` |
| above.dev | `above` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Nvidia | `nvidia` |
| Thinking Machines | `thinkingmachines` |
| Venice AI | `venice` |
| RunInfra | `runinfra` |
| D.Run (China) | `drun` |
| OpenCode | `opencode` |
| Databricks | `databricks` |
| Vivgrid | `vivgrid` |
| Xiaomi | `xiaomi` |
| routing.run | `routing-run` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Ambient | `ambient` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| OCI Generative AI | `oci` |
| OrcaRouter | `orcarouter` |
| Novita AI | `novita-ai` |
| SambaNova | `sambanova` |
| Ofox | `ofox` |
| Vancine | `vancine` |
| Jalapeno Cloud | `jalapeno` |
| Fireworks AI | `fireworks-ai` |
| STACKIT | `stackit` |
| Lynkr | `lynkr` |
| SiliconFlow (China) | `siliconflow-cn` |
| Abacus | `abacus` |
| LLMTR | `llmtr` |
| LLM Gateway | `llmgateway-providers` |
| Baseten | `baseten` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| CrossModel | `crossmodel` |
| Amazon Bedrock | `amazon-bedrock` |
| Chutes | `chutes` |
| FrogBot | `frogbot` |
| Meganova | `meganova` |
| AMD | `amd` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| watsonx.ai | `watsonx` |
| ainetcafe | `ainetcafe` |
| EBCloud | `ebcloud` |
| OpenCode Go | `opencode-go` |
| Opper | `opper` |
| Perplexity | `perplexity` |
| LLM Tech | `llmtech` |
| DevPass (LLM Gateway) | `llmgateway` |
| NEAR AI Cloud | `nearai` |
| Qiniu | `qiniu-ai` |
| StepFun (China) | `stepfun` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Pendra | `pendra` |
| StepFun (Global) | `stepfun-ai` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Vercel AI Gateway | `vercel` |
| Agnes AI | `agnes` |
| Lilac | `lilac` |
| Tempr Gateway | `tempr` |
| ZenMux | `zenmux` |
| Munito AI (EU) | `munito-eu` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| ai& | `aiand` |
| Alibaba (China) | `alibaba-cn` |
| Standard Compute | `standardcompute` |
| Melious | `melious` |
<!-- PROVIDERS:END -->

## License

MIT
