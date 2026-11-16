# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**312 providers · 9439 models · Updated 2026-11-16**
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
| OCI Generative AI | `oci` |
| OpenReason | `openreason` |
| Verda | `verda` |
| Mixlayer | `mixlayer` |
| Powerspring | `powerspring` |
| Zeldoc | `zeldoc` |
| ZenMux | `zenmux` |
| Zenifra | `zenifra` |
| Poe | `poe` |
| Atomic Chat | `atomic-chat` |
| Mistral | `mistral` |
| Nvidia | `nvidia` |
| Groq | `groq` |
| Poolside | `poolside` |
| Frequency | `frequency` |
| Alibaba (China) | `alibaba-cn` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Confidential AI | `confidential-ai` |
| IO.NET | `io-net` |
| Ambient | `ambient` |
| GitLab Duo | `gitlab` |
| Agnes AI | `agnes` |
| Munito AI (EU) | `munito-eu` |
| LLMTR | `llmtr` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Novita AI | `novita-ai` |
| Runcrate | `runcrate` |
| CommandCode | `commandcode` |
| Fireworks AI | `fireworks-ai` |
| UncensuredAI | `uncensuredai` |
| Adzuki AI | `adzuki` |
| GreenPT | `greenpt` |
| AMD | `amd` |
| FastRouter | `fastrouter` |
| Berget.AI | `berget` |
| Oathbreaker AI | `oathbreaker` |
| Meta | `meta` |
| StepFun (Global) | `stepfun-ai` |
| ModelScope | `modelscope` |
| TensorX | `tensorx` |
| Gisoo | `gisoo` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| BytePlus ModelArk | `byteplus` |
| Kosmik Compute | `kosmik` |
| Jiekou.AI | `jiekou` |
| GitHub Copilot | `github-copilot` |
| Ezkielyna | `ezkielyna` |
| Impossibl | `impossibl` |
| LongCat | `longcat` |
| Meganova | `meganova` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Nova | `nova` |
| Inferris | `inferris` |
| Entrim | `entrim` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Auriko | `auriko` |
| SandBase | `sandbase` |
| Huawei Cloud MAAS | `huawei-maas` |
| Boundless | `boundless` |
| Ofox | `ofox` |
| Wally | `wally` |
| InferAll | `inferall` |
| TokenRouter | `tokenrouter` |
| Rayline | `rayline` |
| Hubris | `hubris` |
| Baseten | `baseten` |
| Hugging Face | `huggingface` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Inference | `inference` |
| CloudCode.ONE | `cloudcode` |
| ainetcafe | `ainetcafe` |
| Tenstorrent | `tenstorrent` |
| routing.run | `routing-run` |
| Cortecs | `cortecs` |
| Tencent TokenHub | `tencent-tokenhub` |
| Mallard AI | `mallard` |
| Sakana AI | `sakana` |
| Databricks | `databricks` |
| AbliteratedLLM | `abliteratedllm` |
| Thinking Machines | `thinkingmachines` |
| Moonshot AI | `moonshotai` |
| Vivgrid | `vivgrid` |
| ParalonCloud | `paraloncloud` |
| OpenRouter | `openrouter` |
| Perplexity | `perplexity` |
| meraGPT | `meragpt` |
| SiliconFlow | `siliconflow` |
| Isoquant | `isoquant` |
| Amazon Bedrock | `amazon-bedrock` |
| QVAC | `qvac` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Wallaby | `wallaby` |
| watsonx.ai | `watsonx` |
| SenseNova (China) | `sensenova` |
| Klavo AI | `klavo` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Liquid Inference | `liquid` |
| Doubleword | `doubleword` |
| LMStudio | `lmstudio` |
| Vispark | `vispark` |
| Anthropic | `anthropic` |
| Claudinio | `claudinio` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Alibaba | `alibaba` |
| TokenLab | `tokenlab` |
| TokenGo | `tokengo` |
| AI/ML API | `aimlapi` |
| CoralBricks | `coralbricks` |
| Pioneer | `pioneer` |
| SOKKAN Router | `sokkan` |
| SiliconFlow (China) | `siliconflow-cn` |
| Neuralwatt | `neuralwatt` |
| Autarcho | `autarcho` |
| Neon | `neon` |
| CoreWeave | `wandb` |
| Arcee | `arcee` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Inceptron | `inceptron` |
| Azure | `azure` |
| Teapot Router | `teapot-router` |
| D.Run (China) | `drun` |
| Bumo Router | `bumo` |
| RunInfra | `runinfra` |
| DigitalOcean | `digitalocean` |
| Eden AI | `edenai` |
| AKI.IO | `aki-io` |
| Inco | `inco` |
| Charm Hyper | `hyper` |
| RuAPI | `ruapi` |
| Z.AI | `zai` |
| OpenCode | `opencode` |
| AnonRouter | `anonrouter` |
| EmpirioLabs AI | `empiriolabs` |
| Helicone | `helicone` |
| InferX | `inferx` |
| Clarifai | `clarifai` |
| Upstage | `upstage` |
| AIGROW | `aigrow` |
| Scaleway | `scaleway` |
| superbot | `superbot-gg` |
| SCX.ai | `scx-ai` |
| Infomaniak | `infomaniak` |
| evroc | `evroc` |
| CrossModel | `crossmodel` |
| Morph | `morph` |
| Regolo AI | `regolo-ai` |
| Tinfoil | `tinfoil` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Kilo Gateway | `kilo` |
| Nebius Token Factory | `nebius` |
| LLM Tech | `llmtech` |
| NeoSmith | `neosmith` |
| abliteration.ai | `abliteration-ai` |
| Logits | `logits` |
| Reflection | `reflection` |
| Adaption | `adaption` |
| Vultr | `vultr` |
| Kenari | `kenari` |
| xxapi | `xxapi` |
| Tencent Token Plan | `tencent-token-plan` |
| Snowflake Cortex | `snowflake-cortex` |
| Outer Labs | `outerlabs` |
| ClinePass | `cline-pass` |
| Together AI | `togetherai` |
| HPC-AI | `hpc-ai` |
| Bee by HEOSSI | `bee` |
| Inception | `inception` |
| Refuseless | `refuseless` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| NanoGPT | `nano-gpt` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| STACKIT | `stackit` |
| Bailing | `bailing` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Merge Gateway | `merge-gateway` |
| Privatemode AI | `privatemode-ai` |
| Chutes | `chutes` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Keln | `keln` |
| StepFun (China) | `stepfun` |
| Perplexity Agent | `perplexity-agent` |
| Inference APIs | `inferenceapis` |
| Requesty | `requesty` |
| Hopper | `hopper` |
| Wafer | `wafer.ai` |
| 50X | `fiftyx` |
| klokintegration.se | `klokintegration` |
| ai& | `aiand` |
| SAP AI Core | `sap-ai-core` |
| Vancine | `vancine` |
| DotHoosh | `dothoosh` |
| GraphN | `graphn` |
| Opper | `opper` |
| Watt Cloud | `watt` |
| Zro | `zro` |
| Cerebras | `cerebras` |
| Standard Compute | `standardcompute` |
| Jalapeno Cloud | `jalapeno` |
| engy | `engy` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Zhipu AI | `zhipuai` |
| Aixy | `aixy` |
| Moonshot AI (China) | `moonshotai-cn` |
| Modular | `modular` |
| Vertex | `google-vertex` |
| Phala | `phala` |
| UplinkSwitch | `uplinkswitch` |
| QiHang | `qihang-ai` |
| OrcaRouter | `orcarouter` |
| Volcengine Ark | `volcengine` |
| Munito AI | `munito` |
| Deep Infra | `deepinfra` |
| Hetzner | `hetzner` |
| Modal | `modal` |
| SambaNova | `sambanova` |
| DeepSeek | `deepseek` |
| HUMAIN | `humain` |
| NEAR AI Cloud | `nearai` |
| Bothub | `bothub` |
| ZeroGPU | `zerogpu` |
| NaN | `nan` |
| Infersia | `infersia` |
| stepping stone AG | `stepping-stone` |
| Moark | `moark` |
| Augure | `augure` |
| Crusoe | `crusoe` |
| Moneo | `moneo` |
| Synthetic | `synthetic` |
| OpenCode Go | `opencode-go` |
| Xiaomi | `xiaomi` |
| JoinGonka | `joingonka` |
| AI-ROUTER | `ai-router` |
| OVHcloud AI Endpoints | `ovhcloud` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| DInference | `dinference` |
| TokenWatt | `tokenwatt` |
| Tokenify | `tokenify` |
| Prime Inference | `prime` |
| Sarvam AI | `sarvam` |
| Kunavo | `kunavo` |
| LowRouter | `lowrouter` |
| Infer by Flow7 | `infer` |
| DevPass (LLM Gateway) | `llmgateway` |
| FrogBot | `frogbot` |
| SCNet Token Plan | `scnet-token-plan` |
| Ollama Cloud | `ollama-cloud` |
| APIKO | `apiko` |
| Kitani | `kitani` |
| DaoXE | `daoxe` |
| Google | `google` |
| above.dev | `above` |
| Fortytwo | `fortytwo` |
| Venice AI | `venice` |
| Synthorai | `synthorai` |
| AIHubMix | `aihubmix` |
| CheapestToken | `cheapest-token` |
| Lyceum | `lyceum` |
| Pendra | `pendra` |
| OpenAI | `openai` |
| Alibaba Token Plan | `alibaba-token-plan` |
| LucidQuery | `lucidquery` |
| 302.AI | `302ai` |
| cheapllm.shop | `cheapllm` |
| EBCloud | `ebcloud` |
| Melious | `melious` |
| SaladCloud AI Gateway | `salad-cloud` |
| Xpersona | `xpersona` |
| submodel | `submodel` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| IteraCompute | `iteracompute` |
| Qiniu | `qiniu-ai` |
| Obscurify.ai | `obscurify` |
| JZSTOKEN | `jzstoken` |
| LLM Gateway | `llmgateway-providers` |
| SparrowCodes | `sparrowcodes` |
| TheRouter | `therouter` |
| Echo | `echo` |
| Subconscious | `subconscious` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Pareto Inference | `pareto` |
| ProxyStacks Relay | `proxystacks` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Umans AI | `umans-ai` |
| TeamoRouter | `teamorouter` |
| Cohere | `cohere` |
| LithosAI | `lithosai` |
| FreeModel | `freemodel` |
| KoRouter | `korouter` |
| Phase Router | `phase` |
| Jad AI | `jad-ai` |
| Hostinger Router | `hostinger-router` |
| GMI Cloud | `gmicloud` |
| Unrestricted | `unrestricted` |
| xAI | `xai` |
| Lynkr | `lynkr` |
| Vercel AI Gateway | `vercel` |
| CedarLLM | `cedarllm` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Inference Cooperative | `inference-coop` |
| Modelis | `modelis` |
| nokeep | `nokeep` |
| Friendli | `friendli` |
| Pareto by Unbiased | `unbiased` |
| Nodecode | `nodecode` |
| SAGG | `sagg` |
| MiniMax (minimax.io) | `minimax` |
| cheapaimodel | `cheapaimodel` |
| UnoRouter | `unorouter` |
| Abacus | `abacus` |
| AI21 Labs | `ai21` |
| AI Power Grid | `aipg` |
<!-- PROVIDERS:END -->

## License

MIT
