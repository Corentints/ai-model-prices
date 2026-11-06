# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8547 models · Updated 2026-11-06**
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
| Tempr Gateway | `tempr` |
| EmpirioLabs AI | `empiriolabs` |
| xAI | `xai` |
| Xiaomi | `xiaomi` |
| STACKIT | `stackit` |
| StepFun (Global) | `stepfun-ai` |
| CoreWeave | `wandb` |
| Modular | `modular` |
| Melious | `melious` |
| Ofox | `ofox` |
| Opper | `opper` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Azure | `azure` |
| LLM Tech | `llmtech` |
| SenseNova (China) | `sensenova` |
| Wally | `wally` |
| abliteration.ai | `abliteration-ai` |
| SCX.ai | `scx-ai` |
| Arcee | `arcee` |
| Moark | `moark` |
| Infomaniak | `infomaniak` |
| submodel | `submodel` |
| DeepSeek | `deepseek` |
| Meta | `meta` |
| Nebius Token Factory | `nebius` |
| Alibaba (China) | `alibaba-cn` |
| InferX | `inferx` |
| Poe | `poe` |
| Cohere | `cohere` |
| Vancine | `vancine` |
| Moonshot AI (China) | `moonshotai-cn` |
| Modelis | `modelis` |
| RunInfra | `runinfra` |
| Hugging Face | `huggingface` |
| engy | `engy` |
| Neon | `neon` |
| LMStudio | `lmstudio` |
| AI21 Labs | `ai21` |
| LowRouter | `lowrouter` |
| Upstage | `upstage` |
| Reflection | `reflection` |
| Bee by HEOSSI | `bee` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| DaoXE | `daoxe` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Regolo AI | `regolo-ai` |
| Inceptron | `inceptron` |
| GitHub Copilot | `github-copilot` |
| Prime Inference | `prime` |
| AI/ML API | `aimlapi` |
| LLM Gateway | `llmgateway-providers` |
| Neuralwatt | `neuralwatt` |
| Crusoe | `crusoe` |
| Boundless | `boundless` |
| Venice AI | `venice` |
| Eden AI | `edenai` |
| Abacus | `abacus` |
| DevPass (LLM Gateway) | `llmgateway` |
| Zenifra | `zenifra` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| OpenAI | `openai` |
| SambaNova | `sambanova` |
| Charm Hyper | `hyper` |
| Inco | `inco` |
| Lilac | `lilac` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| CrossModel | `crossmodel` |
| 302.AI | `302ai` |
| Wafer | `wafer.ai` |
| Tencent TokenHub | `tencent-tokenhub` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Auriko | `auriko` |
| IteraCompute | `iteracompute` |
| HPC-AI | `hpc-ai` |
| Sarvam AI | `sarvam` |
| Pareto Inference | `pareto` |
| Hopper | `hopper` |
| Z.AI | `zai` |
| Standard Compute | `standardcompute` |
| EBCloud | `ebcloud` |
| SAP AI Core | `sap-ai-core` |
| ClinePass | `cline-pass` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| watsonx.ai | `watsonx` |
| D.Run (China) | `drun` |
| OrcaRouter | `orcarouter` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Bailing | `bailing` |
| LLMTR | `llmtr` |
| SaladCloud AI Gateway | `salad-cloud` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Nvidia | `nvidia` |
| Google | `google` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| OpenReason | `openreason` |
| Novita AI | `novita-ai` |
| Infer by Flow7 | `infer` |
| GreenPT | `greenpt` |
| Inference | `inference` |
| Claudinio | `claudinio` |
| Vultr | `vultr` |
| Perplexity | `perplexity` |
| SiliconFlow | `siliconflow` |
| klokintegration.se | `klokintegration` |
| DInference | `dinference` |
| OpenCode | `opencode` |
| FastRouter | `fastrouter` |
| Friendli | `friendli` |
| CommandCode | `commandcode` |
| TokenGo | `tokengo` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| IO.NET | `io-net` |
| Perplexity Agent | `perplexity-agent` |
| Morph | `morph` |
| Munito AI (EU) | `munito-eu` |
| Together AI | `togetherai` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Scaleway | `scaleway` |
| Databricks | `databricks` |
| LongCat | `longcat` |
| Amazon Bedrock | `amazon-bedrock` |
| Kilo Gateway | `kilo` |
| Vivgrid | `vivgrid` |
| OpenCode Go | `opencode-go` |
| Bothub | `bothub` |
| Nova | `nova` |
| Helicone | `helicone` |
| GitLab Duo | `gitlab` |
| Lynkr | `lynkr` |
| Umans AI | `umans-ai` |
| Qiniu | `qiniu-ai` |
| Echo | `echo` |
| Meganova | `meganova` |
| NEAR AI Cloud | `nearai` |
| AMD | `amd` |
| QiHang | `qihang-ai` |
| Poolside | `poolside` |
| FreeModel | `freemodel` |
| NaN | `nan` |
| AI-ROUTER | `ai-router` |
| Jalapeno Cloud | `jalapeno` |
| Deep Infra | `deepinfra` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Tencent Token Plan | `tencent-token-plan` |
| Modal | `modal` |
| Vercel AI Gateway | `vercel` |
| QVAC | `qvac` |
| Wallaby | `wallaby` |
| ModelScope | `modelscope` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Munito AI | `munito` |
| Zhipu AI | `zhipuai` |
| Snowflake Cortex | `snowflake-cortex` |
| Privatemode AI | `privatemode-ai` |
| routing.run | `routing-run` |
| StepFun (China) | `stepfun` |
| Alibaba | `alibaba` |
| TokenRouter | `tokenrouter` |
| Anthropic | `anthropic` |
| Kenari | `kenari` |
| FrogBot | `frogbot` |
| evroc | `evroc` |
| Ollama Cloud | `ollama-cloud` |
| NeoSmith | `neosmith` |
| Aixy | `aixy` |
| Jiekou.AI | `jiekou` |
| Kosmik Compute | `kosmik` |
| UnoRouter | `unorouter` |
| Ambient | `ambient` |
| Mixlayer | `mixlayer` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Impossibl | `impossibl` |
| GMI Cloud | `gmicloud` |
| MiniMax (minimax.io) | `minimax` |
| Agnes AI | `agnes` |
| Cortecs | `cortecs` |
| Merge Gateway | `merge-gateway` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| AIHubMix | `aihubmix` |
| Vispark | `vispark` |
| NanoGPT | `nano-gpt` |
| Clarifai | `clarifai` |
| Inception | `inception` |
| Hetzner | `hetzner` |
| ainetcafe | `ainetcafe` |
| Moonshot AI | `moonshotai` |
| AKI.IO | `aki-io` |
| OCI Generative AI | `oci` |
| Xpersona | `xpersona` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Vertex | `google-vertex` |
| Subconscious | `subconscious` |
| LucidQuery | `lucidquery` |
| TensorX | `tensorx` |
| Fireworks AI | `fireworks-ai` |
| Sakana AI | `sakana` |
| ai& | `aiand` |
| SiliconFlow (China) | `siliconflow-cn` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Atomic Chat | `atomic-chat` |
| Baseten | `baseten` |
| Groq | `groq` |
| Chutes | `chutes` |
| above.dev | `above` |
| Zeldoc | `zeldoc` |
| Cerebras | `cerebras` |
| Tinfoil | `tinfoil` |
| Synthetic | `synthetic` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| SCNet Token Plan | `scnet-token-plan` |
| Berget.AI | `berget` |
| ZenMux | `zenmux` |
| OpenRouter | `openrouter` |
| CoralBricks | `coralbricks` |
| Pendra | `pendra` |
| Requesty | `requesty` |
| DigitalOcean | `digitalocean` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Pioneer | `pioneer` |
| Thinking Machines | `thinkingmachines` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Volcengine Ark | `volcengine` |
| Mistral | `mistral` |
<!-- PROVIDERS:END -->

## License

MIT
