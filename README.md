# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**224 providers · 8547 models · Updated 2026-10-28**
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
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| OpenAI | `openai` |
| OpenCode | `opencode` |
| EmpirioLabs AI | `empiriolabs` |
| Merge Gateway | `merge-gateway` |
| Hetzner | `hetzner` |
| GitHub Copilot | `github-copilot` |
| Clarifai | `clarifai` |
| SiliconFlow (China) | `siliconflow-cn` |
| Inceptron | `inceptron` |
| NaN | `nan` |
| LongCat | `longcat` |
| Synthetic | `synthetic` |
| OpenReason | `openreason` |
| Modelis | `modelis` |
| LLM Gateway | `llmgateway-providers` |
| Anthropic | `anthropic` |
| Ollama Cloud | `ollama-cloud` |
| CoralBricks | `coralbricks` |
| Charm Hyper | `hyper` |
| Vultr | `vultr` |
| Bothub | `bothub` |
| Xiaomi | `xiaomi` |
| Munito AI (EU) | `munito-eu` |
| GitLab Duo | `gitlab` |
| Melious | `melious` |
| Thinking Machines | `thinkingmachines` |
| AI/ML API | `aimlapi` |
| Nova | `nova` |
| Moark | `moark` |
| OpenRouter | `openrouter` |
| SenseNova (China) | `sensenova` |
| Vispark | `vispark` |
| Azure | `azure` |
| STACKIT | `stackit` |
| Aixy | `aixy` |
| Arcee | `arcee` |
| above.dev | `above` |
| Pareto Inference | `pareto` |
| Poe | `poe` |
| Qiniu | `qiniu-ai` |
| Upstage | `upstage` |
| Nvidia | `nvidia` |
| Munito AI | `munito` |
| Eden AI | `edenai` |
| GreenPT | `greenpt` |
| ClinePass | `cline-pass` |
| Xpersona | `xpersona` |
| Azure Cognitive Services | `azure-cognitive-services` |
| IO.NET | `io-net` |
| Inco | `inco` |
| Vivgrid | `vivgrid` |
| Kenari | `kenari` |
| NEAR AI Cloud | `nearai` |
| DevPass (LLM Gateway) | `llmgateway` |
| AKI.IO | `aki-io` |
| Jiekou.AI | `jiekou` |
| Groq | `groq` |
| Claudinio | `claudinio` |
| GMI Cloud | `gmicloud` |
| Amazon Bedrock | `amazon-bedrock` |
| Alibaba | `alibaba` |
| Zhipu AI | `zhipuai` |
| UnoRouter | `unorouter` |
| Wafer | `wafer.ai` |
| Abacus | `abacus` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Jalapeno Cloud | `jalapeno` |
| Venice AI | `venice` |
| InferX | `inferx` |
| Atomic Chat | `atomic-chat` |
| TensorX | `tensorx` |
| Cortecs | `cortecs` |
| NanoGPT | `nano-gpt` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Fireworks AI | `fireworks-ai` |
| Alibaba (China) | `alibaba-cn` |
| RunInfra | `runinfra` |
| OrcaRouter | `orcarouter` |
| Wallaby | `wallaby` |
| Tencent TokenHub | `tencent-tokenhub` |
| Z.AI | `zai` |
| OCI Generative AI | `oci` |
| Modular | `modular` |
| MiniMax (minimax.cn) | `minimax-cn` |
| abliteration.ai | `abliteration-ai` |
| evroc | `evroc` |
| DeepSeek | `deepseek` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Deep Infra | `deepinfra` |
| Meta | `meta` |
| Perplexity | `perplexity` |
| Baseten | `baseten` |
| Snowflake Cortex | `snowflake-cortex` |
| Ambient | `ambient` |
| Infomaniak | `infomaniak` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Impossibl | `impossibl` |
| Prime Inference | `prime` |
| OVHcloud AI Endpoints | `ovhcloud` |
| LLM Tech | `llmtech` |
| routing.run | `routing-run` |
| SCX.ai | `scx-ai` |
| engy | `engy` |
| Standard Compute | `standardcompute` |
| submodel | `submodel` |
| AI21 Labs | `ai21` |
| Modal | `modal` |
| Privatemode AI | `privatemode-ai` |
| SAP AI Core | `sap-ai-core` |
| Scaleway | `scaleway` |
| Echo | `echo` |
| TokenRouter | `tokenrouter` |
| MiniMax (minimax.io) | `minimax` |
| Novita AI | `novita-ai` |
| Agnes AI | `agnes` |
| Meganova | `meganova` |
| DInference | `dinference` |
| LowRouter | `lowrouter` |
| Crusoe | `crusoe` |
| Neon | `neon` |
| ainetcafe | `ainetcafe` |
| NeoSmith | `neosmith` |
| Nebius Token Factory | `nebius` |
| Morph | `morph` |
| Bee by HEOSSI | `bee` |
| Google | `google` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Neuralwatt | `neuralwatt` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| SiliconFlow | `siliconflow` |
| AIHubMix | `aihubmix` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| 302.AI | `302ai` |
| Cerebras | `cerebras` |
| OpenCode Go | `opencode-go` |
| FreeModel | `freemodel` |
| Inference | `inference` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Databricks | `databricks` |
| EBCloud | `ebcloud` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Mistral | `mistral` |
| Pendra | `pendra` |
| Perplexity Agent | `perplexity-agent` |
| FrogBot | `frogbot` |
| StepFun (China) | `stepfun` |
| Requesty | `requesty` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| ModelScope | `modelscope` |
| Cohere | `cohere` |
| Chutes | `chutes` |
| CrossModel | `crossmodel` |
| Inception | `inception` |
| SambaNova | `sambanova` |
| Sarvam AI | `sarvam` |
| TokenGo | `tokengo` |
| Infer by Flow7 | `infer` |
| Sakana AI | `sakana` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Bailing | `bailing` |
| QiHang | `qihang-ai` |
| Vercel AI Gateway | `vercel` |
| SaladCloud AI Gateway | `salad-cloud` |
| Mixlayer | `mixlayer` |
| HPC-AI | `hpc-ai` |
| IteraCompute | `iteracompute` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Boundless | `boundless` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Regolo AI | `regolo-ai` |
| DigitalOcean | `digitalocean` |
| watsonx.ai | `watsonx` |
| LLMTR | `llmtr` |
| AI-ROUTER | `ai-router` |
| Reflection | `reflection` |
| Subconscious | `subconscious` |
| Lilac | `lilac` |
| Umans AI | `umans-ai` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| xAI | `xai` |
| CoreWeave | `wandb` |
| AMD | `amd` |
| Kosmik Compute | `kosmik` |
| Lynkr | `lynkr` |
| LucidQuery | `lucidquery` |
| Pioneer | `pioneer` |
| Zeldoc | `zeldoc` |
| Poolside | `poolside` |
| Tinfoil | `tinfoil` |
| D.Run (China) | `drun` |
| DaoXE | `daoxe` |
| Friendli | `friendli` |
| Moonshot AI (China) | `moonshotai-cn` |
| Moonshot AI | `moonshotai` |
| klokintegration.se | `klokintegration` |
| Together AI | `togetherai` |
| Auriko | `auriko` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Vancine | `vancine` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Hugging Face | `huggingface` |
| FastRouter | `fastrouter` |
| ai& | `aiand` |
| ZenMux | `zenmux` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Vertex | `google-vertex` |
| CommandCode | `commandcode` |
| StepFun (Global) | `stepfun-ai` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Ofox | `ofox` |
| Zenifra | `zenifra` |
| LMStudio | `lmstudio` |
| Opper | `opper` |
| Volcengine Ark | `volcengine` |
| SCNet Token Plan | `scnet-token-plan` |
| Helicone | `helicone` |
| Tempr Gateway | `tempr` |
| Kilo Gateway | `kilo` |
| QVAC | `qvac` |
| Berget.AI | `berget` |
| Tencent Token Plan | `tencent-token-plan` |
<!-- PROVIDERS:END -->

## License

MIT
