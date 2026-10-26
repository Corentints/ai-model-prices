# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**223 providers · 8545 models · Updated 2026-10-26**
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
| LucidQuery | `lucidquery` |
| Standard Compute | `standardcompute` |
| Auriko | `auriko` |
| CoreWeave | `wandb` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Modal | `modal` |
| DaoXE | `daoxe` |
| Neuralwatt | `neuralwatt` |
| Vercel AI Gateway | `vercel` |
| AI-ROUTER | `ai-router` |
| SaladCloud AI Gateway | `salad-cloud` |
| Upstage | `upstage` |
| Inceptron | `inceptron` |
| Moark | `moark` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Volcengine Ark | `volcengine` |
| Perplexity | `perplexity` |
| SambaNova | `sambanova` |
| LMStudio | `lmstudio` |
| Pendra | `pendra` |
| Charm Hyper | `hyper` |
| Tinfoil | `tinfoil` |
| LowRouter | `lowrouter` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Privatemode AI | `privatemode-ai` |
| OpenCode Go | `opencode-go` |
| Scaleway | `scaleway` |
| DInference | `dinference` |
| Google | `google` |
| SCNet Token Plan | `scnet-token-plan` |
| RunInfra | `runinfra` |
| routing.run | `routing-run` |
| CrossModel | `crossmodel` |
| FreeModel | `freemodel` |
| Atomic Chat | `atomic-chat` |
| Kenari | `kenari` |
| OrcaRouter | `orcarouter` |
| Vispark | `vispark` |
| Opper | `opper` |
| Berget.AI | `berget` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| OCI Generative AI | `oci` |
| Bee by HEOSSI | `bee` |
| SiliconFlow | `siliconflow` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Pareto Inference | `pareto` |
| Zenifra | `zenifra` |
| TokenRouter | `tokenrouter` |
| OpenCode | `opencode` |
| Subconscious | `subconscious` |
| Morph | `morph` |
| GreenPT | `greenpt` |
| D.Run (China) | `drun` |
| Friendli | `friendli` |
| xAI | `xai` |
| Chutes | `chutes` |
| CommandCode | `commandcode` |
| Munito AI (EU) | `munito-eu` |
| Abacus | `abacus` |
| Cortecs | `cortecs` |
| ai& | `aiand` |
| Regolo AI | `regolo-ai` |
| Mixlayer | `mixlayer` |
| NaN | `nan` |
| Poolside | `poolside` |
| Wallaby | `wallaby` |
| Helicone | `helicone` |
| TensorX | `tensorx` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| MiniMax (minimax.io) | `minimax` |
| Pioneer | `pioneer` |
| ModelScope | `modelscope` |
| Sakana AI | `sakana` |
| Xiaomi | `xiaomi` |
| Novita AI | `novita-ai` |
| StepFun (China) | `stepfun` |
| LongCat | `longcat` |
| Baseten | `baseten` |
| DeepSeek | `deepseek` |
| Claudinio | `claudinio` |
| Nova | `nova` |
| Inception | `inception` |
| OpenRouter | `openrouter` |
| Synthetic | `synthetic` |
| Vultr | `vultr` |
| Ollama Cloud | `ollama-cloud` |
| Moonshot AI (China) | `moonshotai-cn` |
| TokenGo | `tokengo` |
| OpenAI | `openai` |
| Bailing | `bailing` |
| LLMTR | `llmtr` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Munito AI | `munito` |
| FastRouter | `fastrouter` |
| Fireworks AI | `fireworks-ai` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| UnoRouter | `unorouter` |
| Inco | `inco` |
| Together AI | `togetherai` |
| Hugging Face | `huggingface` |
| Mistral | `mistral` |
| ainetcafe | `ainetcafe` |
| Meganova | `meganova` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Snowflake Cortex | `snowflake-cortex` |
| Wafer | `wafer.ai` |
| Clarifai | `clarifai` |
| EBCloud | `ebcloud` |
| LLM Gateway | `llmgateway-providers` |
| Crusoe | `crusoe` |
| AMD | `amd` |
| AI21 Labs | `ai21` |
| SenseNova (China) | `sensenova` |
| Nvidia | `nvidia` |
| evroc | `evroc` |
| NEAR AI Cloud | `nearai` |
| Nebius Token Factory | `nebius` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Poe | `poe` |
| IO.NET | `io-net` |
| Groq | `groq` |
| Impossibl | `impossibl` |
| Vivgrid | `vivgrid` |
| CoralBricks | `coralbricks` |
| HPC-AI | `hpc-ai` |
| StepFun (Global) | `stepfun-ai` |
| Ambient | `ambient` |
| Anthropic | `anthropic` |
| FrogBot | `frogbot` |
| Cohere | `cohere` |
| Infomaniak | `infomaniak` |
| Sarvam AI | `sarvam` |
| Jiekou.AI | `jiekou` |
| Requesty | `requesty` |
| Z.AI | `zai` |
| Eden AI | `edenai` |
| Inference | `inference` |
| submodel | `submodel` |
| engy | `engy` |
| Jalapeno Cloud | `jalapeno` |
| Meta | `meta` |
| Azure | `azure` |
| AI/ML API | `aimlapi` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Merge Gateway | `merge-gateway` |
| Moonshot AI | `moonshotai` |
| Reflection | `reflection` |
| Arcee | `arcee` |
| Databricks | `databricks` |
| Umans AI | `umans-ai` |
| Ofox | `ofox` |
| watsonx.ai | `watsonx` |
| Tempr Gateway | `tempr` |
| Boundless | `boundless` |
| abliteration.ai | `abliteration-ai` |
| Prime Inference | `prime` |
| Kosmik Compute | `kosmik` |
| Hetzner | `hetzner` |
| DevPass (LLM Gateway) | `llmgateway` |
| Xpersona | `xpersona` |
| Echo | `echo` |
| Deep Infra | `deepinfra` |
| GitHub Copilot | `github-copilot` |
| AKI.IO | `aki-io` |
| SAP AI Core | `sap-ai-core` |
| Lynkr | `lynkr` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| above.dev | `above` |
| OVHcloud AI Endpoints | `ovhcloud` |
| LLM Tech | `llmtech` |
| STACKIT | `stackit` |
| Modelis | `modelis` |
| Infer by Flow7 | `infer` |
| Tencent Token Plan | `tencent-token-plan` |
| Melious | `melious` |
| Vancine | `vancine` |
| QiHang | `qihang-ai` |
| NeoSmith | `neosmith` |
| klokintegration.se | `klokintegration` |
| DigitalOcean | `digitalocean` |
| InferX | `inferx` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Venice AI | `venice` |
| Agnes AI | `agnes` |
| Alibaba (China) | `alibaba-cn` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Thinking Machines | `thinkingmachines` |
| Lilac | `lilac` |
| Amazon Bedrock | `amazon-bedrock` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| SiliconFlow (China) | `siliconflow-cn` |
| Alibaba | `alibaba` |
| QVAC | `qvac` |
| ZenMux | `zenmux` |
| 302.AI | `302ai` |
| Perplexity Agent | `perplexity-agent` |
| Vertex | `google-vertex` |
| Bothub | `bothub` |
| Neon | `neon` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Zhipu AI | `zhipuai` |
| ClinePass | `cline-pass` |
| Qiniu | `qiniu-ai` |
| Cerebras | `cerebras` |
| GMI Cloud | `gmicloud` |
| EmpirioLabs AI | `empiriolabs` |
| Zeldoc | `zeldoc` |
| AIHubMix | `aihubmix` |
| GitLab Duo | `gitlab` |
| NanoGPT | `nano-gpt` |
| SCX.ai | `scx-ai` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Kilo Gateway | `kilo` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| OpenReason | `openreason` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| IteraCompute | `iteracompute` |
| Tencent TokenHub | `tencent-tokenhub` |
| Aixy | `aixy` |
<!-- PROVIDERS:END -->

## License

MIT
