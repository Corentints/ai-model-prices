# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**227 providers · 8754 models · Updated 2026-11-13**
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
| Tencent Token Plan | `tencent-token-plan` |
| Meganova | `meganova` |
| FrogBot | `frogbot` |
| ainetcafe | `ainetcafe` |
| Bailing | `bailing` |
| Echo | `echo` |
| AI/ML API | `aimlapi` |
| UnoRouter | `unorouter` |
| Infer by Flow7 | `infer` |
| Kilo Gateway | `kilo` |
| Moonshot AI | `moonshotai` |
| Friendli | `friendli` |
| Melious | `melious` |
| xAI | `xai` |
| routing.run | `routing-run` |
| IteraCompute | `iteracompute` |
| Infomaniak | `infomaniak` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Z.AI Coding Plan | `zai-coding-plan` |
| DInference | `dinference` |
| NanoGPT | `nano-gpt` |
| ZenMux | `zenmux` |
| Lilac | `lilac` |
| Together AI | `togetherai` |
| Merge Gateway | `merge-gateway` |
| LLM Gateway | `llmgateway-providers` |
| Kenari | `kenari` |
| Reflection | `reflection` |
| Anthropic | `anthropic` |
| Meta | `meta` |
| Amazon Bedrock | `amazon-bedrock` |
| Auriko | `auriko` |
| OpenCode Go | `opencode-go` |
| Wally | `wally` |
| Vivgrid | `vivgrid` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| OpenCode | `opencode` |
| Snowflake Cortex | `snowflake-cortex` |
| SenseNova (China) | `sensenova` |
| AIHubMix | `aihubmix` |
| Morph | `morph` |
| Claudinio | `claudinio` |
| QiHang | `qihang-ai` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Thinking Machines | `thinkingmachines` |
| Perplexity Agent | `perplexity-agent` |
| AMD | `amd` |
| Opper | `opper` |
| Sakana AI | `sakana` |
| NEAR AI Cloud | `nearai` |
| Moark | `moark` |
| Impossibl | `impossibl` |
| Umans AI | `umans-ai` |
| HPC-AI | `hpc-ai` |
| Ambient | `ambient` |
| CoralBricks | `coralbricks` |
| Alibaba (China) | `alibaba-cn` |
| LucidQuery | `lucidquery` |
| Prime Inference | `prime` |
| Zeldoc | `zeldoc` |
| Subconscious | `subconscious` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| EBCloud | `ebcloud` |
| Mistral | `mistral` |
| evroc | `evroc` |
| GreenPT | `greenpt` |
| NeoSmith | `neosmith` |
| Scaleway | `scaleway` |
| Pendra | `pendra` |
| SAP AI Core | `sap-ai-core` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| BytePlus ModelArk | `byteplus` |
| SCNet Token Plan | `scnet-token-plan` |
| DeepSeek | `deepseek` |
| Google | `google` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Pareto Inference | `pareto` |
| TokenGo | `tokengo` |
| Nebius Token Factory | `nebius` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| GitHub Copilot | `github-copilot` |
| Tinfoil | `tinfoil` |
| Wallaby | `wallaby` |
| Kosmik Compute | `kosmik` |
| Crusoe | `crusoe` |
| Bee by HEOSSI | `bee` |
| engy | `engy` |
| OpenReason | `openreason` |
| Lynkr | `lynkr` |
| AI21 Labs | `ai21` |
| Nvidia | `nvidia` |
| LLM Tech | `llmtech` |
| Neon | `neon` |
| Nova | `nova` |
| Cortecs | `cortecs` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| klokintegration.se | `klokintegration` |
| Atomic Chat | `atomic-chat` |
| Zhipu AI | `zhipuai` |
| Mixlayer | `mixlayer` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Neuralwatt | `neuralwatt` |
| Inceptron | `inceptron` |
| watsonx.ai | `watsonx` |
| Boundless | `boundless` |
| FastRouter | `fastrouter` |
| submodel | `submodel` |
| Aixy | `aixy` |
| CommandCode | `commandcode` |
| InferX | `inferx` |
| Abacus | `abacus` |
| Agnes AI | `agnes` |
| Modelis | `modelis` |
| Upstage | `upstage` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Vultr | `vultr` |
| OrcaRouter | `orcarouter` |
| 302.AI | `302ai` |
| SiliconFlow | `siliconflow` |
| Azure | `azure` |
| above.dev | `above` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Inception | `inception` |
| NaN | `nan` |
| Standard Compute | `standardcompute` |
| Perplexity | `perplexity` |
| CoreWeave | `wandb` |
| LMStudio | `lmstudio` |
| TokenRouter | `tokenrouter` |
| Xiaomi | `xiaomi` |
| STACKIT | `stackit` |
| Ollama Cloud | `ollama-cloud` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| RunInfra | `runinfra` |
| Bothub | `bothub` |
| Jiekou.AI | `jiekou` |
| QVAC | `qvac` |
| AI-ROUTER | `ai-router` |
| ClinePass | `cline-pass` |
| ai& | `aiand` |
| Tempr Gateway | `tempr` |
| Vercel AI Gateway | `vercel` |
| Vancine | `vancine` |
| SCX.ai | `scx-ai` |
| StepFun (Global) | `stepfun-ai` |
| Vispark | `vispark` |
| TensorX | `tensorx` |
| EmpirioLabs AI | `empiriolabs` |
| Eden AI | `edenai` |
| ModelScope | `modelscope` |
| DaoXE | `daoxe` |
| Poolside | `poolside` |
| Inference | `inference` |
| Alibaba | `alibaba` |
| Synthetic | `synthetic` |
| Venice AI | `venice` |
| Inco | `inco` |
| LLMTR | `llmtr` |
| FreeModel | `freemodel` |
| GitLab Duo | `gitlab` |
| Qiniu | `qiniu-ai` |
| AKI.IO | `aki-io` |
| Berget.AI | `berget` |
| IO.NET | `io-net` |
| OCI Generative AI | `oci` |
| SambaNova | `sambanova` |
| StepFun (China) | `stepfun` |
| DigitalOcean | `digitalocean` |
| Z.AI | `zai` |
| CrossModel | `crossmodel` |
| OpenAI | `openai` |
| Volcengine Ark | `volcengine` |
| OpenRouter | `openrouter` |
| Sarvam AI | `sarvam` |
| MiniMax (minimax.io) | `minimax` |
| Hopper | `hopper` |
| Munito AI | `munito` |
| Pioneer | `pioneer` |
| Wafer | `wafer.ai` |
| abliteration.ai | `abliteration-ai` |
| SaladCloud AI Gateway | `salad-cloud` |
| Requesty | `requesty` |
| Baseten | `baseten` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Groq | `groq` |
| Helicone | `helicone` |
| Novita AI | `novita-ai` |
| Charm Hyper | `hyper` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Vertex | `google-vertex` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Databricks | `databricks` |
| Cerebras | `cerebras` |
| SiliconFlow (China) | `siliconflow-cn` |
| Munito AI (EU) | `munito-eu` |
| Tencent TokenHub | `tencent-tokenhub` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| DevPass (LLM Gateway) | `llmgateway` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Xpersona | `xpersona` |
| LongCat | `longcat` |
| Hugging Face | `huggingface` |
| Hetzner | `hetzner` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Cohere | `cohere` |
| Arcee | `arcee` |
| Clarifai | `clarifai` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Modal | `modal` |
| Privatemode AI | `privatemode-ai` |
| Moonshot AI (China) | `moonshotai-cn` |
| Regolo AI | `regolo-ai` |
| Chutes | `chutes` |
| LowRouter | `lowrouter` |
| D.Run (China) | `drun` |
| Jalapeno Cloud | `jalapeno` |
| Poe | `poe` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Modular | `modular` |
| Fireworks AI | `fireworks-ai` |
| Ofox | `ofox` |
| Deep Infra | `deepinfra` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Zenifra | `zenifra` |
| GMI Cloud | `gmicloud` |
<!-- PROVIDERS:END -->

## License

MIT
