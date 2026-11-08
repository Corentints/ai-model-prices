# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8545 models · Updated 2026-11-08**
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
| Novita AI | `novita-ai` |
| Cortecs | `cortecs` |
| SCNet Token Plan | `scnet-token-plan` |
| Vancine | `vancine` |
| Moark | `moark` |
| Hugging Face | `huggingface` |
| ainetcafe | `ainetcafe` |
| SiliconFlow | `siliconflow` |
| DevPass (LLM Gateway) | `llmgateway` |
| IteraCompute | `iteracompute` |
| Bothub | `bothub` |
| Merge Gateway | `merge-gateway` |
| Jalapeno Cloud | `jalapeno` |
| TensorX | `tensorx` |
| Perplexity | `perplexity` |
| Nvidia | `nvidia` |
| Subconscious | `subconscious` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| IO.NET | `io-net` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| CommandCode | `commandcode` |
| ClinePass | `cline-pass` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Cohere | `cohere` |
| SenseNova (China) | `sensenova` |
| Cerebras | `cerebras` |
| STACKIT | `stackit` |
| Databricks | `databricks` |
| abliteration.ai | `abliteration-ai` |
| Amazon Bedrock | `amazon-bedrock` |
| Munito AI | `munito` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Meta | `meta` |
| Agnes AI | `agnes` |
| Xpersona | `xpersona` |
| Deep Infra | `deepinfra` |
| above.dev | `above` |
| Requesty | `requesty` |
| Pareto Inference | `pareto` |
| Regolo AI | `regolo-ai` |
| InferX | `inferx` |
| LMStudio | `lmstudio` |
| Atomic Chat | `atomic-chat` |
| Poolside | `poolside` |
| Umans AI | `umans-ai` |
| Modelis | `modelis` |
| Poe | `poe` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Modal | `modal` |
| LowRouter | `lowrouter` |
| FreeModel | `freemodel` |
| OpenAI | `openai` |
| QVAC | `qvac` |
| Z.AI | `zai` |
| Lilac | `lilac` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Kilo Gateway | `kilo` |
| OpenCode | `opencode` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| RunInfra | `runinfra` |
| routing.run | `routing-run` |
| Crusoe | `crusoe` |
| klokintegration.se | `klokintegration` |
| EBCloud | `ebcloud` |
| ai& | `aiand` |
| Mistral | `mistral` |
| AI-ROUTER | `ai-router` |
| CoreWeave | `wandb` |
| Moonshot AI | `moonshotai` |
| Hetzner | `hetzner` |
| Morph | `morph` |
| GreenPT | `greenpt` |
| Ofox | `ofox` |
| CrossModel | `crossmodel` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Zeldoc | `zeldoc` |
| Eden AI | `edenai` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Inception | `inception` |
| watsonx.ai | `watsonx` |
| Clarifai | `clarifai` |
| Alibaba (China) | `alibaba-cn` |
| GitHub Copilot | `github-copilot` |
| Impossibl | `impossibl` |
| Synthetic | `synthetic` |
| Melious | `melious` |
| Infomaniak | `infomaniak` |
| Arcee | `arcee` |
| Inceptron | `inceptron` |
| Tencent TokenHub | `tencent-tokenhub` |
| Chutes | `chutes` |
| Neon | `neon` |
| Volcengine Ark | `volcengine` |
| UnoRouter | `unorouter` |
| OpenReason | `openreason` |
| Thinking Machines | `thinkingmachines` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Inco | `inco` |
| ZenMux | `zenmux` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Kenari | `kenari` |
| OpenRouter | `openrouter` |
| Together AI | `togetherai` |
| Nebius Token Factory | `nebius` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| evroc | `evroc` |
| Munito AI (EU) | `munito-eu` |
| FrogBot | `frogbot` |
| Neuralwatt | `neuralwatt` |
| Meganova | `meganova` |
| Standard Compute | `standardcompute` |
| Reflection | `reflection` |
| Aixy | `aixy` |
| NanoGPT | `nano-gpt` |
| GMI Cloud | `gmicloud` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Abacus | `abacus` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Scaleway | `scaleway` |
| Moonshot AI (China) | `moonshotai-cn` |
| Vertex | `google-vertex` |
| EmpirioLabs AI | `empiriolabs` |
| Tinfoil | `tinfoil` |
| NEAR AI Cloud | `nearai` |
| LucidQuery | `lucidquery` |
| Bailing | `bailing` |
| Opper | `opper` |
| Friendli | `friendli` |
| Nova | `nova` |
| Wally | `wally` |
| Pioneer | `pioneer` |
| SiliconFlow (China) | `siliconflow-cn` |
| AI21 Labs | `ai21` |
| AKI.IO | `aki-io` |
| Berget.AI | `berget` |
| LLM Tech | `llmtech` |
| OpenCode Go | `opencode-go` |
| SCX.ai | `scx-ai` |
| Fireworks AI | `fireworks-ai` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Infer by Flow7 | `infer` |
| DInference | `dinference` |
| Snowflake Cortex | `snowflake-cortex` |
| QiHang | `qihang-ai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| D.Run (China) | `drun` |
| Hopper | `hopper` |
| CoralBricks | `coralbricks` |
| Perplexity Agent | `perplexity-agent` |
| Upstage | `upstage` |
| Sarvam AI | `sarvam` |
| SAP AI Core | `sap-ai-core` |
| Azure | `azure` |
| Echo | `echo` |
| Vivgrid | `vivgrid` |
| DaoXE | `daoxe` |
| Xiaomi | `xiaomi` |
| AIHubMix | `aihubmix` |
| LLM Gateway | `llmgateway-providers` |
| Boundless | `boundless` |
| Zenifra | `zenifra` |
| AI/ML API | `aimlapi` |
| Modular | `modular` |
| LLMTR | `llmtr` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Claudinio | `claudinio` |
| Tencent Token Plan | `tencent-token-plan` |
| ModelScope | `modelscope` |
| xAI | `xai` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| DigitalOcean | `digitalocean` |
| StepFun (China) | `stepfun` |
| SambaNova | `sambanova` |
| 302.AI | `302ai` |
| Mixlayer | `mixlayer` |
| Prime Inference | `prime` |
| Zhipu AI | `zhipuai` |
| Ambient | `ambient` |
| submodel | `submodel` |
| TokenRouter | `tokenrouter` |
| Wallaby | `wallaby` |
| Vispark | `vispark` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Kosmik Compute | `kosmik` |
| OCI Generative AI | `oci` |
| Bee by HEOSSI | `bee` |
| Tempr Gateway | `tempr` |
| OrcaRouter | `orcarouter` |
| Sakana AI | `sakana` |
| Google | `google` |
| Auriko | `auriko` |
| Charm Hyper | `hyper` |
| engy | `engy` |
| Pendra | `pendra` |
| StepFun (Global) | `stepfun-ai` |
| Lynkr | `lynkr` |
| DeepSeek | `deepseek` |
| Privatemode AI | `privatemode-ai` |
| NeoSmith | `neosmith` |
| NaN | `nan` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Baseten | `baseten` |
| MiniMax (minimax.io) | `minimax` |
| Inference | `inference` |
| Anthropic | `anthropic` |
| TokenGo | `tokengo` |
| Alibaba | `alibaba` |
| Groq | `groq` |
| Ollama Cloud | `ollama-cloud` |
| HPC-AI | `hpc-ai` |
| Jiekou.AI | `jiekou` |
| SaladCloud AI Gateway | `salad-cloud` |
| Wafer | `wafer.ai` |
| Vultr | `vultr` |
| Qiniu | `qiniu-ai` |
| Vercel AI Gateway | `vercel` |
| LongCat | `longcat` |
| AMD | `amd` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Helicone | `helicone` |
| FastRouter | `fastrouter` |
| Venice AI | `venice` |
| GitLab Duo | `gitlab` |
<!-- PROVIDERS:END -->

## License

MIT
