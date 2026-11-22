# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**312 providers · 9573 models · Updated 2026-11-22**
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
| Keln | `keln` |
| TheRouter | `therouter` |
| Pareto Inference | `pareto` |
| Azure Cognitive Services | `azure-cognitive-services` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Zenifra | `zenifra` |
| Bailing | `bailing` |
| AI Power Grid | `aipg` |
| ai& | `aiand` |
| Inference | `inference` |
| Berget.AI | `berget` |
| Abacus | `abacus` |
| AMD | `amd` |
| Moark | `moark` |
| Alibaba | `alibaba` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Cerebras | `cerebras` |
| Jalapeno Cloud | `jalapeno` |
| Merge Gateway | `merge-gateway` |
| QiHang | `qihang-ai` |
| Ambient | `ambient` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Vultr | `vultr` |
| IteraCompute | `iteracompute` |
| DevPass (LLM Gateway) | `llmgateway` |
| Augure | `augure` |
| Sarvam AI | `sarvam` |
| Lyceum | `lyceum` |
| QVAC | `qvac` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Hugging Face | `huggingface` |
| Xiaomi | `xiaomi` |
| Entrim | `entrim` |
| CoreWeave | `wandb` |
| LithosAI | `lithosai` |
| Meganova | `meganova` |
| Klavo AI | `klavo` |
| IO.NET | `io-net` |
| Hubris | `hubris` |
| UncensuredAI | `uncensuredai` |
| Tenstorrent | `tenstorrent` |
| JoinGonka | `joingonka` |
| Inference APIs | `inferenceapis` |
| ZenMux | `zenmux` |
| ClinePass | `cline-pass` |
| Aixy | `aixy` |
| Tinfoil | `tinfoil` |
| Phala | `phala` |
| STACKIT | `stackit` |
| Frequency | `frequency` |
| Perplexity | `perplexity` |
| ParalonCloud | `paraloncloud` |
| GraphN | `graphn` |
| Huawei Cloud MAAS | `huawei-maas` |
| Kenari | `kenari` |
| Modular | `modular` |
| Inception | `inception` |
| Verda | `verda` |
| Wallaby | `wallaby` |
| LMStudio | `lmstudio` |
| Inferris | `inferris` |
| RuAPI | `ruapi` |
| Opper | `opper` |
| AKI.IO | `aki-io` |
| Crusoe | `crusoe` |
| FastRouter | `fastrouter` |
| Nodecode | `nodecode` |
| Synthorai | `synthorai` |
| Infersia | `infersia` |
| ModelScope | `modelscope` |
| GreenPT | `greenpt` |
| Nvidia | `nvidia` |
| SandBase | `sandbase` |
| Azure | `azure` |
| Tencent Token Plan | `tencent-token-plan` |
| SiliconFlow | `siliconflow` |
| ProxyStacks Relay | `proxystacks` |
| Morph | `morph` |
| Fortytwo | `fortytwo` |
| Poe | `poe` |
| cheapllm.shop | `cheapllm` |
| KoRouter | `korouter` |
| HPC-AI | `hpc-ai` |
| SambaNova | `sambanova` |
| Kunavo | `kunavo` |
| nokeep | `nokeep` |
| SiliconFlow (China) | `siliconflow-cn` |
| Jad AI | `jad-ai` |
| Venice AI | `venice` |
| InferAll | `inferall` |
| Alibaba (China) | `alibaba-cn` |
| OVHcloud AI Endpoints | `ovhcloud` |
| DigitalOcean | `digitalocean` |
| Bumo Router | `bumo` |
| AbliteratedLLM | `abliteratedllm` |
| Xpersona | `xpersona` |
| SenseNova (China) | `sensenova` |
| ZeroGPU | `zerogpu` |
| Qiniu | `qiniu-ai` |
| Upstage | `upstage` |
| Atomic Chat | `atomic-chat` |
| Zro | `zro` |
| SOKKAN Router | `sokkan` |
| Outer Labs | `outerlabs` |
| Thinking Machines | `thinkingmachines` |
| EBCloud | `ebcloud` |
| Friendli | `friendli` |
| LLM Gateway | `llmgateway-providers` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Vercel AI Gateway | `vercel` |
| D.Run (China) | `drun` |
| Doubleword | `doubleword` |
| Pendra | `pendra` |
| Snowflake Cortex | `snowflake-cortex` |
| Auriko | `auriko` |
| Jiekou.AI | `jiekou` |
| Together AI | `togetherai` |
| stepping stone AG | `stepping-stone` |
| Google | `google` |
| Inceptron | `inceptron` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| klokintegration.se | `klokintegration` |
| OpenRouter | `openrouter` |
| Privatemode AI | `privatemode-ai` |
| FreeModel | `freemodel` |
| LongCat | `longcat` |
| Vispark | `vispark` |
| CheapestToken | `cheapest-token` |
| Standard Compute | `standardcompute` |
| Modelis | `modelis` |
| NeoSmith | `neosmith` |
| ainetcafe | `ainetcafe` |
| Vancine | `vancine` |
| GitLab Duo | `gitlab` |
| SAGG | `sagg` |
| DotHoosh | `dothoosh` |
| Lynkr | `lynkr` |
| LLM Tech | `llmtech` |
| Hetzner | `hetzner` |
| Rayline | `rayline` |
| CloudCode.ONE | `cloudcode` |
| Wally | `wally` |
| Neuralwatt | `neuralwatt` |
| Kitani | `kitani` |
| Kilo Gateway | `kilo` |
| APIKO | `apiko` |
| Deep Infra | `deepinfra` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| UplinkSwitch | `uplinkswitch` |
| Z.AI | `zai` |
| watsonx.ai | `watsonx` |
| Reflection | `reflection` |
| HUMAIN | `humain` |
| Chutes | `chutes` |
| Refuseless | `refuseless` |
| Ollama Cloud | `ollama-cloud` |
| Subconscious | `subconscious` |
| AIHubMix | `aihubmix` |
| SaladCloud AI Gateway | `salad-cloud` |
| TensorX | `tensorx` |
| AI/ML API | `aimlapi` |
| Eden AI | `edenai` |
| Munito AI | `munito` |
| Powerspring | `powerspring` |
| OpenAI | `openai` |
| SCNet Token Plan | `scnet-token-plan` |
| NEAR AI Cloud | `nearai` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Bothub | `bothub` |
| Scaleway | `scaleway` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Tencent TokenHub | `tencent-tokenhub` |
| TokenRouter | `tokenrouter` |
| Bee by HEOSSI | `bee` |
| Kosmik Compute | `kosmik` |
| JZSTOKEN | `jzstoken` |
| Teapot Router | `teapot-router` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Zhipu AI | `zhipuai` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Inco | `inco` |
| BytePlus ModelArk | `byteplus` |
| Agnes AI | `agnes` |
| Isoquant | `isoquant` |
| Prime Inference | `prime` |
| StepFun (China) | `stepfun` |
| AI21 Labs | `ai21` |
| AIGROW | `aigrow` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| RunInfra | `runinfra` |
| Echo | `echo` |
| EmpirioLabs AI | `empiriolabs` |
| LucidQuery | `lucidquery` |
| Wafer | `wafer.ai` |
| Volcengine Ark | `volcengine` |
| Meta | `meta` |
| Mistral | `mistral` |
| Anthropic | `anthropic` |
| Moneo | `moneo` |
| Moonshot AI (China) | `moonshotai-cn` |
| routing.run | `routing-run` |
| Tokenify | `tokenify` |
| Synthetic | `synthetic` |
| Databricks | `databricks` |
| Pareto by Unbiased | `unbiased` |
| TokenLab | `tokenlab` |
| 302.AI | `302ai` |
| Impossibl | `impossibl` |
| Oathbreaker AI | `oathbreaker` |
| DInference | `dinference` |
| Zeldoc | `zeldoc` |
| Ofox | `ofox` |
| OCI Generative AI | `oci` |
| AnonRouter | `anonrouter` |
| GMI Cloud | `gmicloud` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| submodel | `submodel` |
| Phase Router | `phase` |
| CoralBricks | `coralbricks` |
| Charm Hyper | `hyper` |
| CommandCode | `commandcode` |
| OpenReason | `openreason` |
| Modal | `modal` |
| Baseten | `baseten` |
| Runcrate | `runcrate` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Helicone | `helicone` |
| TokenGo | `tokengo` |
| xxapi | `xxapi` |
| DeepSeek | `deepseek` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| abliteration.ai | `abliteration-ai` |
| xAI | `xai` |
| Liquid Inference | `liquid` |
| Cohere | `cohere` |
| Inference Cooperative | `inference-coop` |
| superbot | `superbot-gg` |
| InferX | `inferx` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Novita AI | `novita-ai` |
| LLMTR | `llmtr` |
| Cortecs | `cortecs` |
| Vertex | `google-vertex` |
| Melious | `melious` |
| above.dev | `above` |
| Requesty | `requesty` |
| DaoXE | `daoxe` |
| Logits | `logits` |
| Neon | `neon` |
| OpenCode | `opencode` |
| LowRouter | `lowrouter` |
| Watt Cloud | `watt` |
| 50X | `fiftyx` |
| Confidential AI | `confidential-ai` |
| TeamoRouter | `teamorouter` |
| TokenWatt | `tokenwatt` |
| Perplexity Agent | `perplexity-agent` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Clarifai | `clarifai` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| cheapaimodel | `cheapaimodel` |
| Fireworks AI | `fireworks-ai` |
| Adaption | `adaption` |
| OrcaRouter | `orcarouter` |
| Autarcho | `autarcho` |
| Groq | `groq` |
| evroc | `evroc` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Amazon Bedrock | `amazon-bedrock` |
| SCX.ai | `scx-ai` |
| Mallard AI | `mallard` |
| SAP AI Core | `sap-ai-core` |
| Obscurify.ai | `obscurify` |
| NaN | `nan` |
| FrogBot | `frogbot` |
| CrossModel | `crossmodel` |
| Infomaniak | `infomaniak` |
| Ezkielyna | `ezkielyna` |
| Poolside | `poolside` |
| StepFun (Global) | `stepfun-ai` |
| Sakana AI | `sakana` |
| Arcee | `arcee` |
| CedarLLM | `cedarllm` |
| Umans AI | `umans-ai` |
| Moonshot AI | `moonshotai` |
| Unrestricted | `unrestricted` |
| GitHub Copilot | `github-copilot` |
| Hostinger Router | `hostinger-router` |
| SparrowCodes | `sparrowcodes` |
| MiniMax (minimax.io) | `minimax` |
| Pioneer | `pioneer` |
| Adzuki AI | `adzuki` |
| Infer by Flow7 | `infer` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| UnoRouter | `unorouter` |
| engy | `engy` |
| Mixlayer | `mixlayer` |
| Nova | `nova` |
| Claudinio | `claudinio` |
| Boundless | `boundless` |
| Hopper | `hopper` |
| Gisoo | `gisoo` |
| NanoGPT | `nano-gpt` |
| meraGPT | `meragpt` |
| AI-ROUTER | `ai-router` |
| Regolo AI | `regolo-ai` |
| Vivgrid | `vivgrid` |
| Munito AI (EU) | `munito-eu` |
| OpenCode Go | `opencode-go` |
| Nebius Token Factory | `nebius` |
<!-- PROVIDERS:END -->

## License

MIT
