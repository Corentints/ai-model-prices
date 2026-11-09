# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8545 models · Updated 2026-11-09**
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
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Alibaba | `alibaba` |
| Amazon Bedrock | `amazon-bedrock` |
| SambaNova | `sambanova` |
| Vertex | `google-vertex` |
| Together AI | `togetherai` |
| EmpirioLabs AI | `empiriolabs` |
| Lynkr | `lynkr` |
| GitHub Copilot | `github-copilot` |
| Xpersona | `xpersona` |
| FastRouter | `fastrouter` |
| Nvidia | `nvidia` |
| Pendra | `pendra` |
| Perplexity Agent | `perplexity-agent` |
| Jiekou.AI | `jiekou` |
| StepFun (Global) | `stepfun-ai` |
| OpenAI | `openai` |
| routing.run | `routing-run` |
| SenseNova (China) | `sensenova` |
| QiHang | `qihang-ai` |
| Neon | `neon` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Echo | `echo` |
| AMD | `amd` |
| NEAR AI Cloud | `nearai` |
| NeoSmith | `neosmith` |
| FreeModel | `freemodel` |
| TensorX | `tensorx` |
| Clarifai | `clarifai` |
| Inceptron | `inceptron` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Qiniu | `qiniu-ai` |
| 302.AI | `302ai` |
| LucidQuery | `lucidquery` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Meganova | `meganova` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| klokintegration.se | `klokintegration` |
| OrcaRouter | `orcarouter` |
| evroc | `evroc` |
| LongCat | `longcat` |
| TokenGo | `tokengo` |
| Wally | `wally` |
| Munito AI | `munito` |
| CommandCode | `commandcode` |
| Moark | `moark` |
| Opper | `opper` |
| Infomaniak | `infomaniak` |
| Poolside | `poolside` |
| Merge Gateway | `merge-gateway` |
| Lilac | `lilac` |
| Modelis | `modelis` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| IteraCompute | `iteracompute` |
| Alibaba Token Plan | `alibaba-token-plan` |
| StepFun (China) | `stepfun` |
| Munito AI (EU) | `munito-eu` |
| Thinking Machines | `thinkingmachines` |
| LowRouter | `lowrouter` |
| Berget.AI | `berget` |
| InferX | `inferx` |
| Abacus | `abacus` |
| Eden AI | `edenai` |
| AIHubMix | `aihubmix` |
| Ollama Cloud | `ollama-cloud` |
| RunInfra | `runinfra` |
| Fireworks AI | `fireworks-ai` |
| SiliconFlow | `siliconflow` |
| Jalapeno Cloud | `jalapeno` |
| Sakana AI | `sakana` |
| NaN | `nan` |
| Claudinio | `claudinio` |
| Aixy | `aixy` |
| Vancine | `vancine` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Requesty | `requesty` |
| OpenCode Go | `opencode-go` |
| GreenPT | `greenpt` |
| LMStudio | `lmstudio` |
| Ambient | `ambient` |
| EBCloud | `ebcloud` |
| Poe | `poe` |
| Modal | `modal` |
| Bee by HEOSSI | `bee` |
| Zenifra | `zenifra` |
| CoralBricks | `coralbricks` |
| UnoRouter | `unorouter` |
| Friendli | `friendli` |
| Upstage | `upstage` |
| OpenRouter | `openrouter` |
| Baseten | `baseten` |
| Sarvam AI | `sarvam` |
| Bailing | `bailing` |
| Mistral | `mistral` |
| OpenReason | `openreason` |
| Hopper | `hopper` |
| Melious | `melious` |
| Anthropic | `anthropic` |
| engy | `engy` |
| Vivgrid | `vivgrid` |
| above.dev | `above` |
| Hugging Face | `huggingface` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| LLM Gateway | `llmgateway-providers` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Moonshot AI | `moonshotai` |
| Cortecs | `cortecs` |
| Pioneer | `pioneer` |
| Moonshot AI (China) | `moonshotai-cn` |
| Chutes | `chutes` |
| Subconscious | `subconscious` |
| abliteration.ai | `abliteration-ai` |
| ModelScope | `modelscope` |
| AI21 Labs | `ai21` |
| Infer by Flow7 | `infer` |
| Venice AI | `venice` |
| Snowflake Cortex | `snowflake-cortex` |
| Databricks | `databricks` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Vercel AI Gateway | `vercel` |
| Cerebras | `cerebras` |
| Agnes AI | `agnes` |
| Vispark | `vispark` |
| AI-ROUTER | `ai-router` |
| Mixlayer | `mixlayer` |
| Perplexity | `perplexity` |
| Bothub | `bothub` |
| Neuralwatt | `neuralwatt` |
| FrogBot | `frogbot` |
| Meta | `meta` |
| Google | `google` |
| Privatemode AI | `privatemode-ai` |
| SCNet Token Plan | `scnet-token-plan` |
| Volcengine Ark | `volcengine` |
| Kenari | `kenari` |
| OCI Generative AI | `oci` |
| CoreWeave | `wandb` |
| Pareto Inference | `pareto` |
| Reflection | `reflection` |
| DigitalOcean | `digitalocean` |
| SiliconFlow (China) | `siliconflow-cn` |
| STACKIT | `stackit` |
| Novita AI | `novita-ai` |
| Crusoe | `crusoe` |
| SaladCloud AI Gateway | `salad-cloud` |
| LLMTR | `llmtr` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Cohere | `cohere` |
| Inco | `inco` |
| ZenMux | `zenmux` |
| Tempr Gateway | `tempr` |
| Arcee | `arcee` |
| IO.NET | `io-net` |
| D.Run (China) | `drun` |
| Impossibl | `impossibl` |
| ai& | `aiand` |
| DeepSeek | `deepseek` |
| GitLab Duo | `gitlab` |
| Zhipu AI | `zhipuai` |
| Tencent TokenHub | `tencent-tokenhub` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Groq | `groq` |
| Z.AI | `zai` |
| DaoXE | `daoxe` |
| Azure | `azure` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| DevPass (LLM Gateway) | `llmgateway` |
| AKI.IO | `aki-io` |
| xAI | `xai` |
| Boundless | `boundless` |
| Kosmik Compute | `kosmik` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Deep Infra | `deepinfra` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Ofox | `ofox` |
| OpenCode | `opencode` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Zeldoc | `zeldoc` |
| Regolo AI | `regolo-ai` |
| Wafer | `wafer.ai` |
| GMI Cloud | `gmicloud` |
| SCX.ai | `scx-ai` |
| Charm Hyper | `hyper` |
| Prime Inference | `prime` |
| HPC-AI | `hpc-ai` |
| DInference | `dinference` |
| ClinePass | `cline-pass` |
| NanoGPT | `nano-gpt` |
| Scaleway | `scaleway` |
| Morph | `morph` |
| Alibaba (China) | `alibaba-cn` |
| Inception | `inception` |
| Tencent Token Plan | `tencent-token-plan` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| CrossModel | `crossmodel` |
| ainetcafe | `ainetcafe` |
| Inference | `inference` |
| Hetzner | `hetzner` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Wallaby | `wallaby` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| AI/ML API | `aimlapi` |
| Vultr | `vultr` |
| Tinfoil | `tinfoil` |
| Kilo Gateway | `kilo` |
| Synthetic | `synthetic` |
| LLM Tech | `llmtech` |
| Umans AI | `umans-ai` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Standard Compute | `standardcompute` |
| Atomic Chat | `atomic-chat` |
| SAP AI Core | `sap-ai-core` |
| submodel | `submodel` |
| MiniMax (minimax.cn) | `minimax-cn` |
| TokenRouter | `tokenrouter` |
| Helicone | `helicone` |
| Modular | `modular` |
| watsonx.ai | `watsonx` |
| MiniMax (minimax.io) | `minimax` |
| Xiaomi | `xiaomi` |
| QVAC | `qvac` |
| Nebius Token Factory | `nebius` |
| Auriko | `auriko` |
| Nova | `nova` |
| Z.AI Coding Plan | `zai-coding-plan` |
<!-- PROVIDERS:END -->

## License

MIT
