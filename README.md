# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**223 providers · 8547 models · Updated 2026-10-27**
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
| Nebius Token Factory | `nebius` |
| Munito AI (EU) | `munito-eu` |
| DevPass (LLM Gateway) | `llmgateway` |
| Alibaba | `alibaba` |
| ZenMux | `zenmux` |
| Munito AI | `munito` |
| Poe | `poe` |
| SiliconFlow | `siliconflow` |
| Echo | `echo` |
| Infer by Flow7 | `infer` |
| NaN | `nan` |
| Kenari | `kenari` |
| IteraCompute | `iteracompute` |
| QiHang | `qihang-ai` |
| AMD | `amd` |
| Regolo AI | `regolo-ai` |
| above.dev | `above` |
| Atomic Chat | `atomic-chat` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| watsonx.ai | `watsonx` |
| Eden AI | `edenai` |
| Friendli | `friendli` |
| klokintegration.se | `klokintegration` |
| Z.AI | `zai` |
| Fireworks AI | `fireworks-ai` |
| Nvidia | `nvidia` |
| Xiaomi | `xiaomi` |
| Inco | `inco` |
| SenseNova (China) | `sensenova` |
| Modelis | `modelis` |
| Inference | `inference` |
| Tinfoil | `tinfoil` |
| STACKIT | `stackit` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Amazon Bedrock | `amazon-bedrock` |
| Ofox | `ofox` |
| Privatemode AI | `privatemode-ai` |
| Anthropic | `anthropic` |
| Charm Hyper | `hyper` |
| LLMTR | `llmtr` |
| OrcaRouter | `orcarouter` |
| HPC-AI | `hpc-ai` |
| LongCat | `longcat` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| SAP AI Core | `sap-ai-core` |
| Berget.AI | `berget` |
| SiliconFlow (China) | `siliconflow-cn` |
| LucidQuery | `lucidquery` |
| Sarvam AI | `sarvam` |
| Sakana AI | `sakana` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Pioneer | `pioneer` |
| Crusoe | `crusoe` |
| Jiekou.AI | `jiekou` |
| Groq | `groq` |
| DeepSeek | `deepseek` |
| LLM Tech | `llmtech` |
| OpenCode | `opencode` |
| OVHcloud AI Endpoints | `ovhcloud` |
| AI-ROUTER | `ai-router` |
| Together AI | `togetherai` |
| Modal | `modal` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Scaleway | `scaleway` |
| Vivgrid | `vivgrid` |
| Standard Compute | `standardcompute` |
| Poolside | `poolside` |
| Hugging Face | `huggingface` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Requesty | `requesty` |
| Subconscious | `subconscious` |
| Baseten | `baseten` |
| OpenCode Go | `opencode-go` |
| Vispark | `vispark` |
| NeoSmith | `neosmith` |
| FreeModel | `freemodel` |
| QVAC | `qvac` |
| Moark | `moark` |
| Databricks | `databricks` |
| Vertex | `google-vertex` |
| IO.NET | `io-net` |
| Perplexity Agent | `perplexity-agent` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Cortecs | `cortecs` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| OpenRouter | `openrouter` |
| Qiniu | `qiniu-ai` |
| Reflection | `reflection` |
| LLM Gateway | `llmgateway-providers` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| DInference | `dinference` |
| CommandCode | `commandcode` |
| Pendra | `pendra` |
| StepFun (Global) | `stepfun-ai` |
| Impossibl | `impossibl` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Bothub | `bothub` |
| ai& | `aiand` |
| Umans AI | `umans-ai` |
| Tencent TokenHub | `tencent-tokenhub` |
| abliteration.ai | `abliteration-ai` |
| Cerebras | `cerebras` |
| AI21 Labs | `ai21` |
| Inception | `inception` |
| Clarifai | `clarifai` |
| Synthetic | `synthetic` |
| Xpersona | `xpersona` |
| Vultr | `vultr` |
| Azure | `azure` |
| Neon | `neon` |
| LMStudio | `lmstudio` |
| Alibaba (China) | `alibaba-cn` |
| Lynkr | `lynkr` |
| Kilo Gateway | `kilo` |
| StepFun (China) | `stepfun` |
| DaoXE | `daoxe` |
| Ollama Cloud | `ollama-cloud` |
| Mistral | `mistral` |
| Chutes | `chutes` |
| Thinking Machines | `thinkingmachines` |
| Meganova | `meganova` |
| EBCloud | `ebcloud` |
| Neuralwatt | `neuralwatt` |
| Wallaby | `wallaby` |
| Novita AI | `novita-ai` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Moonshot AI | `moonshotai` |
| AKI.IO | `aki-io` |
| 302.AI | `302ai` |
| SCNet Token Plan | `scnet-token-plan` |
| LowRouter | `lowrouter` |
| GMI Cloud | `gmicloud` |
| TokenRouter | `tokenrouter` |
| Deep Infra | `deepinfra` |
| Vancine | `vancine` |
| Prime Inference | `prime` |
| EmpirioLabs AI | `empiriolabs` |
| SambaNova | `sambanova` |
| D.Run (China) | `drun` |
| UnoRouter | `unorouter` |
| Mixlayer | `mixlayer` |
| ainetcafe | `ainetcafe` |
| Agnes AI | `agnes` |
| Pareto Inference | `pareto` |
| AI/ML API | `aimlapi` |
| Vercel AI Gateway | `vercel` |
| Ambient | `ambient` |
| Kosmik Compute | `kosmik` |
| FastRouter | `fastrouter` |
| Nova | `nova` |
| Upstage | `upstage` |
| Venice AI | `venice` |
| Abacus | `abacus` |
| Lilac | `lilac` |
| GitHub Copilot | `github-copilot` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Tempr Gateway | `tempr` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Merge Gateway | `merge-gateway` |
| Boundless | `boundless` |
| TensorX | `tensorx` |
| Inceptron | `inceptron` |
| Zhipu AI | `zhipuai` |
| Morph | `morph` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| NEAR AI Cloud | `nearai` |
| MiniMax (minimax.io) | `minimax` |
| Wafer | `wafer.ai` |
| Google | `google` |
| InferX | `inferx` |
| Hetzner | `hetzner` |
| NanoGPT | `nano-gpt` |
| Cohere | `cohere` |
| SCX.ai | `scx-ai` |
| RunInfra | `runinfra` |
| Bee by HEOSSI | `bee` |
| Bailing | `bailing` |
| Auriko | `auriko` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| CrossModel | `crossmodel` |
| Zenifra | `zenifra` |
| Melious | `melious` |
| GitLab Duo | `gitlab` |
| OpenAI | `openai` |
| routing.run | `routing-run` |
| ModelScope | `modelscope` |
| DigitalOcean | `digitalocean` |
| Infomaniak | `infomaniak` |
| OpenReason | `openreason` |
| FrogBot | `frogbot` |
| Perplexity | `perplexity` |
| Helicone | `helicone` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| CoreWeave | `wandb` |
| AIHubMix | `aihubmix` |
| submodel | `submodel` |
| Zeldoc | `zeldoc` |
| Arcee | `arcee` |
| Volcengine Ark | `volcengine` |
| Snowflake Cortex | `snowflake-cortex` |
| GreenPT | `greenpt` |
| SaladCloud AI Gateway | `salad-cloud` |
| engy | `engy` |
| OCI Generative AI | `oci` |
| xAI | `xai` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Jalapeno Cloud | `jalapeno` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Opper | `opper` |
| TokenGo | `tokengo` |
| CoralBricks | `coralbricks` |
| Aixy | `aixy` |
| Claudinio | `claudinio` |
| Tencent Token Plan | `tencent-token-plan` |
| Meta | `meta` |
| Moonshot AI (China) | `moonshotai-cn` |
| evroc | `evroc` |
| ClinePass | `cline-pass` |
<!-- PROVIDERS:END -->

## License

MIT
