# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**312 providers · 9475 models · Updated 2026-11-17**
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
| EmpirioLabs AI | `empiriolabs` |
| Inference Cooperative | `inference-coop` |
| LLM Gateway | `llmgateway-providers` |
| SAP AI Core | `sap-ai-core` |
| Munito AI | `munito` |
| klokintegration.se | `klokintegration` |
| Pareto Inference | `pareto` |
| LucidQuery | `lucidquery` |
| Teapot Router | `teapot-router` |
| StepFun (Global) | `stepfun-ai` |
| Keln | `keln` |
| Moonshot AI | `moonshotai` |
| SenseNova (China) | `sensenova` |
| Xiaomi | `xiaomi` |
| Entrim | `entrim` |
| MiniMax (minimax.io) | `minimax` |
| ZeroGPU | `zerogpu` |
| NeoSmith | `neosmith` |
| OrcaRouter | `orcarouter` |
| Alibaba (China) | `alibaba-cn` |
| SparrowCodes | `sparrowcodes` |
| LowRouter | `lowrouter` |
| Cerebras | `cerebras` |
| Vertex | `google-vertex` |
| cheapaimodel | `cheapaimodel` |
| Reflection | `reflection` |
| Echo | `echo` |
| superbot | `superbot-gg` |
| SandBase | `sandbase` |
| Logits | `logits` |
| TokenRouter | `tokenrouter` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Vercel AI Gateway | `vercel` |
| Eden AI | `edenai` |
| InferAll | `inferall` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Moonshot AI (China) | `moonshotai-cn` |
| DigitalOcean | `digitalocean` |
| Qiniu | `qiniu-ai` |
| nokeep | `nokeep` |
| SambaNova | `sambanova` |
| QVAC | `qvac` |
| Z.AI | `zai` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Hetzner | `hetzner` |
| Thinking Machines | `thinkingmachines` |
| engy | `engy` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| EBCloud | `ebcloud` |
| Aixy | `aixy` |
| SaladCloud AI Gateway | `salad-cloud` |
| Zhipu AI | `zhipuai` |
| Inference | `inference` |
| Upstage | `upstage` |
| Requesty | `requesty` |
| Vispark | `vispark` |
| Wafer | `wafer.ai` |
| Mallard AI | `mallard` |
| Poolside | `poolside` |
| OpenReason | `openreason` |
| Fireworks AI | `fireworks-ai` |
| Tinfoil | `tinfoil` |
| 302.AI | `302ai` |
| AIGROW | `aigrow` |
| xAI | `xai` |
| JoinGonka | `joingonka` |
| Hostinger Router | `hostinger-router` |
| Charm Hyper | `hyper` |
| Regolo AI | `regolo-ai` |
| Liquid Inference | `liquid` |
| DInference | `dinference` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| OCI Generative AI | `oci` |
| DotHoosh | `dothoosh` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Azure Cognitive Services | `azure-cognitive-services` |
| ainetcafe | `ainetcafe` |
| JZSTOKEN | `jzstoken` |
| Doubleword | `doubleword` |
| NanoGPT | `nano-gpt` |
| Bothub | `bothub` |
| Subconscious | `subconscious` |
| LithosAI | `lithosai` |
| Databricks | `databricks` |
| Anthropic | `anthropic` |
| NaN | `nan` |
| UncensuredAI | `uncensuredai` |
| Lynkr | `lynkr` |
| CloudCode.ONE | `cloudcode` |
| Auriko | `auriko` |
| Kosmik Compute | `kosmik` |
| Agnes AI | `agnes` |
| Chutes | `chutes` |
| cheapllm.shop | `cheapllm` |
| Inception | `inception` |
| STACKIT | `stackit` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Runcrate | `runcrate` |
| meraGPT | `meragpt` |
| Tencent TokenHub | `tencent-tokenhub` |
| Phase Router | `phase` |
| CheapestToken | `cheapest-token` |
| Mixlayer | `mixlayer` |
| TokenWatt | `tokenwatt` |
| Obscurify.ai | `obscurify` |
| GitLab Duo | `gitlab` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| IteraCompute | `iteracompute` |
| Adaption | `adaption` |
| IO.NET | `io-net` |
| Modular | `modular` |
| FreeModel | `freemodel` |
| ParalonCloud | `paraloncloud` |
| Standard Compute | `standardcompute` |
| AMD | `amd` |
| LLMTR | `llmtr` |
| AI-ROUTER | `ai-router` |
| UnoRouter | `unorouter` |
| BytePlus ModelArk | `byteplus` |
| Meta | `meta` |
| Amazon Bedrock | `amazon-bedrock` |
| Opper | `opper` |
| Nvidia | `nvidia` |
| Berget.AI | `berget` |
| Inference APIs | `inferenceapis` |
| Volcengine Ark | `volcengine` |
| Zeldoc | `zeldoc` |
| Vivgrid | `vivgrid` |
| Verda | `verda` |
| OpenRouter | `openrouter` |
| Confidential AI | `confidential-ai` |
| CommandCode | `commandcode` |
| AbliteratedLLM | `abliteratedllm` |
| OpenCode Go | `opencode-go` |
| GreenPT | `greenpt` |
| Watt Cloud | `watt` |
| Alibaba | `alibaba` |
| Ofox | `ofox` |
| HPC-AI | `hpc-ai` |
| Klavo AI | `klavo` |
| Inceptron | `inceptron` |
| Jad AI | `jad-ai` |
| submodel | `submodel` |
| Friendli | `friendli` |
| AI21 Labs | `ai21` |
| Synthetic | `synthetic` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Vancine | `vancine` |
| Kenari | `kenari` |
| Perplexity | `perplexity` |
| Zro | `zro` |
| Zenifra | `zenifra` |
| Outer Labs | `outerlabs` |
| FrogBot | `frogbot` |
| SiliconFlow (China) | `siliconflow-cn` |
| Powerspring | `powerspring` |
| Perplexity Agent | `perplexity-agent` |
| Ollama Cloud | `ollama-cloud` |
| Sarvam AI | `sarvam` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Hopper | `hopper` |
| CoralBricks | `coralbricks` |
| Xpersona | `xpersona` |
| InferX | `inferx` |
| GraphN | `graphn` |
| Pareto by Unbiased | `unbiased` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Frequency | `frequency` |
| Moneo | `moneo` |
| Sakana AI | `sakana` |
| Helicone | `helicone` |
| Tokenify | `tokenify` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| AI/ML API | `aimlapi` |
| Groq | `groq` |
| Impossibl | `impossibl` |
| Claudinio | `claudinio` |
| AI Power Grid | `aipg` |
| Umans AI | `umans-ai` |
| Google | `google` |
| Cortecs | `cortecs` |
| Baseten | `baseten` |
| ModelScope | `modelscope` |
| Ezkielyna | `ezkielyna` |
| Munito AI (EU) | `munito-eu` |
| Inferris | `inferris` |
| Atomic Chat | `atomic-chat` |
| CoreWeave | `wandb` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Crusoe | `crusoe` |
| ProxyStacks Relay | `proxystacks` |
| Nova | `nova` |
| Nebius Token Factory | `nebius` |
| Z.AI Coding Plan | `zai-coding-plan` |
| RunInfra | `runinfra` |
| TheRouter | `therouter` |
| OpenCode | `opencode` |
| TensorX | `tensorx` |
| Abacus | `abacus` |
| SAGG | `sagg` |
| Moark | `moark` |
| DevPass (LLM Gateway) | `llmgateway` |
| Bumo Router | `bumo` |
| Autarcho | `autarcho` |
| CrossModel | `crossmodel` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Wally | `wally` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| RuAPI | `ruapi` |
| Huawei Cloud MAAS | `huawei-maas` |
| evroc | `evroc` |
| AIHubMix | `aihubmix` |
| Merge Gateway | `merge-gateway` |
| Kunavo | `kunavo` |
| Refuseless | `refuseless` |
| DeepSeek | `deepseek` |
| OVHcloud AI Endpoints | `ovhcloud` |
| DaoXE | `daoxe` |
| AnonRouter | `anonrouter` |
| watsonx.ai | `watsonx` |
| Inco | `inco` |
| Fortytwo | `fortytwo` |
| Kilo Gateway | `kilo` |
| CedarLLM | `cedarllm` |
| HUMAIN | `humain` |
| Deep Infra | `deepinfra` |
| APIKO | `apiko` |
| Neon | `neon` |
| Tencent Token Plan | `tencent-token-plan` |
| stepping stone AG | `stepping-stone` |
| GitHub Copilot | `github-copilot` |
| GMI Cloud | `gmicloud` |
| Pendra | `pendra` |
| TokenLab | `tokenlab` |
| Hugging Face | `huggingface` |
| Gisoo | `gisoo` |
| Modal | `modal` |
| SiliconFlow | `siliconflow` |
| Venice AI | `venice` |
| xxapi | `xxapi` |
| SOKKAN Router | `sokkan` |
| Infomaniak | `infomaniak` |
| Oathbreaker AI | `oathbreaker` |
| Infersia | `infersia` |
| Jalapeno Cloud | `jalapeno` |
| ai& | `aiand` |
| Meganova | `meganova` |
| Modelis | `modelis` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Cohere | `cohere` |
| Alibaba Token Plan | `alibaba-token-plan` |
| FastRouter | `fastrouter` |
| abliteration.ai | `abliteration-ai` |
| Augure | `augure` |
| Wallaby | `wallaby` |
| Isoquant | `isoquant` |
| Pioneer | `pioneer` |
| Phala | `phala` |
| Adzuki AI | `adzuki` |
| routing.run | `routing-run` |
| Bailing | `bailing` |
| Arcee | `arcee` |
| Morph | `morph` |
| Tenstorrent | `tenstorrent` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Poe | `poe` |
| Together AI | `togetherai` |
| SCX.ai | `scx-ai` |
| LLM Tech | `llmtech` |
| Unrestricted | `unrestricted` |
| Synthorai | `synthorai` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Privatemode AI | `privatemode-ai` |
| Nodecode | `nodecode` |
| Melious | `melious` |
| AKI.IO | `aki-io` |
| Mistral | `mistral` |
| TeamoRouter | `teamorouter` |
| Clarifai | `clarifai` |
| LMStudio | `lmstudio` |
| D.Run (China) | `drun` |
| Prime Inference | `prime` |
| 50X | `fiftyx` |
| Infer by Flow7 | `infer` |
| LongCat | `longcat` |
| Lyceum | `lyceum` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Scaleway | `scaleway` |
| OpenAI | `openai` |
| ClinePass | `cline-pass` |
| QiHang | `qihang-ai` |
| SCNet Token Plan | `scnet-token-plan` |
| UplinkSwitch | `uplinkswitch` |
| Novita AI | `novita-ai` |
| above.dev | `above` |
| Kitani | `kitani` |
| Jiekou.AI | `jiekou` |
| NEAR AI Cloud | `nearai` |
| Bee by HEOSSI | `bee` |
| Vultr | `vultr` |
| TokenGo | `tokengo` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Azure | `azure` |
| Hubris | `hubris` |
| Rayline | `rayline` |
| Neuralwatt | `neuralwatt` |
| Snowflake Cortex | `snowflake-cortex` |
| ZenMux | `zenmux` |
| Boundless | `boundless` |
| Ambient | `ambient` |
| KoRouter | `korouter` |
| StepFun (China) | `stepfun` |
<!-- PROVIDERS:END -->

## License

MIT
