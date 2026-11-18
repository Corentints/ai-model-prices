# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**312 providers · 9530 models · Updated 2026-11-18**
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
| AI-ROUTER | `ai-router` |
| Cortecs | `cortecs` |
| Fireworks AI | `fireworks-ai` |
| SaladCloud AI Gateway | `salad-cloud` |
| Munito AI (EU) | `munito-eu` |
| AIGROW | `aigrow` |
| SCNet Token Plan | `scnet-token-plan` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Scaleway | `scaleway` |
| Inceptron | `inceptron` |
| Google | `google` |
| Amazon Bedrock | `amazon-bedrock` |
| Privatemode AI | `privatemode-ai` |
| Huawei Cloud MAAS | `huawei-maas` |
| Zro | `zro` |
| OpenAI | `openai` |
| UncensuredAI | `uncensuredai` |
| Pioneer | `pioneer` |
| Tencent Token Plan | `tencent-token-plan` |
| Merge Gateway | `merge-gateway` |
| AI Power Grid | `aipg` |
| Wally | `wally` |
| Agnes AI | `agnes` |
| ai& | `aiand` |
| SOKKAN Router | `sokkan` |
| Synthorai | `synthorai` |
| Tokenify | `tokenify` |
| Phala | `phala` |
| Cohere | `cohere` |
| LucidQuery | `lucidquery` |
| Kilo Gateway | `kilo` |
| Doubleword | `doubleword` |
| Regolo AI | `regolo-ai` |
| Ezkielyna | `ezkielyna` |
| Inception | `inception` |
| Perplexity Agent | `perplexity-agent` |
| Vancine | `vancine` |
| Mallard AI | `mallard` |
| superbot | `superbot-gg` |
| Mixlayer | `mixlayer` |
| Reflection | `reflection` |
| Jalapeno Cloud | `jalapeno` |
| HUMAIN | `humain` |
| Frequency | `frequency` |
| Wafer | `wafer.ai` |
| Melious | `melious` |
| AnonRouter | `anonrouter` |
| Charm Hyper | `hyper` |
| Tenstorrent | `tenstorrent` |
| Lyceum | `lyceum` |
| Opper | `opper` |
| Kosmik Compute | `kosmik` |
| ZeroGPU | `zerogpu` |
| Thinking Machines | `thinkingmachines` |
| DevPass (LLM Gateway) | `llmgateway` |
| Vertex | `google-vertex` |
| DigitalOcean | `digitalocean` |
| Hostinger Router | `hostinger-router` |
| Standard Compute | `standardcompute` |
| watsonx.ai | `watsonx` |
| Ambient | `ambient` |
| xxapi | `xxapi` |
| Deep Infra | `deepinfra` |
| cheapllm.shop | `cheapllm` |
| Pareto by Unbiased | `unbiased` |
| Ofox | `ofox` |
| Augure | `augure` |
| engy | `engy` |
| STACKIT | `stackit` |
| CoreWeave | `wandb` |
| Atomic Chat | `atomic-chat` |
| Keln | `keln` |
| Nodecode | `nodecode` |
| Meta | `meta` |
| Unrestricted | `unrestricted` |
| OpenRouter | `openrouter` |
| Bothub | `bothub` |
| Teapot Router | `teapot-router` |
| SparrowCodes | `sparrowcodes` |
| Wallaby | `wallaby` |
| LLM Gateway | `llmgateway-providers` |
| Databricks | `databricks` |
| AMD | `amd` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Cerebras | `cerebras` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Impossibl | `impossibl` |
| SandBase | `sandbase` |
| APIKO | `apiko` |
| Hetzner | `hetzner` |
| GitLab Duo | `gitlab` |
| Groq | `groq` |
| QiHang | `qihang-ai` |
| TokenLab | `tokenlab` |
| SiliconFlow (China) | `siliconflow-cn` |
| Refuseless | `refuseless` |
| JZSTOKEN | `jzstoken` |
| Xiaomi | `xiaomi` |
| StepFun (Global) | `stepfun-ai` |
| TeamoRouter | `teamorouter` |
| Pareto Inference | `pareto` |
| Gisoo | `gisoo` |
| TheRouter | `therouter` |
| Requesty | `requesty` |
| Baseten | `baseten` |
| Azure | `azure` |
| ParalonCloud | `paraloncloud` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| ainetcafe | `ainetcafe` |
| SCX.ai | `scx-ai` |
| Prime Inference | `prime` |
| klokintegration.se | `klokintegration` |
| Inference | `inference` |
| Clarifai | `clarifai` |
| Subconscious | `subconscious` |
| Watt Cloud | `watt` |
| Bumo Router | `bumo` |
| Entrim | `entrim` |
| Xpersona | `xpersona` |
| ModelScope | `modelscope` |
| Zeldoc | `zeldoc` |
| Kenari | `kenari` |
| Neuralwatt | `neuralwatt` |
| nokeep | `nokeep` |
| Helicone | `helicone` |
| Nova | `nova` |
| Runcrate | `runcrate` |
| Morph | `morph` |
| CoralBricks | `coralbricks` |
| Crusoe | `crusoe` |
| SAGG | `sagg` |
| FastRouter | `fastrouter` |
| Z.AI Coding Plan | `zai-coding-plan` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| GitHub Copilot | `github-copilot` |
| Infomaniak | `infomaniak` |
| xAI | `xai` |
| DotHoosh | `dothoosh` |
| Qiniu | `qiniu-ai` |
| Obscurify.ai | `obscurify` |
| Vercel AI Gateway | `vercel` |
| CrossModel | `crossmodel` |
| CloudCode.ONE | `cloudcode` |
| EmpirioLabs AI | `empiriolabs` |
| Abacus | `abacus` |
| Vivgrid | `vivgrid` |
| OrcaRouter | `orcarouter` |
| Echo | `echo` |
| InferAll | `inferall` |
| Chutes | `chutes` |
| Ollama Cloud | `ollama-cloud` |
| Venice AI | `venice` |
| Pendra | `pendra` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Sakana AI | `sakana` |
| Phase Router | `phase` |
| AbliteratedLLM | `abliteratedllm` |
| TokenGo | `tokengo` |
| Claudinio | `claudinio` |
| Zhipu AI | `zhipuai` |
| NeoSmith | `neosmith` |
| NEAR AI Cloud | `nearai` |
| above.dev | `above` |
| ProxyStacks Relay | `proxystacks` |
| Boundless | `boundless` |
| Moneo | `moneo` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| QVAC | `qvac` |
| LithosAI | `lithosai` |
| Poe | `poe` |
| Outer Labs | `outerlabs` |
| Z.AI | `zai` |
| Klavo AI | `klavo` |
| submodel | `submodel` |
| Alibaba (China) | `alibaba-cn` |
| Vultr | `vultr` |
| DeepSeek | `deepseek` |
| Jiekou.AI | `jiekou` |
| Oathbreaker AI | `oathbreaker` |
| InferX | `inferx` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Inference APIs | `inferenceapis` |
| Hopper | `hopper` |
| Inferris | `inferris` |
| OCI Generative AI | `oci` |
| Isoquant | `isoquant` |
| Nvidia | `nvidia` |
| cheapaimodel | `cheapaimodel` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Sarvam AI | `sarvam` |
| RuAPI | `ruapi` |
| IteraCompute | `iteracompute` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| TensorX | `tensorx` |
| Confidential AI | `confidential-ai` |
| NanoGPT | `nano-gpt` |
| HPC-AI | `hpc-ai` |
| AIHubMix | `aihubmix` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| UnoRouter | `unorouter` |
| Liquid Inference | `liquid` |
| GraphN | `graphn` |
| Infer by Flow7 | `infer` |
| NaN | `nan` |
| OpenCode | `opencode` |
| LongCat | `longcat` |
| Neon | `neon` |
| MiniMax (minimax.io) | `minimax` |
| Nebius Token Factory | `nebius` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Anthropic | `anthropic` |
| CedarLLM | `cedarllm` |
| Tencent TokenHub | `tencent-tokenhub` |
| Modular | `modular` |
| Autarcho | `autarcho` |
| Jad AI | `jad-ai` |
| Kitani | `kitani` |
| Arcee | `arcee` |
| CheapestToken | `cheapest-token` |
| Together AI | `togetherai` |
| Tinfoil | `tinfoil` |
| JoinGonka | `joingonka` |
| Moonshot AI (China) | `moonshotai-cn` |
| Verda | `verda` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Adzuki AI | `adzuki` |
| RunInfra | `runinfra` |
| Perplexity | `perplexity` |
| Modelis | `modelis` |
| Mistral | `mistral` |
| BytePlus ModelArk | `byteplus` |
| GreenPT | `greenpt` |
| Snowflake Cortex | `snowflake-cortex` |
| 50X | `fiftyx` |
| Poolside | `poolside` |
| ClinePass | `cline-pass` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Moark | `moark` |
| Volcengine Ark | `volcengine` |
| Alibaba Token Plan | `alibaba-token-plan` |
| ZenMux | `zenmux` |
| Eden AI | `edenai` |
| Inference Cooperative | `inference-coop` |
| Lynkr | `lynkr` |
| SambaNova | `sambanova` |
| SAP AI Core | `sap-ai-core` |
| TokenRouter | `tokenrouter` |
| Infersia | `infersia` |
| SenseNova (China) | `sensenova` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| LLMTR | `llmtr` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Powerspring | `powerspring` |
| Hubris | `hubris` |
| Berget.AI | `berget` |
| Rayline | `rayline` |
| abliteration.ai | `abliteration-ai` |
| Novita AI | `novita-ai` |
| Adaption | `adaption` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Bee by HEOSSI | `bee` |
| EBCloud | `ebcloud` |
| Hugging Face | `huggingface` |
| Synthetic | `synthetic` |
| 302.AI | `302ai` |
| FreeModel | `freemodel` |
| Umans AI | `umans-ai` |
| OpenReason | `openreason` |
| Munito AI | `munito` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| MiniMax (minimax.cn) | `minimax-cn` |
| IO.NET | `io-net` |
| AKI.IO | `aki-io` |
| FrogBot | `frogbot` |
| evroc | `evroc` |
| Alibaba | `alibaba` |
| UplinkSwitch | `uplinkswitch` |
| Inco | `inco` |
| Vispark | `vispark` |
| CommandCode | `commandcode` |
| D.Run (China) | `drun` |
| Logits | `logits` |
| DInference | `dinference` |
| Meganova | `meganova` |
| Modal | `modal` |
| Auriko | `auriko` |
| Friendli | `friendli` |
| OpenCode Go | `opencode-go` |
| routing.run | `routing-run` |
| stepping stone AG | `stepping-stone` |
| meraGPT | `meragpt` |
| SiliconFlow | `siliconflow` |
| Upstage | `upstage` |
| AI21 Labs | `ai21` |
| Moonshot AI | `moonshotai` |
| StepFun (China) | `stepfun` |
| Zenifra | `zenifra` |
| Bailing | `bailing` |
| DaoXE | `daoxe` |
| AI/ML API | `aimlapi` |
| Fortytwo | `fortytwo` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Aixy | `aixy` |
| LLM Tech | `llmtech` |
| LMStudio | `lmstudio` |
| KoRouter | `korouter` |
| LowRouter | `lowrouter` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Kunavo | `kunavo` |
| GMI Cloud | `gmicloud` |
| TokenWatt | `tokenwatt` |
<!-- PROVIDERS:END -->

## License

MIT
