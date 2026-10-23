# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**221 providers · 8453 models · Updated 2026-10-23**
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
| OVHcloud AI Endpoints | `ovhcloud` |
| NEAR AI Cloud | `nearai` |
| Ofox | `ofox` |
| Perplexity Agent | `perplexity-agent` |
| engy | `engy` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| OpenCode | `opencode` |
| Poolside | `poolside` |
| Cohere | `cohere` |
| Cortecs | `cortecs` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| ai& | `aiand` |
| Xiaomi | `xiaomi` |
| Azure Cognitive Services | `azure-cognitive-services` |
| DevPass (LLM Gateway) | `llmgateway` |
| StepFun (China) | `stepfun` |
| Zeldoc | `zeldoc` |
| TokenRouter | `tokenrouter` |
| Reflection | `reflection` |
| Impossibl | `impossibl` |
| Crusoe | `crusoe` |
| 302.AI | `302ai` |
| SAP AI Core | `sap-ai-core` |
| CommandCode | `commandcode` |
| Xpersona | `xpersona` |
| Agnes AI | `agnes` |
| SaladCloud AI Gateway | `salad-cloud` |
| STACKIT | `stackit` |
| FrogBot | `frogbot` |
| GMI Cloud | `gmicloud` |
| Lilac | `lilac` |
| Lynkr | `lynkr` |
| Standard Compute | `standardcompute` |
| Upstage | `upstage` |
| above.dev | `above` |
| Boundless | `boundless` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| CrossModel | `crossmodel` |
| DigitalOcean | `digitalocean` |
| Neuralwatt | `neuralwatt` |
| SiliconFlow (China) | `siliconflow-cn` |
| Echo | `echo` |
| klokintegration.se | `klokintegration` |
| SiliconFlow | `siliconflow` |
| LLM Gateway | `llmgateway-providers` |
| submodel | `submodel` |
| Infer by Flow7 | `infer` |
| IO.NET | `io-net` |
| Synthetic | `synthetic` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| EmpirioLabs AI | `empiriolabs` |
| Anthropic | `anthropic` |
| NeoSmith | `neosmith` |
| Venice AI | `venice` |
| Bothub | `bothub` |
| AI-ROUTER | `ai-router` |
| Vispark | `vispark` |
| Moonshot AI (China) | `moonshotai-cn` |
| Scaleway | `scaleway` |
| Pareto Inference | `pareto` |
| Melious | `melious` |
| Nova | `nova` |
| Bailing | `bailing` |
| Auriko | `auriko` |
| GitHub Copilot | `github-copilot` |
| Kenari | `kenari` |
| Inception | `inception` |
| ClinePass | `cline-pass` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Charm Hyper | `hyper` |
| Infomaniak | `infomaniak` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Wafer | `wafer.ai` |
| Inco | `inco` |
| OrcaRouter | `orcarouter` |
| Nvidia | `nvidia` |
| Helicone | `helicone` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Subconscious | `subconscious` |
| Prime Inference | `prime` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| SCX.ai | `scx-ai` |
| GitLab Duo | `gitlab` |
| Meganova | `meganova` |
| Together AI | `togetherai` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| MiniMax (minimax.io) | `minimax` |
| QiHang | `qihang-ai` |
| Neon | `neon` |
| Abacus | `abacus` |
| LowRouter | `lowrouter` |
| LucidQuery | `lucidquery` |
| Moark | `moark` |
| CoreWeave | `wandb` |
| Tencent Token Plan | `tencent-token-plan` |
| Tencent TokenHub | `tencent-tokenhub` |
| Hugging Face | `huggingface` |
| Jalapeno Cloud | `jalapeno` |
| Alibaba (China) | `alibaba-cn` |
| AKI.IO | `aki-io` |
| FastRouter | `fastrouter` |
| Azure | `azure` |
| RunInfra | `runinfra` |
| Vancine | `vancine` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Chutes | `chutes` |
| LLMTR | `llmtr` |
| Hetzner | `hetzner` |
| NaN | `nan` |
| Eden AI | `edenai` |
| Alibaba | `alibaba` |
| Tinfoil | `tinfoil` |
| Google | `google` |
| Kosmik Compute | `kosmik` |
| IteraCompute | `iteracompute` |
| MiniMax (minimax.cn) | `minimax-cn` |
| LLM Tech | `llmtech` |
| Thinking Machines | `thinkingmachines` |
| AMD | `amd` |
| GreenPT | `greenpt` |
| Qiniu | `qiniu-ai` |
| OpenRouter | `openrouter` |
| TokenGo | `tokengo` |
| Ambient | `ambient` |
| Sarvam AI | `sarvam` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| HPC-AI | `hpc-ai` |
| Inference | `inference` |
| SenseNova (China) | `sensenova` |
| Ollama Cloud | `ollama-cloud` |
| TensorX | `tensorx` |
| LongCat | `longcat` |
| DeepSeek | `deepseek` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| SCNet Token Plan | `scnet-token-plan` |
| Opper | `opper` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| CoralBricks | `coralbricks` |
| AI/ML API | `aimlapi` |
| Merge Gateway | `merge-gateway` |
| Arcee | `arcee` |
| routing.run | `routing-run` |
| Meta | `meta` |
| Tempr Gateway | `tempr` |
| AIHubMix | `aihubmix` |
| OpenCode Go | `opencode-go` |
| Amazon Bedrock | `amazon-bedrock` |
| Novita AI | `novita-ai` |
| D.Run (China) | `drun` |
| Deep Infra | `deepinfra` |
| InferX | `inferx` |
| Fireworks AI | `fireworks-ai` |
| Volcengine Ark | `volcengine` |
| OpenAI | `openai` |
| Vercel AI Gateway | `vercel` |
| evroc | `evroc` |
| QVAC | `qvac` |
| Mistral | `mistral` |
| OCI Generative AI | `oci` |
| Zhipu AI | `zhipuai` |
| Snowflake Cortex | `snowflake-cortex` |
| Perplexity | `perplexity` |
| DaoXE | `daoxe` |
| Databricks | `databricks` |
| Clarifai | `clarifai` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Vultr | `vultr` |
| Sakana AI | `sakana` |
| ainetcafe | `ainetcafe` |
| Baseten | `baseten` |
| Modal | `modal` |
| Berget.AI | `berget` |
| Jiekou.AI | `jiekou` |
| UnoRouter | `unorouter` |
| Claudinio | `claudinio` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| EBCloud | `ebcloud` |
| Wallaby | `wallaby` |
| Modelis | `modelis` |
| ZenMux | `zenmux` |
| ModelScope | `modelscope` |
| Bee by HEOSSI | `bee` |
| Requesty | `requesty` |
| Pioneer | `pioneer` |
| Regolo AI | `regolo-ai` |
| abliteration.ai | `abliteration-ai` |
| Morph | `morph` |
| StepFun (Global) | `stepfun-ai` |
| Vivgrid | `vivgrid` |
| Moonshot AI | `moonshotai` |
| AI21 Labs | `ai21` |
| OpenReason | `openreason` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Privatemode AI | `privatemode-ai` |
| FreeModel | `freemodel` |
| Poe | `poe` |
| Inceptron | `inceptron` |
| LMStudio | `lmstudio` |
| Atomic Chat | `atomic-chat` |
| Aixy | `aixy` |
| Vertex | `google-vertex` |
| NanoGPT | `nano-gpt` |
| Nebius Token Factory | `nebius` |
| Zenifra | `zenifra` |
| Pendra | `pendra` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| watsonx.ai | `watsonx` |
| Umans AI | `umans-ai` |
| Cerebras | `cerebras` |
| Groq | `groq` |
| Mixlayer | `mixlayer` |
| Friendli | `friendli` |
| xAI | `xai` |
| Kilo Gateway | `kilo` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| SambaNova | `sambanova` |
| Z.AI | `zai` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| DInference | `dinference` |
<!-- PROVIDERS:END -->

## License

MIT
