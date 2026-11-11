# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8606 models · Updated 2026-11-11**
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
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Poolside | `poolside` |
| AKI.IO | `aki-io` |
| Meta | `meta` |
| Berget.AI | `berget` |
| Modal | `modal` |
| Jalapeno Cloud | `jalapeno` |
| Fireworks AI | `fireworks-ai` |
| 302.AI | `302ai` |
| Neuralwatt | `neuralwatt` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Tempr Gateway | `tempr` |
| DInference | `dinference` |
| Requesty | `requesty` |
| CoralBricks | `coralbricks` |
| NaN | `nan` |
| Alibaba Token Plan | `alibaba-token-plan` |
| CoreWeave | `wandb` |
| SaladCloud AI Gateway | `salad-cloud` |
| QVAC | `qvac` |
| xAI | `xai` |
| Bailing | `bailing` |
| Neon | `neon` |
| Clarifai | `clarifai` |
| TokenRouter | `tokenrouter` |
| evroc | `evroc` |
| Charm Hyper | `hyper` |
| ai& | `aiand` |
| Modelis | `modelis` |
| Mixlayer | `mixlayer` |
| LMStudio | `lmstudio` |
| Xpersona | `xpersona` |
| FastRouter | `fastrouter` |
| Tencent TokenHub | `tencent-tokenhub` |
| Ollama Cloud | `ollama-cloud` |
| Cohere | `cohere` |
| watsonx.ai | `watsonx` |
| HPC-AI | `hpc-ai` |
| Baseten | `baseten` |
| GMI Cloud | `gmicloud` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| OpenRouter | `openrouter` |
| Pendra | `pendra` |
| Nvidia | `nvidia` |
| Modular | `modular` |
| RunInfra | `runinfra` |
| FrogBot | `frogbot` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| D.Run (China) | `drun` |
| Databricks | `databricks` |
| Infomaniak | `infomaniak` |
| Kilo Gateway | `kilo` |
| Kenari | `kenari` |
| Nova | `nova` |
| Abacus | `abacus` |
| Novita AI | `novita-ai` |
| Volcengine Ark | `volcengine` |
| OpenCode | `opencode` |
| Bee by HEOSSI | `bee` |
| Z.AI | `zai` |
| Lynkr | `lynkr` |
| AI-ROUTER | `ai-router` |
| Jiekou.AI | `jiekou` |
| abliteration.ai | `abliteration-ai` |
| Wafer | `wafer.ai` |
| ainetcafe | `ainetcafe` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| TokenGo | `tokengo` |
| Claudinio | `claudinio` |
| FreeModel | `freemodel` |
| ZenMux | `zenmux` |
| Inco | `inco` |
| Vispark | `vispark` |
| Vultr | `vultr` |
| SambaNova | `sambanova` |
| OrcaRouter | `orcarouter` |
| StepFun (Global) | `stepfun-ai` |
| Mistral | `mistral` |
| Eden AI | `edenai` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| NeoSmith | `neosmith` |
| Aixy | `aixy` |
| Pareto Inference | `pareto` |
| DeepSeek | `deepseek` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Boundless | `boundless` |
| Echo | `echo` |
| Anthropic | `anthropic` |
| routing.run | `routing-run` |
| Tinfoil | `tinfoil` |
| Wally | `wally` |
| Ofox | `ofox` |
| Perplexity Agent | `perplexity-agent` |
| EmpirioLabs AI | `empiriolabs` |
| Infer by Flow7 | `infer` |
| LLM Gateway | `llmgateway-providers` |
| NanoGPT | `nano-gpt` |
| Cerebras | `cerebras` |
| Cortecs | `cortecs` |
| Zhipu AI | `zhipuai` |
| Auriko | `auriko` |
| Venice AI | `venice` |
| AIHubMix | `aihubmix` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Bothub | `bothub` |
| Together AI | `togetherai` |
| Impossibl | `impossibl` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| OpenAI | `openai` |
| Moonshot AI | `moonshotai` |
| STACKIT | `stackit` |
| LowRouter | `lowrouter` |
| ModelScope | `modelscope` |
| IO.NET | `io-net` |
| Crusoe | `crusoe` |
| Agnes AI | `agnes` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| AMD | `amd` |
| Pioneer | `pioneer` |
| Vancine | `vancine` |
| Qiniu | `qiniu-ai` |
| Amazon Bedrock | `amazon-bedrock` |
| Hetzner | `hetzner` |
| Inference | `inference` |
| SiliconFlow | `siliconflow` |
| TensorX | `tensorx` |
| Hugging Face | `huggingface` |
| Deep Infra | `deepinfra` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| submodel | `submodel` |
| Friendli | `friendli` |
| QiHang | `qihang-ai` |
| GitLab Duo | `gitlab` |
| Google | `google` |
| DigitalOcean | `digitalocean` |
| Tencent Token Plan | `tencent-token-plan` |
| Groq | `groq` |
| Munito AI | `munito` |
| Sarvam AI | `sarvam` |
| InferX | `inferx` |
| klokintegration.se | `klokintegration` |
| EBCloud | `ebcloud` |
| Vercel AI Gateway | `vercel` |
| DevPass (LLM Gateway) | `llmgateway` |
| Snowflake Cortex | `snowflake-cortex` |
| Merge Gateway | `merge-gateway` |
| Scaleway | `scaleway` |
| Vertex | `google-vertex` |
| Regolo AI | `regolo-ai` |
| UnoRouter | `unorouter` |
| SiliconFlow (China) | `siliconflow-cn` |
| Ambient | `ambient` |
| Standard Compute | `standardcompute` |
| Zenifra | `zenifra` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Wallaby | `wallaby` |
| SCX.ai | `scx-ai` |
| Atomic Chat | `atomic-chat` |
| Helicone | `helicone` |
| GreenPT | `greenpt` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| NEAR AI Cloud | `nearai` |
| engy | `engy` |
| OVHcloud AI Endpoints | `ovhcloud` |
| LLMTR | `llmtr` |
| MiniMax (minimax.cn) | `minimax-cn` |
| MiniMax (minimax.io) | `minimax` |
| Nebius Token Factory | `nebius` |
| Meganova | `meganova` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Reflection | `reflection` |
| ClinePass | `cline-pass` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| StepFun (China) | `stepfun` |
| Zeldoc | `zeldoc` |
| AI21 Labs | `ai21` |
| Synthetic | `synthetic` |
| OpenCode Go | `opencode-go` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Prime Inference | `prime` |
| Perplexity | `perplexity` |
| GitHub Copilot | `github-copilot` |
| Alibaba (China) | `alibaba-cn` |
| LongCat | `longcat` |
| Melious | `melious` |
| Hopper | `hopper` |
| Poe | `poe` |
| Chutes | `chutes` |
| Moonshot AI (China) | `moonshotai-cn` |
| Upstage | `upstage` |
| Munito AI (EU) | `munito-eu` |
| OCI Generative AI | `oci` |
| Arcee | `arcee` |
| Lilac | `lilac` |
| Vivgrid | `vivgrid` |
| above.dev | `above` |
| Umans AI | `umans-ai` |
| Xiaomi | `xiaomi` |
| SAP AI Core | `sap-ai-core` |
| Thinking Machines | `thinkingmachines` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Subconscious | `subconscious` |
| Inceptron | `inceptron` |
| DaoXE | `daoxe` |
| Opper | `opper` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Morph | `morph` |
| OpenReason | `openreason` |
| CommandCode | `commandcode` |
| LucidQuery | `lucidquery` |
| CrossModel | `crossmodel` |
| Alibaba | `alibaba` |
| Azure | `azure` |
| LLM Tech | `llmtech` |
| IteraCompute | `iteracompute` |
| AI/ML API | `aimlapi` |
| SCNet Token Plan | `scnet-token-plan` |
| Kosmik Compute | `kosmik` |
| Privatemode AI | `privatemode-ai` |
| Sakana AI | `sakana` |
| Inception | `inception` |
| Moark | `moark` |
| SenseNova (China) | `sensenova` |
<!-- PROVIDERS:END -->

## License

MIT
