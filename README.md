# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8546 models · Updated 2026-11-07**
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
| klokintegration.se | `klokintegration` |
| Anthropic | `anthropic` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Neuralwatt | `neuralwatt` |
| Bothub | `bothub` |
| Inception | `inception` |
| Inceptron | `inceptron` |
| Prime Inference | `prime` |
| Vertex | `google-vertex` |
| AI/ML API | `aimlapi` |
| OrcaRouter | `orcarouter` |
| TokenGo | `tokengo` |
| Friendli | `friendli` |
| LLMTR | `llmtr` |
| StepFun (China) | `stepfun` |
| Mixlayer | `mixlayer` |
| Nova | `nova` |
| Cohere | `cohere` |
| Pareto Inference | `pareto` |
| AI-ROUTER | `ai-router` |
| Kosmik Compute | `kosmik` |
| Ofox | `ofox` |
| Infomaniak | `infomaniak` |
| Google | `google` |
| NeoSmith | `neosmith` |
| StepFun (Global) | `stepfun-ai` |
| AKI.IO | `aki-io` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Wally | `wally` |
| Abacus | `abacus` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Vercel AI Gateway | `vercel` |
| LLM Gateway | `llmgateway-providers` |
| FreeModel | `freemodel` |
| Poe | `poe` |
| Infer by Flow7 | `infer` |
| Chutes | `chutes` |
| Fireworks AI | `fireworks-ai` |
| Tempr Gateway | `tempr` |
| Lilac | `lilac` |
| Opper | `opper` |
| Echo | `echo` |
| SAP AI Core | `sap-ai-core` |
| Poolside | `poolside` |
| Charm Hyper | `hyper` |
| routing.run | `routing-run` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Volcengine Ark | `volcengine` |
| Sakana AI | `sakana` |
| SiliconFlow (China) | `siliconflow-cn` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| ModelScope | `modelscope` |
| ai& | `aiand` |
| Claudinio | `claudinio` |
| Munito AI | `munito` |
| Modelis | `modelis` |
| Xpersona | `xpersona` |
| FastRouter | `fastrouter` |
| xAI | `xai` |
| Amazon Bedrock | `amazon-bedrock` |
| OpenReason | `openreason` |
| Cortecs | `cortecs` |
| SambaNova | `sambanova` |
| Nvidia | `nvidia` |
| GreenPT | `greenpt` |
| AMD | `amd` |
| Morph | `morph` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| SCNet Token Plan | `scnet-token-plan` |
| CoreWeave | `wandb` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Meta | `meta` |
| Nebius Token Factory | `nebius` |
| LongCat | `longcat` |
| Merge Gateway | `merge-gateway` |
| GitHub Copilot | `github-copilot` |
| Atomic Chat | `atomic-chat` |
| above.dev | `above` |
| LMStudio | `lmstudio` |
| EBCloud | `ebcloud` |
| MiniMax (minimax.io) | `minimax` |
| Venice AI | `venice` |
| Groq | `groq` |
| AI21 Labs | `ai21` |
| Vultr | `vultr` |
| Jiekou.AI | `jiekou` |
| Regolo AI | `regolo-ai` |
| NaN | `nan` |
| Alibaba | `alibaba` |
| Together AI | `togetherai` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Synthetic | `synthetic` |
| Lynkr | `lynkr` |
| LucidQuery | `lucidquery` |
| Modular | `modular` |
| SiliconFlow | `siliconflow` |
| UnoRouter | `unorouter` |
| Moonshot AI (China) | `moonshotai-cn` |
| Cerebras | `cerebras` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Boundless | `boundless` |
| Mistral | `mistral` |
| Ambient | `ambient` |
| Requesty | `requesty` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| CrossModel | `crossmodel` |
| FrogBot | `frogbot` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| DevPass (LLM Gateway) | `llmgateway` |
| Auriko | `auriko` |
| OpenCode Go | `opencode-go` |
| AIHubMix | `aihubmix` |
| Munito AI (EU) | `munito-eu` |
| QVAC | `qvac` |
| Eden AI | `edenai` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Moark | `moark` |
| Wallaby | `wallaby` |
| abliteration.ai | `abliteration-ai` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Baseten | `baseten` |
| Crusoe | `crusoe` |
| Meganova | `meganova` |
| SenseNova (China) | `sensenova` |
| Standard Compute | `standardcompute` |
| CommandCode | `commandcode` |
| Ollama Cloud | `ollama-cloud` |
| OpenRouter | `openrouter` |
| NEAR AI Cloud | `nearai` |
| engy | `engy` |
| Perplexity | `perplexity` |
| Sarvam AI | `sarvam` |
| Helicone | `helicone` |
| Vispark | `vispark` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| NanoGPT | `nano-gpt` |
| OpenCode | `opencode` |
| evroc | `evroc` |
| InferX | `inferx` |
| Neon | `neon` |
| Tencent Token Plan | `tencent-token-plan` |
| SCX.ai | `scx-ai` |
| Hopper | `hopper` |
| LLM Tech | `llmtech` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Zenifra | `zenifra` |
| Pendra | `pendra` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| SaladCloud AI Gateway | `salad-cloud` |
| Novita AI | `novita-ai` |
| Perplexity Agent | `perplexity-agent` |
| Privatemode AI | `privatemode-ai` |
| Melious | `melious` |
| Wafer | `wafer.ai` |
| Arcee | `arcee` |
| Berget.AI | `berget` |
| D.Run (China) | `drun` |
| Aixy | `aixy` |
| Thinking Machines | `thinkingmachines` |
| IO.NET | `io-net` |
| CoralBricks | `coralbricks` |
| DInference | `dinference` |
| Qiniu | `qiniu-ai` |
| LowRouter | `lowrouter` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Hetzner | `hetzner` |
| Snowflake Cortex | `snowflake-cortex` |
| Inco | `inco` |
| Impossibl | `impossibl` |
| Alibaba (China) | `alibaba-cn` |
| Kilo Gateway | `kilo` |
| EmpirioLabs AI | `empiriolabs` |
| Jalapeno Cloud | `jalapeno` |
| Scaleway | `scaleway` |
| Reflection | `reflection` |
| HPC-AI | `hpc-ai` |
| Upstage | `upstage` |
| Z.AI | `zai` |
| watsonx.ai | `watsonx` |
| Databricks | `databricks` |
| Moonshot AI | `moonshotai` |
| Hugging Face | `huggingface` |
| Vancine | `vancine` |
| GitLab Duo | `gitlab` |
| OpenAI | `openai` |
| STACKIT | `stackit` |
| Modal | `modal` |
| Clarifai | `clarifai` |
| IteraCompute | `iteracompute` |
| ainetcafe | `ainetcafe` |
| Azure | `azure` |
| OCI Generative AI | `oci` |
| GMI Cloud | `gmicloud` |
| Xiaomi | `xiaomi` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Bailing | `bailing` |
| Inference | `inference` |
| 302.AI | `302ai` |
| Deep Infra | `deepinfra` |
| Vivgrid | `vivgrid` |
| Tencent TokenHub | `tencent-tokenhub` |
| Bee by HEOSSI | `bee` |
| Agnes AI | `agnes` |
| Tinfoil | `tinfoil` |
| TensorX | `tensorx` |
| Kenari | `kenari` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| DigitalOcean | `digitalocean` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| TokenRouter | `tokenrouter` |
| DeepSeek | `deepseek` |
| DaoXE | `daoxe` |
| submodel | `submodel` |
| Zeldoc | `zeldoc` |
| ZenMux | `zenmux` |
| ClinePass | `cline-pass` |
| Subconscious | `subconscious` |
| RunInfra | `runinfra` |
| QiHang | `qihang-ai` |
| Umans AI | `umans-ai` |
| Zhipu AI | `zhipuai` |
| Pioneer | `pioneer` |
| MiniMax (minimax.cn) | `minimax-cn` |
<!-- PROVIDERS:END -->

## License

MIT
