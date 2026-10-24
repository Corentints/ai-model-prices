# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**221 providers · 8495 models · Updated 2026-10-24**
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
| Standard Compute | `standardcompute` |
| DaoXE | `daoxe` |
| Lilac | `lilac` |
| Tencent TokenHub | `tencent-tokenhub` |
| Crusoe | `crusoe` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Cortecs | `cortecs` |
| routing.run | `routing-run` |
| AI-ROUTER | `ai-router` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| InferX | `inferx` |
| Kosmik Compute | `kosmik` |
| Aixy | `aixy` |
| Privatemode AI | `privatemode-ai` |
| Pareto Inference | `pareto` |
| Auriko | `auriko` |
| Cerebras | `cerebras` |
| UnoRouter | `unorouter` |
| Wallaby | `wallaby` |
| Tinfoil | `tinfoil` |
| Claudinio | `claudinio` |
| Chutes | `chutes` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| LMStudio | `lmstudio` |
| evroc | `evroc` |
| NEAR AI Cloud | `nearai` |
| Neuralwatt | `neuralwatt` |
| QiHang | `qihang-ai` |
| Vultr | `vultr` |
| Echo | `echo` |
| Morph | `morph` |
| Perplexity Agent | `perplexity-agent` |
| Merge Gateway | `merge-gateway` |
| DigitalOcean | `digitalocean` |
| Inception | `inception` |
| Meganova | `meganova` |
| LLMTR | `llmtr` |
| RunInfra | `runinfra` |
| AI21 Labs | `ai21` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Sakana AI | `sakana` |
| NeoSmith | `neosmith` |
| Infomaniak | `infomaniak` |
| ainetcafe | `ainetcafe` |
| Jiekou.AI | `jiekou` |
| Databricks | `databricks` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Scaleway | `scaleway` |
| Mistral | `mistral` |
| Bothub | `bothub` |
| SenseNova (China) | `sensenova` |
| LowRouter | `lowrouter` |
| Inco | `inco` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| 302.AI | `302ai` |
| LucidQuery | `lucidquery` |
| Wafer | `wafer.ai` |
| Inference | `inference` |
| OpenRouter | `openrouter` |
| Pendra | `pendra` |
| Moonshot AI | `moonshotai` |
| OCI Generative AI | `oci` |
| Zenifra | `zenifra` |
| Infer by Flow7 | `infer` |
| Bee by HEOSSI | `bee` |
| xAI | `xai` |
| Fireworks AI | `fireworks-ai` |
| klokintegration.se | `klokintegration` |
| FastRouter | `fastrouter` |
| OpenReason | `openreason` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Vivgrid | `vivgrid` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Ofox | `ofox` |
| Regolo AI | `regolo-ai` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| LongCat | `longcat` |
| Upstage | `upstage` |
| GreenPT | `greenpt` |
| AKI.IO | `aki-io` |
| MiniMax (minimax.io) | `minimax` |
| LLM Tech | `llmtech` |
| Requesty | `requesty` |
| Charm Hyper | `hyper` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Atomic Chat | `atomic-chat` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| NaN | `nan` |
| Sarvam AI | `sarvam` |
| Tencent Token Plan | `tencent-token-plan` |
| abliteration.ai | `abliteration-ai` |
| Vancine | `vancine` |
| engy | `engy` |
| OpenCode | `opencode` |
| CrossModel | `crossmodel` |
| Vispark | `vispark` |
| Opper | `opper` |
| SAP AI Core | `sap-ai-core` |
| Xiaomi | `xiaomi` |
| SCX.ai | `scx-ai` |
| Alibaba | `alibaba` |
| HPC-AI | `hpc-ai` |
| Arcee | `arcee` |
| Z.AI | `zai` |
| Ambient | `ambient` |
| GMI Cloud | `gmicloud` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Xpersona | `xpersona` |
| FrogBot | `frogbot` |
| Friendli | `friendli` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Impossibl | `impossibl` |
| Prime Inference | `prime` |
| Moonshot AI (China) | `moonshotai-cn` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| OpenAI | `openai` |
| ClinePass | `cline-pass` |
| AMD | `amd` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| DeepSeek | `deepseek` |
| MiniMax (minimax.cn) | `minimax-cn` |
| AIHubMix | `aihubmix` |
| above.dev | `above` |
| Melious | `melious` |
| OrcaRouter | `orcarouter` |
| Subconscious | `subconscious` |
| submodel | `submodel` |
| AI/ML API | `aimlapi` |
| Modal | `modal` |
| D.Run (China) | `drun` |
| SiliconFlow | `siliconflow` |
| Vercel AI Gateway | `vercel` |
| Zeldoc | `zeldoc` |
| StepFun (Global) | `stepfun-ai` |
| Vertex | `google-vertex` |
| Nebius Token Factory | `nebius` |
| Perplexity | `perplexity` |
| SaladCloud AI Gateway | `salad-cloud` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| SambaNova | `sambanova` |
| TokenRouter | `tokenrouter` |
| GitLab Duo | `gitlab` |
| IteraCompute | `iteracompute` |
| FreeModel | `freemodel` |
| TokenGo | `tokengo` |
| Volcengine Ark | `volcengine` |
| Synthetic | `synthetic` |
| QVAC | `qvac` |
| ZenMux | `zenmux` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Nova | `nova` |
| Snowflake Cortex | `snowflake-cortex` |
| Together AI | `togetherai` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Tempr Gateway | `tempr` |
| Alibaba (China) | `alibaba-cn` |
| Berget.AI | `berget` |
| Mixlayer | `mixlayer` |
| Kilo Gateway | `kilo` |
| Eden AI | `edenai` |
| Moark | `moark` |
| ai& | `aiand` |
| Pioneer | `pioneer` |
| Lynkr | `lynkr` |
| DInference | `dinference` |
| Hugging Face | `huggingface` |
| Inceptron | `inceptron` |
| Venice AI | `venice` |
| SiliconFlow (China) | `siliconflow-cn` |
| Thinking Machines | `thinkingmachines` |
| Abacus | `abacus` |
| CommandCode | `commandcode` |
| GitHub Copilot | `github-copilot` |
| TensorX | `tensorx` |
| Jalapeno Cloud | `jalapeno` |
| Modelis | `modelis` |
| watsonx.ai | `watsonx` |
| Poe | `poe` |
| Hetzner | `hetzner` |
| CoreWeave | `wandb` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Neon | `neon` |
| EmpirioLabs AI | `empiriolabs` |
| Helicone | `helicone` |
| Meta | `meta` |
| Nvidia | `nvidia` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Qiniu | `qiniu-ai` |
| LLM Gateway | `llmgateway-providers` |
| Baseten | `baseten` |
| Google | `google` |
| CoralBricks | `coralbricks` |
| EBCloud | `ebcloud` |
| OpenCode Go | `opencode-go` |
| Anthropic | `anthropic` |
| ModelScope | `modelscope` |
| Novita AI | `novita-ai` |
| Ollama Cloud | `ollama-cloud` |
| Deep Infra | `deepinfra` |
| DevPass (LLM Gateway) | `llmgateway` |
| Poolside | `poolside` |
| Zhipu AI | `zhipuai` |
| Reflection | `reflection` |
| STACKIT | `stackit` |
| Umans AI | `umans-ai` |
| Azure | `azure` |
| NanoGPT | `nano-gpt` |
| Agnes AI | `agnes` |
| Clarifai | `clarifai` |
| Groq | `groq` |
| Cohere | `cohere` |
| Bailing | `bailing` |
| IO.NET | `io-net` |
| Kenari | `kenari` |
| Boundless | `boundless` |
| StepFun (China) | `stepfun` |
| Amazon Bedrock | `amazon-bedrock` |
| SCNet Token Plan | `scnet-token-plan` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
<!-- PROVIDERS:END -->

## License

MIT
