# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**226 providers · 8534 models · Updated 2026-11-02**
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
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| engy | `engy` |
| Sarvam AI | `sarvam` |
| Z.AI | `zai` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Tinfoil | `tinfoil` |
| StepFun (Global) | `stepfun-ai` |
| RunInfra | `runinfra` |
| Wallaby | `wallaby` |
| IteraCompute | `iteracompute` |
| Moonshot AI (China) | `moonshotai-cn` |
| DevPass (LLM Gateway) | `llmgateway` |
| TokenGo | `tokengo` |
| MiniMax (minimax.cn) | `minimax-cn` |
| QVAC | `qvac` |
| NanoGPT | `nano-gpt` |
| Merge Gateway | `merge-gateway` |
| Ambient | `ambient` |
| HPC-AI | `hpc-ai` |
| InferX | `inferx` |
| Modelis | `modelis` |
| Opper | `opper` |
| LLM Tech | `llmtech` |
| Bothub | `bothub` |
| Ollama Cloud | `ollama-cloud` |
| Clarifai | `clarifai` |
| Aixy | `aixy` |
| Abacus | `abacus` |
| AI-ROUTER | `ai-router` |
| GreenPT | `greenpt` |
| SCNet Token Plan | `scnet-token-plan` |
| Cerebras | `cerebras` |
| LMStudio | `lmstudio` |
| Wally | `wally` |
| Databricks | `databricks` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| AKI.IO | `aki-io` |
| LongCat | `longcat` |
| Mixlayer | `mixlayer` |
| CoralBricks | `coralbricks` |
| EmpirioLabs AI | `empiriolabs` |
| TensorX | `tensorx` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Helicone | `helicone` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| GMI Cloud | `gmicloud` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| ZenMux | `zenmux` |
| Baseten | `baseten` |
| StepFun (China) | `stepfun` |
| Friendli | `friendli` |
| Pareto Inference | `pareto` |
| Alibaba (China) | `alibaba-cn` |
| NeoSmith | `neosmith` |
| EBCloud | `ebcloud` |
| Neuralwatt | `neuralwatt` |
| DaoXE | `daoxe` |
| Z.AI Coding Plan | `zai-coding-plan` |
| AIHubMix | `aihubmix` |
| D.Run (China) | `drun` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Kosmik Compute | `kosmik` |
| Deep Infra | `deepinfra` |
| LLM Gateway | `llmgateway-providers` |
| Vispark | `vispark` |
| Volcengine Ark | `volcengine` |
| TokenRouter | `tokenrouter` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Nvidia | `nvidia` |
| Tempr Gateway | `tempr` |
| Moonshot AI | `moonshotai` |
| Agnes AI | `agnes` |
| Infer by Flow7 | `infer` |
| OpenRouter | `openrouter` |
| Azure | `azure` |
| Bee by HEOSSI | `bee` |
| Poe | `poe` |
| Vivgrid | `vivgrid` |
| Impossibl | `impossibl` |
| Inco | `inco` |
| Crusoe | `crusoe` |
| Venice AI | `venice` |
| GitLab Duo | `gitlab` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Cortecs | `cortecs` |
| above.dev | `above` |
| Xiaomi | `xiaomi` |
| Lilac | `lilac` |
| Meta | `meta` |
| Mistral | `mistral` |
| Nova | `nova` |
| SenseNova (China) | `sensenova` |
| SiliconFlow (China) | `siliconflow-cn` |
| Infomaniak | `infomaniak` |
| Modal | `modal` |
| Snowflake Cortex | `snowflake-cortex` |
| Hopper | `hopper` |
| Vertex | `google-vertex` |
| OpenAI | `openai` |
| Claudinio | `claudinio` |
| OpenCode Go | `opencode-go` |
| klokintegration.se | `klokintegration` |
| Munito AI (EU) | `munito-eu` |
| Thinking Machines | `thinkingmachines` |
| Vultr | `vultr` |
| ModelScope | `modelscope` |
| Prime Inference | `prime` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| DigitalOcean | `digitalocean` |
| Inference | `inference` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Subconscious | `subconscious` |
| Tencent TokenHub | `tencent-tokenhub` |
| Standard Compute | `standardcompute` |
| AI/ML API | `aimlapi` |
| Lynkr | `lynkr` |
| SAP AI Core | `sap-ai-core` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| AI21 Labs | `ai21` |
| ClinePass | `cline-pass` |
| Munito AI | `munito` |
| Hugging Face | `huggingface` |
| FreeModel | `freemodel` |
| Synthetic | `synthetic` |
| SCX.ai | `scx-ai` |
| 302.AI | `302ai` |
| Novita AI | `novita-ai` |
| Meganova | `meganova` |
| Tencent Token Plan | `tencent-token-plan` |
| Groq | `groq` |
| Privatemode AI | `privatemode-ai` |
| CoreWeave | `wandb` |
| FrogBot | `frogbot` |
| abliteration.ai | `abliteration-ai` |
| Alibaba | `alibaba` |
| LowRouter | `lowrouter` |
| Moark | `moark` |
| Fireworks AI | `fireworks-ai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Anthropic | `anthropic` |
| LLMTR | `llmtr` |
| Zenifra | `zenifra` |
| xAI | `xai` |
| Amazon Bedrock | `amazon-bedrock` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Kenari | `kenari` |
| QiHang | `qihang-ai` |
| Cohere | `cohere` |
| DInference | `dinference` |
| Berget.AI | `berget` |
| Boundless | `boundless` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| DeepSeek | `deepseek` |
| Pendra | `pendra` |
| Kilo Gateway | `kilo` |
| Sakana AI | `sakana` |
| Vancine | `vancine` |
| Together AI | `togetherai` |
| Regolo AI | `regolo-ai` |
| OrcaRouter | `orcarouter` |
| LucidQuery | `lucidquery` |
| Echo | `echo` |
| Hetzner | `hetzner` |
| OCI Generative AI | `oci` |
| CommandCode | `commandcode` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Jalapeno Cloud | `jalapeno` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Neon | `neon` |
| Bailing | `bailing` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Inception | `inception` |
| Melious | `melious` |
| Nebius Token Factory | `nebius` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| routing.run | `routing-run` |
| Zeldoc | `zeldoc` |
| OpenCode | `opencode` |
| Requesty | `requesty` |
| SiliconFlow | `siliconflow` |
| submodel | `submodel` |
| UnoRouter | `unorouter` |
| NEAR AI Cloud | `nearai` |
| Reflection | `reflection` |
| Vercel AI Gateway | `vercel` |
| Morph | `morph` |
| Qiniu | `qiniu-ai` |
| Modular | `modular` |
| Google | `google` |
| watsonx.ai | `watsonx` |
| FastRouter | `fastrouter` |
| Perplexity Agent | `perplexity-agent` |
| OpenReason | `openreason` |
| Charm Hyper | `hyper` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Xpersona | `xpersona` |
| Wafer | `wafer.ai` |
| Azure Cognitive Services | `azure-cognitive-services` |
| CrossModel | `crossmodel` |
| Ofox | `ofox` |
| Auriko | `auriko` |
| Scaleway | `scaleway` |
| ai& | `aiand` |
| IO.NET | `io-net` |
| Chutes | `chutes` |
| ainetcafe | `ainetcafe` |
| Eden AI | `edenai` |
| SambaNova | `sambanova` |
| Upstage | `upstage` |
| Perplexity | `perplexity` |
| Inceptron | `inceptron` |
| AMD | `amd` |
| evroc | `evroc` |
| Arcee | `arcee` |
| Atomic Chat | `atomic-chat` |
| Pioneer | `pioneer` |
| GitHub Copilot | `github-copilot` |
| Jiekou.AI | `jiekou` |
| Umans AI | `umans-ai` |
| SaladCloud AI Gateway | `salad-cloud` |
| Zhipu AI | `zhipuai` |
| MiniMax (minimax.io) | `minimax` |
| NaN | `nan` |
| Poolside | `poolside` |
| STACKIT | `stackit` |
<!-- PROVIDERS:END -->

## License

MIT
