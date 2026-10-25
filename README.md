# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**223 providers · 8534 models · Updated 2026-10-25**
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
| QVAC | `qvac` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Bothub | `bothub` |
| Moonshot AI | `moonshotai` |
| LowRouter | `lowrouter` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| StepFun (Global) | `stepfun-ai` |
| Umans AI | `umans-ai` |
| STACKIT | `stackit` |
| GitHub Copilot | `github-copilot` |
| Helicone | `helicone` |
| Poe | `poe` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Abacus | `abacus` |
| LLM Gateway | `llmgateway-providers` |
| Nova | `nova` |
| Perplexity Agent | `perplexity-agent` |
| Reflection | `reflection` |
| klokintegration.se | `klokintegration` |
| Upstage | `upstage` |
| Crusoe | `crusoe` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Google | `google` |
| Infer by Flow7 | `infer` |
| LMStudio | `lmstudio` |
| Vercel AI Gateway | `vercel` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Tencent Token Plan | `tencent-token-plan` |
| Thinking Machines | `thinkingmachines` |
| Z.AI Coding Plan | `zai-coding-plan` |
| SiliconFlow (China) | `siliconflow-cn` |
| Alibaba (China) | `alibaba-cn` |
| Jiekou.AI | `jiekou` |
| NEAR AI Cloud | `nearai` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Neon | `neon` |
| LLMTR | `llmtr` |
| Hetzner | `hetzner` |
| Cortecs | `cortecs` |
| Wafer | `wafer.ai` |
| Meta | `meta` |
| Volcengine Ark | `volcengine` |
| Sarvam AI | `sarvam` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| abliteration.ai | `abliteration-ai` |
| ainetcafe | `ainetcafe` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| D.Run (China) | `drun` |
| Zenifra | `zenifra` |
| Munito AI (EU) | `munito-eu` |
| 302.AI | `302ai` |
| Inceptron | `inceptron` |
| Together AI | `togetherai` |
| Lynkr | `lynkr` |
| Inference | `inference` |
| Moark | `moark` |
| FreeModel | `freemodel` |
| Agnes AI | `agnes` |
| Ollama Cloud | `ollama-cloud` |
| ModelScope | `modelscope` |
| Ambient | `ambient` |
| TokenRouter | `tokenrouter` |
| SaladCloud AI Gateway | `salad-cloud` |
| xAI | `xai` |
| SCX.ai | `scx-ai` |
| Azure | `azure` |
| Mixlayer | `mixlayer` |
| Opper | `opper` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Vultr | `vultr` |
| Vispark | `vispark` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Boundless | `boundless` |
| OpenCode | `opencode` |
| Perplexity | `perplexity` |
| Morph | `morph` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| OCI Generative AI | `oci` |
| Synthetic | `synthetic` |
| EBCloud | `ebcloud` |
| engy | `engy` |
| SCNet Token Plan | `scnet-token-plan` |
| CommandCode | `commandcode` |
| Zeldoc | `zeldoc` |
| Databricks | `databricks` |
| GreenPT | `greenpt` |
| Tempr Gateway | `tempr` |
| Kilo Gateway | `kilo` |
| OpenRouter | `openrouter` |
| SAP AI Core | `sap-ai-core` |
| Requesty | `requesty` |
| Xpersona | `xpersona` |
| routing.run | `routing-run` |
| submodel | `submodel` |
| Pendra | `pendra` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| DInference | `dinference` |
| SambaNova | `sambanova` |
| Qiniu | `qiniu-ai` |
| AI-ROUTER | `ai-router` |
| OpenAI | `openai` |
| Arcee | `arcee` |
| AI/ML API | `aimlapi` |
| Hugging Face | `huggingface` |
| Merge Gateway | `merge-gateway` |
| Poolside | `poolside` |
| Aixy | `aixy` |
| DevPass (LLM Gateway) | `llmgateway` |
| Infomaniak | `infomaniak` |
| Berget.AI | `berget` |
| Kenari | `kenari` |
| Prime Inference | `prime` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| FrogBot | `frogbot` |
| Vancine | `vancine` |
| Sakana AI | `sakana` |
| RunInfra | `runinfra` |
| IteraCompute | `iteracompute` |
| Cerebras | `cerebras` |
| Bee by HEOSSI | `bee` |
| Nvidia | `nvidia` |
| Meganova | `meganova` |
| Jalapeno Cloud | `jalapeno` |
| TokenGo | `tokengo` |
| InferX | `inferx` |
| Munito AI | `munito` |
| NanoGPT | `nano-gpt` |
| ClinePass | `cline-pass` |
| Auriko | `auriko` |
| Baseten | `baseten` |
| Charm Hyper | `hyper` |
| Clarifai | `clarifai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Groq | `groq` |
| Scaleway | `scaleway` |
| Regolo AI | `regolo-ai` |
| SiliconFlow | `siliconflow` |
| Fireworks AI | `fireworks-ai` |
| GMI Cloud | `gmicloud` |
| LongCat | `longcat` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Atomic Chat | `atomic-chat` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Tencent TokenHub | `tencent-tokenhub` |
| AMD | `amd` |
| Alibaba | `alibaba` |
| LLM Tech | `llmtech` |
| Amazon Bedrock | `amazon-bedrock` |
| Chutes | `chutes` |
| StepFun (China) | `stepfun` |
| Tinfoil | `tinfoil` |
| Impossibl | `impossibl` |
| evroc | `evroc` |
| Z.AI | `zai` |
| Inco | `inco` |
| Mistral | `mistral` |
| Privatemode AI | `privatemode-ai` |
| ai& | `aiand` |
| AIHubMix | `aihubmix` |
| Nebius Token Factory | `nebius` |
| Wallaby | `wallaby` |
| Venice AI | `venice` |
| Subconscious | `subconscious` |
| Vivgrid | `vivgrid` |
| watsonx.ai | `watsonx` |
| Pareto Inference | `pareto` |
| Modelis | `modelis` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| AKI.IO | `aki-io` |
| UnoRouter | `unorouter` |
| MiniMax (minimax.io) | `minimax` |
| DaoXE | `daoxe` |
| Ofox | `ofox` |
| Deep Infra | `deepinfra` |
| FastRouter | `fastrouter` |
| Eden AI | `edenai` |
| ZenMux | `zenmux` |
| GitLab Duo | `gitlab` |
| Bailing | `bailing` |
| HPC-AI | `hpc-ai` |
| LucidQuery | `lucidquery` |
| TensorX | `tensorx` |
| EmpirioLabs AI | `empiriolabs` |
| Kosmik Compute | `kosmik` |
| OpenCode Go | `opencode-go` |
| above.dev | `above` |
| DeepSeek | `deepseek` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Claudinio | `claudinio` |
| Vertex | `google-vertex` |
| CoreWeave | `wandb` |
| QiHang | `qihang-ai` |
| Anthropic | `anthropic` |
| Xiaomi | `xiaomi` |
| SenseNova (China) | `sensenova` |
| Snowflake Cortex | `snowflake-cortex` |
| Melious | `melious` |
| Moonshot AI (China) | `moonshotai-cn` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Lilac | `lilac` |
| Pioneer | `pioneer` |
| Inception | `inception` |
| OpenReason | `openreason` |
| Neuralwatt | `neuralwatt` |
| IO.NET | `io-net` |
| NaN | `nan` |
| Modal | `modal` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Standard Compute | `standardcompute` |
| Friendli | `friendli` |
| Echo | `echo` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| OrcaRouter | `orcarouter` |
| CoralBricks | `coralbricks` |
| CrossModel | `crossmodel` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Cohere | `cohere` |
| NeoSmith | `neosmith` |
| Zhipu AI | `zhipuai` |
| Novita AI | `novita-ai` |
| AI21 Labs | `ai21` |
| DigitalOcean | `digitalocean` |
<!-- PROVIDERS:END -->

## License

MIT
