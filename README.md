# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**222 providers · 8723 models · Updated 2026-10-21**
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
| Azure | `azure` |
| Perplexity | `perplexity` |
| OCI Generative AI | `oci` |
| Atomic Chat | `atomic-chat` |
| OpenAI | `openai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| evroc | `evroc` |
| engy | `engy` |
| Boundless | `boundless` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Vultr | `vultr` |
| Zenifra | `zenifra` |
| Meta | `meta` |
| Hugging Face | `huggingface` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| IteraCompute | `iteracompute` |
| Jiekou.AI | `jiekou` |
| ModelScope | `modelscope` |
| Cerebras | `cerebras` |
| abliteration.ai | `abliteration-ai` |
| FreeModel | `freemodel` |
| Groq | `groq` |
| AMD | `amd` |
| SCNet Token Plan | `scnet-token-plan` |
| LongCat | `longcat` |
| Moark | `moark` |
| Merge Gateway | `merge-gateway` |
| Zeldoc | `zeldoc` |
| D.Run (China) | `drun` |
| DeepSeek | `deepseek` |
| LLM Gateway | `llmgateway-providers` |
| Neon | `neon` |
| Mixlayer | `mixlayer` |
| Privatemode AI | `privatemode-ai` |
| DInference | `dinference` |
| LLMTR | `llmtr` |
| Friendli | `friendli` |
| Eden AI | `edenai` |
| DigitalOcean | `digitalocean` |
| Helicone | `helicone` |
| Regolo AI | `regolo-ai` |
| Lynkr | `lynkr` |
| Thinking Machines | `thinkingmachines` |
| Poe | `poe` |
| Xiaomi | `xiaomi` |
| Vispark | `vispark` |
| Venice AI | `venice` |
| Kenari | `kenari` |
| InferX | `inferx` |
| Vercel AI Gateway | `vercel` |
| Standard Compute | `standardcompute` |
| Ofox | `ofox` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| NaN | `nan` |
| xAI | `xai` |
| routing.run | `routing-run` |
| ainetcafe | `ainetcafe` |
| DevPass (LLM Gateway) | `llmgateway` |
| Ollama Cloud | `ollama-cloud` |
| Inference | `inference` |
| Arcee | `arcee` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Nvidia | `nvidia` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| GitLab Duo | `gitlab` |
| CoralBricks | `coralbricks` |
| SAP AI Core | `sap-ai-core` |
| Abacus | `abacus` |
| Pareto Inference | `pareto` |
| SenseNova (China) | `sensenova` |
| Perplexity Agent | `perplexity-agent` |
| Alibaba | `alibaba` |
| Fireworks AI | `fireworks-ai` |
| Scaleway | `scaleway` |
| Nova | `nova` |
| HPC-AI | `hpc-ai` |
| Deep Infra | `deepinfra` |
| QVAC | `qvac` |
| Bee by HEOSSI | `bee` |
| Meganova | `meganova` |
| EBCloud | `ebcloud` |
| Chutes | `chutes` |
| Neuralwatt | `neuralwatt` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Together AI | `togetherai` |
| NEAR AI Cloud | `nearai` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Subconscious | `subconscious` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| RunInfra | `runinfra` |
| Modal | `modal` |
| OpenRouter | `openrouter` |
| Inco | `inco` |
| LucidQuery | `lucidquery` |
| ai& | `aiand` |
| DaoXE | `daoxe` |
| Kilo Gateway | `kilo` |
| Charm Hyper | `hyper` |
| Bothub | `bothub` |
| EmpirioLabs AI | `empiriolabs` |
| OrcaRouter | `orcarouter` |
| CrossModel | `crossmodel` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Alibaba (China) | `alibaba-cn` |
| CommandCode | `commandcode` |
| GitHub Copilot | `github-copilot` |
| Databricks | `databricks` |
| Crusoe | `crusoe` |
| Moonshot AI (China) | `moonshotai-cn` |
| Jalapeno Cloud | `jalapeno` |
| Tencent TokenHub | `tencent-tokenhub` |
| Hetzner | `hetzner` |
| OpenReason | `openreason` |
| FrogBot | `frogbot` |
| AKI.IO | `aki-io` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Tinfoil | `tinfoil` |
| IO.NET | `io-net` |
| NanoGPT | `nano-gpt` |
| Mistral | `mistral` |
| LowRouter | `lowrouter` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Melious | `melious` |
| Moonshot AI | `moonshotai` |
| watsonx.ai | `watsonx` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Upstage | `upstage` |
| LMStudio | `lmstudio` |
| Aixy | `aixy` |
| STACKIT | `stackit` |
| iFlow | `iflowcn` |
| submodel | `submodel` |
| Agnes AI | `agnes` |
| Xpersona | `xpersona` |
| Infomaniak | `infomaniak` |
| Zhipu AI | `zhipuai` |
| OpenCode Go | `opencode-go` |
| OVHcloud AI Endpoints | `ovhcloud` |
| 302.AI | `302ai` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| SCX.ai | `scx-ai` |
| FastRouter | `fastrouter` |
| klokintegration.se | `klokintegration` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Amazon Bedrock | `amazon-bedrock` |
| Berget.AI | `berget` |
| AIHubMix | `aihubmix` |
| AI-ROUTER | `ai-router` |
| ZenMux | `zenmux` |
| Auriko | `auriko` |
| Bailing | `bailing` |
| Inceptron | `inceptron` |
| Morph | `morph` |
| Llama | `llama` |
| Claudinio | `claudinio` |
| SiliconFlow | `siliconflow` |
| GreenPT | `greenpt` |
| Anthropic | `anthropic` |
| Impossibl | `impossibl` |
| Tempr Gateway | `tempr` |
| Cohere | `cohere` |
| Vivgrid | `vivgrid` |
| Lilac | `lilac` |
| Pioneer | `pioneer` |
| GMI Cloud | `gmicloud` |
| CoreWeave | `wandb` |
| ClinePass | `cline-pass` |
| Synthetic | `synthetic` |
| Vancine | `vancine` |
| Pendra | `pendra` |
| LLM Tech | `llmtech` |
| Ambient | `ambient` |
| Vertex | `google-vertex` |
| Infer by Flow7 | `infer` |
| Prime Inference | `prime` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Inception | `inception` |
| Poolside | `poolside` |
| Nebius Token Factory | `nebius` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Cortecs | `cortecs` |
| NeoSmith | `neosmith` |
| Wallaby | `wallaby` |
| MiniMax (minimax.io) | `minimax` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Requesty | `requesty` |
| Kosmik Compute | `kosmik` |
| QiHang | `qihang-ai` |
| Volcengine Ark | `volcengine` |
| Umans AI | `umans-ai` |
| Qiniu | `qiniu-ai` |
| Baseten | `baseten` |
| Snowflake Cortex | `snowflake-cortex` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| StepFun (China) | `stepfun` |
| TokenRouter | `tokenrouter` |
| TokenGo | `tokengo` |
| Echo | `echo` |
| Opper | `opper` |
| Google | `google` |
| AI/ML API | `aimlapi` |
| SiliconFlow (China) | `siliconflow-cn` |
| Tencent Token Plan | `tencent-token-plan` |
| AI21 Labs | `ai21` |
| Reflection | `reflection` |
| Modelis | `modelis` |
| Z.AI | `zai` |
| SambaNova | `sambanova` |
| TensorX | `tensorx` |
| OpenCode | `opencode` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Wafer | `wafer.ai` |
| UnoRouter | `unorouter` |
| Novita AI | `novita-ai` |
| StepFun (Global) | `stepfun-ai` |
| Sakana AI | `sakana` |
| SaladCloud AI Gateway | `salad-cloud` |
| above.dev | `above` |
| Clarifai | `clarifai` |
<!-- PROVIDERS:END -->

## License

MIT
