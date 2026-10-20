# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**221 providers · 8627 models · Updated 2026-10-20**
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
| Pioneer | `pioneer` |
| evroc | `evroc` |
| Tinfoil | `tinfoil` |
| Moonshot AI | `moonshotai` |
| Aixy | `aixy` |
| Meganova | `meganova` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Tencent TokenHub | `tencent-tokenhub` |
| OpenReason | `openreason` |
| NeoSmith | `neosmith` |
| Google | `google` |
| Hetzner | `hetzner` |
| Modal | `modal` |
| Hugging Face | `huggingface` |
| NanoGPT | `nano-gpt` |
| Moark | `moark` |
| Vertex | `google-vertex` |
| Cerebras | `cerebras` |
| Eden AI | `edenai` |
| Novita AI | `novita-ai` |
| Prime Inference | `prime` |
| Nebius Token Factory | `nebius` |
| Qiniu | `qiniu-ai` |
| UnoRouter | `unorouter` |
| Neon | `neon` |
| Z.AI | `zai` |
| FastRouter | `fastrouter` |
| STACKIT | `stackit` |
| Pendra | `pendra` |
| AI-ROUTER | `ai-router` |
| Jiekou.AI | `jiekou` |
| Upstage | `upstage` |
| Sakana AI | `sakana` |
| Bothub | `bothub` |
| QVAC | `qvac` |
| Charm Hyper | `hyper` |
| Reflection | `reflection` |
| Mixlayer | `mixlayer` |
| ModelScope | `modelscope` |
| Tempr Gateway | `tempr` |
| AI/ML API | `aimlapi` |
| SiliconFlow (China) | `siliconflow-cn` |
| Crusoe | `crusoe` |
| CoreWeave | `wandb` |
| Clarifai | `clarifai` |
| above.dev | `above` |
| Vivgrid | `vivgrid` |
| InferX | `inferx` |
| D.Run (China) | `drun` |
| Poolside | `poolside` |
| CrossModel | `crossmodel` |
| FrogBot | `frogbot` |
| Xpersona | `xpersona` |
| DaoXE | `daoxe` |
| submodel | `submodel` |
| Pareto Inference | `pareto` |
| Kosmik Compute | `kosmik` |
| Merge Gateway | `merge-gateway` |
| LowRouter | `lowrouter` |
| Nova | `nova` |
| LLMTR | `llmtr` |
| NaN | `nan` |
| xAI | `xai` |
| AI21 Labs | `ai21` |
| SenseNova (China) | `sensenova` |
| Ollama Cloud | `ollama-cloud` |
| Tencent Token Plan | `tencent-token-plan` |
| 302.AI | `302ai` |
| DigitalOcean | `digitalocean` |
| SambaNova | `sambanova` |
| OpenAI | `openai` |
| Meta | `meta` |
| routing.run | `routing-run` |
| Perplexity Agent | `perplexity-agent` |
| LongCat | `longcat` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Neuralwatt | `neuralwatt` |
| Venice AI | `venice` |
| GitLab Duo | `gitlab` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| klokintegration.se | `klokintegration` |
| OpenCode | `opencode` |
| StepFun (Global) | `stepfun-ai` |
| Requesty | `requesty` |
| abliteration.ai | `abliteration-ai` |
| NEAR AI Cloud | `nearai` |
| Ambient | `ambient` |
| MiniMax (minimax.cn) | `minimax-cn` |
| SAP AI Core | `sap-ai-core` |
| Helicone | `helicone` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Vispark | `vispark` |
| Poe | `poe` |
| Morph | `morph` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Impossibl | `impossibl` |
| SaladCloud AI Gateway | `salad-cloud` |
| AMD | `amd` |
| SCNet Token Plan | `scnet-token-plan` |
| Amazon Bedrock | `amazon-bedrock` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Privatemode AI | `privatemode-ai` |
| Thinking Machines | `thinkingmachines` |
| Abacus | `abacus` |
| RunInfra | `runinfra` |
| Xiaomi | `xiaomi` |
| GitHub Copilot | `github-copilot` |
| LMStudio | `lmstudio` |
| TokenRouter | `tokenrouter` |
| Vultr | `vultr` |
| TensorX | `tensorx` |
| CommandCode | `commandcode` |
| Berget.AI | `berget` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Agnes AI | `agnes` |
| HPC-AI | `hpc-ai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| watsonx.ai | `watsonx` |
| AKI.IO | `aki-io` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Friendli | `friendli` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| LLM Gateway | `llmgateway-providers` |
| CoralBricks | `coralbricks` |
| Vercel AI Gateway | `vercel` |
| Anthropic | `anthropic` |
| OrcaRouter | `orcarouter` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Modelis | `modelis` |
| Volcengine Ark | `volcengine` |
| GreenPT | `greenpt` |
| EBCloud | `ebcloud` |
| Inceptron | `inceptron` |
| ainetcafe | `ainetcafe` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| GMI Cloud | `gmicloud` |
| Nvidia | `nvidia` |
| Databricks | `databricks` |
| SCX.ai | `scx-ai` |
| ClinePass | `cline-pass` |
| Bee by HEOSSI | `bee` |
| Fireworks AI | `fireworks-ai` |
| Cohere | `cohere` |
| SiliconFlow | `siliconflow` |
| Zenifra | `zenifra` |
| Baseten | `baseten` |
| Boundless | `boundless` |
| Scaleway | `scaleway` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Synthetic | `synthetic` |
| Echo | `echo` |
| ai& | `aiand` |
| Regolo AI | `regolo-ai` |
| engy | `engy` |
| Inco | `inco` |
| Auriko | `auriko` |
| Kilo Gateway | `kilo` |
| Deep Infra | `deepinfra` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Claudinio | `claudinio` |
| Kenari | `kenari` |
| Alibaba (China) | `alibaba-cn` |
| Cortecs | `cortecs` |
| Inference | `inference` |
| Mistral | `mistral` |
| LLM Tech | `llmtech` |
| Llama | `llama` |
| Subconscious | `subconscious` |
| FreeModel | `freemodel` |
| Azure Cognitive Services | `azure-cognitive-services` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Groq | `groq` |
| IteraCompute | `iteracompute` |
| Bailing | `bailing` |
| Lynkr | `lynkr` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Moonshot AI (China) | `moonshotai-cn` |
| Melious | `melious` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| MiniMax (minimax.io) | `minimax` |
| Wallaby | `wallaby` |
| OpenCode Go | `opencode-go` |
| Together AI | `togetherai` |
| DevPass (LLM Gateway) | `llmgateway` |
| IO.NET | `io-net` |
| OpenRouter | `openrouter` |
| Standard Compute | `standardcompute` |
| Perplexity | `perplexity` |
| TokenGo | `tokengo` |
| Zhipu AI | `zhipuai` |
| DeepSeek | `deepseek` |
| iFlow | `iflowcn` |
| AIHubMix | `aihubmix` |
| Umans AI | `umans-ai` |
| EmpirioLabs AI | `empiriolabs` |
| Arcee | `arcee` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Ofox | `ofox` |
| Jalapeno Cloud | `jalapeno` |
| Azure | `azure` |
| Inception | `inception` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Lilac | `lilac` |
| LucidQuery | `lucidquery` |
| DInference | `dinference` |
| StepFun (China) | `stepfun` |
| Infomaniak | `infomaniak` |
| Zeldoc | `zeldoc` |
| Chutes | `chutes` |
| Wafer | `wafer.ai` |
| Atomic Chat | `atomic-chat` |
| Alibaba | `alibaba` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| OCI Generative AI | `oci` |
| Vancine | `vancine` |
| Infer by Flow7 | `infer` |
| Opper | `opper` |
| QiHang | `qihang-ai` |
| ZenMux | `zenmux` |
<!-- PROVIDERS:END -->

## License

MIT
