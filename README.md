# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**227 providers · 8753 models · Updated 2026-11-14**
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
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| LowRouter | `lowrouter` |
| Kosmik Compute | `kosmik` |
| Volcengine Ark | `volcengine` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Boundless | `boundless` |
| Alibaba | `alibaba` |
| InferX | `inferx` |
| Subconscious | `subconscious` |
| submodel | `submodel` |
| RunInfra | `runinfra` |
| Lynkr | `lynkr` |
| Impossibl | `impossibl` |
| abliteration.ai | `abliteration-ai` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Vispark | `vispark` |
| Helicone | `helicone` |
| Modal | `modal` |
| Novita AI | `novita-ai` |
| Bailing | `bailing` |
| Qiniu | `qiniu-ai` |
| Bothub | `bothub` |
| Wally | `wally` |
| Tempr Gateway | `tempr` |
| Inco | `inco` |
| Thinking Machines | `thinkingmachines` |
| OCI Generative AI | `oci` |
| OpenCode | `opencode` |
| Z.AI | `zai` |
| Reflection | `reflection` |
| LLM Tech | `llmtech` |
| Vultr | `vultr` |
| DaoXE | `daoxe` |
| Jiekou.AI | `jiekou` |
| IO.NET | `io-net` |
| Pareto Inference | `pareto` |
| NeoSmith | `neosmith` |
| Charm Hyper | `hyper` |
| QVAC | `qvac` |
| Infer by Flow7 | `infer` |
| Munito AI | `munito` |
| Clarifai | `clarifai` |
| Deep Infra | `deepinfra` |
| GreenPT | `greenpt` |
| Regolo AI | `regolo-ai` |
| Agnes AI | `agnes` |
| STACKIT | `stackit` |
| SiliconFlow | `siliconflow` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Merge Gateway | `merge-gateway` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Kenari | `kenari` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Auriko | `auriko` |
| UnoRouter | `unorouter` |
| routing.run | `routing-run` |
| Moonshot AI | `moonshotai` |
| above.dev | `above` |
| Munito AI (EU) | `munito-eu` |
| CoreWeave | `wandb` |
| Morph | `morph` |
| Vercel AI Gateway | `vercel` |
| ai& | `aiand` |
| Hetzner | `hetzner` |
| SiliconFlow (China) | `siliconflow-cn` |
| FastRouter | `fastrouter` |
| Eden AI | `edenai` |
| Modelis | `modelis` |
| Privatemode AI | `privatemode-ai` |
| Cerebras | `cerebras` |
| Umans AI | `umans-ai` |
| Sarvam AI | `sarvam` |
| Zeldoc | `zeldoc` |
| Abacus | `abacus` |
| Xiaomi | `xiaomi` |
| watsonx.ai | `watsonx` |
| Arcee | `arcee` |
| Inference | `inference` |
| Neon | `neon` |
| MiniMax (minimax.io) | `minimax` |
| Melious | `melious` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Claudinio | `claudinio` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Databricks | `databricks` |
| CrossModel | `crossmodel` |
| TokenRouter | `tokenrouter` |
| Vancine | `vancine` |
| SCX.ai | `scx-ai` |
| Lilac | `lilac` |
| DeepSeek | `deepseek` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Tencent Token Plan | `tencent-token-plan` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| OpenAI | `openai` |
| TokenGo | `tokengo` |
| Poolside | `poolside` |
| SCNet Token Plan | `scnet-token-plan` |
| Zhipu AI | `zhipuai` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Pioneer | `pioneer` |
| GMI Cloud | `gmicloud` |
| Nova | `nova` |
| Modular | `modular` |
| NaN | `nan` |
| Groq | `groq` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| SambaNova | `sambanova` |
| StepFun (China) | `stepfun` |
| Xpersona | `xpersona` |
| Zenifra | `zenifra` |
| CommandCode | `commandcode` |
| Atomic Chat | `atomic-chat` |
| Kilo Gateway | `kilo` |
| Upstage | `upstage` |
| Standard Compute | `standardcompute` |
| Neuralwatt | `neuralwatt` |
| Venice AI | `venice` |
| Baseten | `baseten` |
| AI-ROUTER | `ai-router` |
| DevPass (LLM Gateway) | `llmgateway` |
| Jalapeno Cloud | `jalapeno` |
| OpenCode Go | `opencode-go` |
| Meganova | `meganova` |
| Berget.AI | `berget` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Friendli | `friendli` |
| OpenRouter | `openrouter` |
| Moark | `moark` |
| AI21 Labs | `ai21` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| HPC-AI | `hpc-ai` |
| LLM Gateway | `llmgateway-providers` |
| Inceptron | `inceptron` |
| Inception | `inception` |
| Perplexity | `perplexity` |
| EBCloud | `ebcloud` |
| GitLab Duo | `gitlab` |
| 302.AI | `302ai` |
| Vivgrid | `vivgrid` |
| Meta | `meta` |
| Vertex | `google-vertex` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Cortecs | `cortecs` |
| Bee by HEOSSI | `bee` |
| Mixlayer | `mixlayer` |
| ModelScope | `modelscope` |
| Together AI | `togetherai` |
| LucidQuery | `lucidquery` |
| TensorX | `tensorx` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Anthropic | `anthropic` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Pendra | `pendra` |
| CoralBricks | `coralbricks` |
| Poe | `poe` |
| engy | `engy` |
| LongCat | `longcat` |
| D.Run (China) | `drun` |
| LLMTR | `llmtr` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Ollama Cloud | `ollama-cloud` |
| AKI.IO | `aki-io` |
| klokintegration.se | `klokintegration` |
| Aixy | `aixy` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| FreeModel | `freemodel` |
| GitHub Copilot | `github-copilot` |
| Azure | `azure` |
| Wafer | `wafer.ai` |
| OrcaRouter | `orcarouter` |
| Scaleway | `scaleway` |
| Requesty | `requesty` |
| NEAR AI Cloud | `nearai` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Crusoe | `crusoe` |
| IteraCompute | `iteracompute` |
| Snowflake Cortex | `snowflake-cortex` |
| Infomaniak | `infomaniak` |
| Cohere | `cohere` |
| Tencent TokenHub | `tencent-tokenhub` |
| Google | `google` |
| Hugging Face | `huggingface` |
| DInference | `dinference` |
| Synthetic | `synthetic` |
| OpenReason | `openreason` |
| evroc | `evroc` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| NanoGPT | `nano-gpt` |
| xAI | `xai` |
| EmpirioLabs AI | `empiriolabs` |
| SaladCloud AI Gateway | `salad-cloud` |
| Echo | `echo` |
| ZenMux | `zenmux` |
| Moonshot AI (China) | `moonshotai-cn` |
| Chutes | `chutes` |
| QiHang | `qihang-ai` |
| AI/ML API | `aimlapi` |
| Opper | `opper` |
| AMD | `amd` |
| Wallaby | `wallaby` |
| Perplexity Agent | `perplexity-agent` |
| Fireworks AI | `fireworks-ai` |
| Nebius Token Factory | `nebius` |
| Nvidia | `nvidia` |
| DigitalOcean | `digitalocean` |
| SenseNova (China) | `sensenova` |
| Sakana AI | `sakana` |
| Hopper | `hopper` |
| Mistral | `mistral` |
| BytePlus ModelArk | `byteplus` |
| Ofox | `ofox` |
| ainetcafe | `ainetcafe` |
| Amazon Bedrock | `amazon-bedrock` |
| OVHcloud AI Endpoints | `ovhcloud` |
| ClinePass | `cline-pass` |
| LMStudio | `lmstudio` |
| Prime Inference | `prime` |
| Tinfoil | `tinfoil` |
| FrogBot | `frogbot` |
| Ambient | `ambient` |
| StepFun (Global) | `stepfun-ai` |
| AIHubMix | `aihubmix` |
| SAP AI Core | `sap-ai-core` |
| Alibaba (China) | `alibaba-cn` |
<!-- PROVIDERS:END -->

## License

MIT
