# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**213 providers · 7754 models · Updated 2026-09-25**
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
| Deep Infra | `deepinfra` |
| Perplexity Agent | `perplexity-agent` |
| Bailing | `bailing` |
| Poe | `poe` |
| Cerebras | `cerebras` |
| Groq | `groq` |
| Z.AI | `zai` |
| EmpirioLabs AI | `empiriolabs` |
| SenseNova (China) | `sensenova` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Poolside | `poolside` |
| NanoGPT | `nano-gpt` |
| abliteration.ai | `abliteration-ai` |
| CrofAI | `crof` |
| Standard Compute | `standardcompute` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Anthropic | `anthropic` |
| Tinfoil | `tinfoil` |
| Llama | `llama` |
| Cohere | `cohere` |
| DeepSeek | `deepseek` |
| Baseten | `baseten` |
| NaN | `nan` |
| NEAR AI Cloud | `nearai` |
| CoreWeave | `wandb` |
| Subconscious | `subconscious` |
| Zeldoc | `zeldoc` |
| Databricks | `databricks` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Umans AI | `umans-ai` |
| SiliconFlow | `siliconflow` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Lilac | `lilac` |
| Moonshot AI (China) | `moonshotai-cn` |
| Bothub | `bothub` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Privatemode AI | `privatemode-ai` |
| LLM Gateway | `llmgateway-providers` |
| above.dev | `above` |
| Kilo Gateway | `kilo` |
| Venice AI | `venice` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| AI21 Labs | `ai21` |
| Inference | `inference` |
| iFlow | `iflowcn` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Thinking Machines | `thinkingmachines` |
| Melious | `melious` |
| Berget.AI | `berget` |
| Nova | `nova` |
| Abacus | `abacus` |
| NovitaAI | `novita-ai` |
| 302.AI | `302ai` |
| OpenRouter | `openrouter` |
| Perplexity | `perplexity` |
| IteraCompute | `iteracompute` |
| Meta | `meta` |
| ClinePass | `cline-pass` |
| Modal | `modal` |
| CoralBricks | `coralbricks` |
| routing.run | `routing-run` |
| Echo | `echo` |
| Neuralwatt | `neuralwatt` |
| GitLab Duo | `gitlab` |
| Infer by Flow7 | `infer` |
| Azure | `azure` |
| FreeModel | `freemodel` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Pendra | `pendra` |
| Moark | `moark` |
| Atomic Chat | `atomic-chat` |
| QiHang | `qihang-ai` |
| AI-ROUTER | `ai-router` |
| LLMTR | `llmtr` |
| Alibaba | `alibaba` |
| Auriko | `auriko` |
| ZenMux | `zenmux` |
| UnoRouter | `unorouter` |
| SaladCloud AI Gateway | `salad-cloud` |
| Vispark | `vispark` |
| SiliconFlow (China) | `siliconflow-cn` |
| Regolo AI | `regolo-ai` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Inceptron | `inceptron` |
| Upstage | `upstage` |
| Vultr | `vultr` |
| Hugging Face | `huggingface` |
| Volcengine Ark | `volcengine` |
| Impossibl | `impossibl` |
| Xpersona | `xpersona` |
| Qiniu | `qiniu-ai` |
| ModelScope | `modelscope` |
| Google | `google` |
| Vancine | `vancine` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| LucidQuery | `lucidquery` |
| GMI Cloud | `gmicloud` |
| OCI Generative AI | `oci` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Clarifai | `clarifai` |
| ai& | `aiand` |
| FrogBot | `frogbot` |
| STACKIT | `stackit` |
| Crusoe | `crusoe` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Jiekou.AI | `jiekou` |
| Ollama Cloud | `ollama-cloud` |
| Tencent TokenHub | `tencent-tokenhub` |
| watsonx.ai | `watsonx` |
| Ambient | `ambient` |
| xAI | `xai` |
| Nebius Token Factory | `nebius` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Scaleway | `scaleway` |
| Vercel AI Gateway | `vercel` |
| Z.AI Coding Plan | `zai-coding-plan` |
| EBCloud | `ebcloud` |
| GreenPT | `greenpt` |
| Mixlayer | `mixlayer` |
| Charm Hyper | `hyper` |
| Jalapeno Cloud | `jalapeno` |
| DInference | `dinference` |
| NeoSmith | `neosmith` |
| Fireworks AI | `fireworks-ai` |
| StepFun (Global) | `stepfun-ai` |
| FastRouter | `fastrouter` |
| OrcaRouter | `orcarouter` |
| Friendli | `friendli` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Inco | `inco` |
| Sakana AI | `sakana` |
| SCX.ai | `scx-ai` |
| Zenifra | `zenifra` |
| TokenRouter | `tokenrouter` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Moonshot AI | `moonshotai` |
| ainetcafe | `ainetcafe` |
| Wallaby | `wallaby` |
| SCNet Token Plan | `scnet-token-plan` |
| Ofox | `ofox` |
| Neon | `neon` |
| AIHubMix | `aihubmix` |
| Merge Gateway | `merge-gateway` |
| Opper | `opper` |
| Nvidia | `nvidia` |
| Pioneer | `pioneer` |
| Xiaomi | `xiaomi` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| MiniMax (minimax.io) | `minimax` |
| GitHub Copilot | `github-copilot` |
| InferX | `inferx` |
| OpenCode Go | `opencode-go` |
| OpenReason | `openreason` |
| LMStudio | `lmstudio` |
| AKI.IO | `aki-io` |
| TensorX | `tensorx` |
| LongCat | `longcat` |
| Chutes | `chutes` |
| Eden AI | `edenai` |
| StepFun (China) | `stepfun` |
| HPC-AI | `hpc-ai` |
| v0 | `v0` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Tempr | `tempr` |
| Inception | `inception` |
| Modelis | `modelis` |
| OpenCode Zen | `opencode` |
| Kenari | `kenari` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Wafer | `wafer.ai` |
| Zhipu AI | `zhipuai` |
| Lynkr | `lynkr` |
| Meganova | `meganova` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Requesty | `requesty` |
| Mistral | `mistral` |
| Amazon Bedrock | `amazon-bedrock` |
| Synthetic | `synthetic` |
| DevPass (LLM Gateway) | `llmgateway` |
| SAP AI Core | `sap-ai-core` |
| Vivgrid | `vivgrid` |
| klokintegration.se | `klokintegration` |
| Vertex | `google-vertex` |
| evroc | `evroc` |
| TokenGo | `tokengo` |
| submodel | `submodel` |
| Kosmik Compute | `kosmik` |
| Tencent Token Plan | `tencent-token-plan` |
| Together AI | `togetherai` |
| Helicone | `helicone` |
| Cortecs | `cortecs` |
| Agnes AI | `agnes` |
| DaoXE | `daoxe` |
| Morph | `morph` |
| OpenAI | `openai` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| IO.NET | `io-net` |
| Infomaniak | `infomaniak` |
| LLM Tech | `llmtech` |
| CrossModel | `crossmodel` |
| Arcee | `arcee` |
| D.Run (China) | `drun` |
| AMD | `amd` |
| QVAC | `qvac` |
| Claudinio | `claudinio` |
| RunInfra | `runinfra` |
| Hetzner | `hetzner` |
| DigitalOcean | `digitalocean` |
| Aixy | `aixy` |
| Alibaba (China) | `alibaba-cn` |
<!-- PROVIDERS:END -->

## License

MIT
