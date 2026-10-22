# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**223 providers · 8733 models · Updated 2026-10-22**
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
| Databricks | `databricks` |
| Echo | `echo` |
| Nebius Token Factory | `nebius` |
| SenseNova (China) | `sensenova` |
| SambaNova | `sambanova` |
| Google | `google` |
| NaN | `nan` |
| EBCloud | `ebcloud` |
| Neon | `neon` |
| Pioneer | `pioneer` |
| OpenReason | `openreason` |
| ClinePass | `cline-pass` |
| routing.run | `routing-run` |
| Zhipu AI | `zhipuai` |
| DaoXE | `daoxe` |
| Vultr | `vultr` |
| Perplexity Agent | `perplexity-agent` |
| SCNet Token Plan | `scnet-token-plan` |
| Umans AI | `umans-ai` |
| CommandCode | `commandcode` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Inco | `inco` |
| OpenRouter | `openrouter` |
| Vercel AI Gateway | `vercel` |
| Tencent Token Plan | `tencent-token-plan` |
| QVAC | `qvac` |
| Lilac | `lilac` |
| AI-ROUTER | `ai-router` |
| SaladCloud AI Gateway | `salad-cloud` |
| Zeldoc | `zeldoc` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Subconscious | `subconscious` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Vivgrid | `vivgrid` |
| Crusoe | `crusoe` |
| MiniMax (minimax.io) | `minimax` |
| above.dev | `above` |
| Helicone | `helicone` |
| Upstage | `upstage` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Modelis | `modelis` |
| Cohere | `cohere` |
| EmpirioLabs AI | `empiriolabs` |
| Venice AI | `venice` |
| Llama | `llama` |
| Kenari | `kenari` |
| Moonshot AI | `moonshotai` |
| Infer by Flow7 | `infer` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Inceptron | `inceptron` |
| SAP AI Core | `sap-ai-core` |
| CoralBricks | `coralbricks` |
| ai& | `aiand` |
| Agnes AI | `agnes` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Opper | `opper` |
| Zenifra | `zenifra` |
| Abacus | `abacus` |
| Regolo AI | `regolo-ai` |
| HPC-AI | `hpc-ai` |
| ZenMux | `zenmux` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Tencent TokenHub | `tencent-tokenhub` |
| Nvidia | `nvidia` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Ambient | `ambient` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| STACKIT | `stackit` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Charm Hyper | `hyper` |
| OpenCode | `opencode` |
| AIHubMix | `aihubmix` |
| Aixy | `aixy` |
| Hugging Face | `huggingface` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Inference | `inference` |
| Synthetic | `synthetic` |
| SiliconFlow (China) | `siliconflow-cn` |
| Bee by HEOSSI | `bee` |
| AI/ML API | `aimlapi` |
| Kosmik Compute | `kosmik` |
| Atomic Chat | `atomic-chat` |
| engy | `engy` |
| RunInfra | `runinfra` |
| Infomaniak | `infomaniak` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| StepFun (China) | `stepfun` |
| LowRouter | `lowrouter` |
| Alibaba | `alibaba` |
| Azure | `azure` |
| Qiniu | `qiniu-ai` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| LLM Tech | `llmtech` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| klokintegration.se | `klokintegration` |
| Cortecs | `cortecs` |
| Melious | `melious` |
| Bothub | `bothub` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Pendra | `pendra` |
| Boundless | `boundless` |
| Thinking Machines | `thinkingmachines` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Clarifai | `clarifai` |
| Fireworks AI | `fireworks-ai` |
| Morph | `morph` |
| OrcaRouter | `orcarouter` |
| Vispark | `vispark` |
| LongCat | `longcat` |
| Vancine | `vancine` |
| LLM Gateway | `llmgateway-providers` |
| GMI Cloud | `gmicloud` |
| LMStudio | `lmstudio` |
| Hetzner | `hetzner` |
| Inception | `inception` |
| GitHub Copilot | `github-copilot` |
| abliteration.ai | `abliteration-ai` |
| Berget.AI | `berget` |
| NanoGPT | `nano-gpt` |
| Modal | `modal` |
| DInference | `dinference` |
| Standard Compute | `standardcompute` |
| Pareto Inference | `pareto` |
| TensorX | `tensorx` |
| StepFun (Global) | `stepfun-ai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Auriko | `auriko` |
| GreenPT | `greenpt` |
| SiliconFlow | `siliconflow` |
| CoreWeave | `wandb` |
| DigitalOcean | `digitalocean` |
| Together AI | `togetherai` |
| OpenCode Go | `opencode-go` |
| NeoSmith | `neosmith` |
| Merge Gateway | `merge-gateway` |
| Wallaby | `wallaby` |
| Jalapeno Cloud | `jalapeno` |
| QiHang | `qihang-ai` |
| 302.AI | `302ai` |
| iFlow | `iflowcn` |
| Claudinio | `claudinio` |
| AMD | `amd` |
| evroc | `evroc` |
| Mistral | `mistral` |
| D.Run (China) | `drun` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Mixlayer | `mixlayer` |
| Groq | `groq` |
| Friendli | `friendli` |
| UnoRouter | `unorouter` |
| Anthropic | `anthropic` |
| Meta | `meta` |
| Jiekou.AI | `jiekou` |
| Novita AI | `novita-ai` |
| IteraCompute | `iteracompute` |
| Moonshot AI (China) | `moonshotai-cn` |
| Perplexity | `perplexity` |
| Alibaba (China) | `alibaba-cn` |
| Prime Inference | `prime` |
| OCI Generative AI | `oci` |
| CrossModel | `crossmodel` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Poe | `poe` |
| Volcengine Ark | `volcengine` |
| GitLab Duo | `gitlab` |
| Meganova | `meganova` |
| TokenRouter | `tokenrouter` |
| Eden AI | `edenai` |
| TokenGo | `tokengo` |
| LucidQuery | `lucidquery` |
| AI21 Labs | `ai21` |
| Lynkr | `lynkr` |
| LLMTR | `llmtr` |
| Arcee | `arcee` |
| Scaleway | `scaleway` |
| watsonx.ai | `watsonx` |
| SCX.ai | `scx-ai` |
| FastRouter | `fastrouter` |
| Z.AI | `zai` |
| FrogBot | `frogbot` |
| Cerebras | `cerebras` |
| Ollama Cloud | `ollama-cloud` |
| submodel | `submodel` |
| Tinfoil | `tinfoil` |
| Poolside | `poolside` |
| Baseten | `baseten` |
| IO.NET | `io-net` |
| Snowflake Cortex | `snowflake-cortex` |
| ModelScope | `modelscope` |
| InferX | `inferx` |
| Vertex | `google-vertex` |
| Impossibl | `impossibl` |
| DeepSeek | `deepseek` |
| Sarvam AI | `sarvam` |
| Moark | `moark` |
| Bailing | `bailing` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Xiaomi | `xiaomi` |
| Ofox | `ofox` |
| Reflection | `reflection` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Sakana AI | `sakana` |
| Privatemode AI | `privatemode-ai` |
| Amazon Bedrock | `amazon-bedrock` |
| Chutes | `chutes` |
| ainetcafe | `ainetcafe` |
| Nova | `nova` |
| Kilo Gateway | `kilo` |
| AKI.IO | `aki-io` |
| xAI | `xai` |
| Requesty | `requesty` |
| FreeModel | `freemodel` |
| Neuralwatt | `neuralwatt` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Xpersona | `xpersona` |
| NEAR AI Cloud | `nearai` |
| Deep Infra | `deepinfra` |
| Azure Cognitive Services | `azure-cognitive-services` |
| DevPass (LLM Gateway) | `llmgateway` |
| Tempr Gateway | `tempr` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Wafer | `wafer.ai` |
| OpenAI | `openai` |
<!-- PROVIDERS:END -->

## License

MIT
