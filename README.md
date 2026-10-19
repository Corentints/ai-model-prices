# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**222 providers · 8601 models · Updated 2026-10-19**
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
| Llama | `llama` |
| CoreWeave | `wandb` |
| NeoSmith | `neosmith` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Nova | `nova` |
| Modal | `modal` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Reflection | `reflection` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Bailing | `bailing` |
| klokintegration.se | `klokintegration` |
| GitLab Duo | `gitlab` |
| Fireworks AI | `fireworks-ai` |
| OpenCode | `opencode` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Hugging Face | `huggingface` |
| Inception | `inception` |
| AI-ROUTER | `ai-router` |
| FrogBot | `frogbot` |
| Crusoe | `crusoe` |
| watsonx.ai | `watsonx` |
| Opper | `opper` |
| Infer by Flow7 | `infer` |
| AMD | `amd` |
| Tempr Gateway | `tempr` |
| Vivgrid | `vivgrid` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Databricks | `databricks` |
| SAP AI Core | `sap-ai-core` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Helicone | `helicone` |
| Cortecs | `cortecs` |
| Aixy | `aixy` |
| InferX | `inferx` |
| Deep Infra | `deepinfra` |
| Pendra | `pendra` |
| Groq | `groq` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Poe | `poe` |
| Melious | `melious` |
| MiniMax (minimax.io) | `minimax` |
| Perplexity Agent | `perplexity-agent` |
| StepFun (China) | `stepfun` |
| Bee by HEOSSI | `bee` |
| HPC-AI | `hpc-ai` |
| Zenifra | `zenifra` |
| Amazon Bedrock | `amazon-bedrock` |
| Moonshot AI (China) | `moonshotai-cn` |
| Wallaby | `wallaby` |
| Atomic Chat | `atomic-chat` |
| ZenMux | `zenmux` |
| Tencent Token Plan | `tencent-token-plan` |
| DeepSeek | `deepseek` |
| OCI Generative AI | `oci` |
| SCNet Token Plan | `scnet-token-plan` |
| evroc | `evroc` |
| Boundless | `boundless` |
| Impossibl | `impossibl` |
| Thinking Machines | `thinkingmachines` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Regolo AI | `regolo-ai` |
| Azure | `azure` |
| Synthetic | `synthetic` |
| QVAC | `qvac` |
| OrcaRouter | `orcarouter` |
| xAI | `xai` |
| Eden AI | `edenai` |
| Ofox | `ofox` |
| Ollama Cloud | `ollama-cloud` |
| Abacus | `abacus` |
| OpenCode Go | `opencode-go` |
| LowRouter | `lowrouter` |
| STACKIT | `stackit` |
| Claudinio | `claudinio` |
| FastRouter | `fastrouter` |
| Modelis | `modelis` |
| abliteration.ai | `abliteration-ai` |
| Echo | `echo` |
| Baseten | `baseten` |
| RunInfra | `runinfra` |
| SiliconFlow | `siliconflow` |
| Venice AI | `venice` |
| Xiaomi | `xiaomi` |
| Wafer | `wafer.ai` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Nebius Token Factory | `nebius` |
| QiHang | `qihang-ai` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Tinfoil | `tinfoil` |
| ClinePass | `cline-pass` |
| IteraCompute | `iteracompute` |
| Privatemode AI | `privatemode-ai` |
| Vispark | `vispark` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Volcengine Ark | `volcengine` |
| Prime Inference | `prime` |
| Perplexity | `perplexity` |
| Upstage | `upstage` |
| TokenGo | `tokengo` |
| above.dev | `above` |
| GitHub Copilot | `github-copilot` |
| SambaNova | `sambanova` |
| UnoRouter | `unorouter` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| 302.AI | `302ai` |
| Moark | `moark` |
| D.Run (China) | `drun` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Cohere | `cohere` |
| Vultr | `vultr` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| EBCloud | `ebcloud` |
| Chutes | `chutes` |
| Charm Hyper | `hyper` |
| Vertex | `google-vertex` |
| Bothub | `bothub` |
| Lynkr | `lynkr` |
| Zhipu AI | `zhipuai` |
| Vercel AI Gateway | `vercel` |
| StepFun (Global) | `stepfun-ai` |
| Scaleway | `scaleway` |
| DaoXE | `daoxe` |
| Auriko | `auriko` |
| Subconscious | `subconscious` |
| Poolside | `poolside` |
| Tencent TokenHub | `tencent-tokenhub` |
| AIHubMix | `aihubmix` |
| Inco | `inco` |
| Mixlayer | `mixlayer` |
| Kilo Gateway | `kilo` |
| Agnes AI | `agnes` |
| Neuralwatt | `neuralwatt` |
| routing.run | `routing-run` |
| NEAR AI Cloud | `nearai` |
| Inceptron | `inceptron` |
| Vancine | `vancine` |
| iFlow | `iflowcn` |
| Merge Gateway | `merge-gateway` |
| Anthropic | `anthropic` |
| OpenRouter | `openrouter` |
| LLM Tech | `llmtech` |
| Moonshot AI | `moonshotai` |
| Lilac | `lilac` |
| Z.AI Coding Plan | `zai-coding-plan` |
| CoralBricks | `coralbricks` |
| SenseNova (China) | `sensenova` |
| LongCat | `longcat` |
| submodel | `submodel` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Requesty | `requesty` |
| LMStudio | `lmstudio` |
| LucidQuery | `lucidquery` |
| Neon | `neon` |
| NaN | `nan` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| ai& | `aiand` |
| Novita AI | `novita-ai` |
| AI/ML API | `aimlapi` |
| Google | `google` |
| Pioneer | `pioneer` |
| Umans AI | `umans-ai` |
| NanoGPT | `nano-gpt` |
| ModelScope | `modelscope` |
| Ambient | `ambient` |
| TensorX | `tensorx` |
| Clarifai | `clarifai` |
| Sakana AI | `sakana` |
| FreeModel | `freemodel` |
| Meta | `meta` |
| GMI Cloud | `gmicloud` |
| GreenPT | `greenpt` |
| DInference | `dinference` |
| EmpirioLabs AI | `empiriolabs` |
| DevPass (LLM Gateway) | `llmgateway` |
| CommandCode | `commandcode` |
| Arcee | `arcee` |
| Kosmik Compute | `kosmik` |
| AI21 Labs | `ai21` |
| Xpersona | `xpersona` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Infomaniak | `infomaniak` |
| engy | `engy` |
| Jalapeno Cloud | `jalapeno` |
| Standard Compute | `standardcompute` |
| CrossModel | `crossmodel` |
| Kenari | `kenari` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| LLMTR | `llmtr` |
| CrofAI | `crof` |
| TokenRouter | `tokenrouter` |
| OpenAI | `openai` |
| SCX.ai | `scx-ai` |
| Meganova | `meganova` |
| Cerebras | `cerebras` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Berget.AI | `berget` |
| Alibaba (China) | `alibaba-cn` |
| Z.AI | `zai` |
| ainetcafe | `ainetcafe` |
| Friendli | `friendli` |
| Jiekou.AI | `jiekou` |
| DigitalOcean | `digitalocean` |
| IO.NET | `io-net` |
| AKI.IO | `aki-io` |
| Pareto Inference | `pareto` |
| Mistral | `mistral` |
| Qiniu | `qiniu-ai` |
| SaladCloud AI Gateway | `salad-cloud` |
| SiliconFlow (China) | `siliconflow-cn` |
| Alibaba | `alibaba` |
| Zeldoc | `zeldoc` |
| Together AI | `togetherai` |
| LLM Gateway | `llmgateway-providers` |
| Inference | `inference` |
| OpenReason | `openreason` |
| Morph | `morph` |
| Nvidia | `nvidia` |
| Hetzner | `hetzner` |
<!-- PROVIDERS:END -->

## License

MIT
