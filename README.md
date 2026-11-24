# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**314 providers · 9739 models · Updated 2026-11-24**
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
| Auriko | `auriko` |
| Oathbreaker AI | `oathbreaker` |
| Thinking Machines | `thinkingmachines` |
| Tencent Token Plan | `tencent-token-plan` |
| Refuseless | `refuseless` |
| GreenPT | `greenpt` |
| SiliconFlow | `siliconflow` |
| Fortytwo | `fortytwo` |
| Modular | `modular` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| klokintegration.se | `klokintegration` |
| cheapllm.shop | `cheapllm` |
| watsonx.ai | `watsonx` |
| InferX | `inferx` |
| CloudCode.ONE | `cloudcode` |
| Google | `google` |
| CrossModel | `crossmodel` |
| Tokenify | `tokenify` |
| Melious | `melious` |
| Atomic Chat | `atomic-chat` |
| ZeroGPU | `zerogpu` |
| AI-ROUTER | `ai-router` |
| Moark | `moark` |
| evroc | `evroc` |
| Charm Hyper | `hyper` |
| Chutes | `chutes` |
| ProxyStacks Relay | `proxystacks` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Inco | `inco` |
| Huawei Cloud MAAS | `huawei-maas` |
| TokenGo | `tokengo` |
| Neon | `neon` |
| OpenCode | `opencode` |
| Kitani | `kitani` |
| Mixlayer | `mixlayer` |
| superbot | `superbot-gg` |
| TokenWatt | `tokenwatt` |
| Wafer | `wafer.ai` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| OpenRouter | `openrouter` |
| Kenari | `kenari` |
| SandBase | `sandbase` |
| Concentrate | `concentrate` |
| Nova | `nova` |
| Outer Labs | `outerlabs` |
| Lynkr | `lynkr` |
| LLM Gateway | `llmgateway-providers` |
| Keln | `keln` |
| NaN | `nan` |
| 50X | `fiftyx` |
| JZSTOKEN | `jzstoken` |
| TheRouter | `therouter` |
| TokenRouter | `tokenrouter` |
| Pareto Inference | `pareto` |
| above.dev | `above` |
| OpenReason | `openreason` |
| Verda | `verda` |
| Umans AI | `umans-ai` |
| Boundless | `boundless` |
| engy | `engy` |
| Inference APIs | `inferenceapis` |
| TensorX | `tensorx` |
| Novita AI | `novita-ai` |
| Xiaomi | `xiaomi` |
| Upstage | `upstage` |
| UnoRouter | `unorouter` |
| Munito AI | `munito` |
| Infomaniak | `infomaniak` |
| Databricks | `databricks` |
| DotHoosh | `dothoosh` |
| Baseten | `baseten` |
| SiliconFlow (China) | `siliconflow-cn` |
| Agnes AI | `agnes` |
| Tenstorrent | `tenstorrent` |
| Zeldoc | `zeldoc` |
| Modal | `modal` |
| Echo | `echo` |
| Jalapeno Cloud | `jalapeno` |
| Logits | `logits` |
| Obscurify.ai | `obscurify` |
| Phase Router | `phase` |
| Adzuki AI | `adzuki` |
| Requesty | `requesty` |
| CoralBricks | `coralbricks` |
| Cerebras | `cerebras` |
| Merge Gateway | `merge-gateway` |
| Sakana AI | `sakana` |
| FastRouter | `fastrouter` |
| Sarvam AI | `sarvam` |
| Tinfoil | `tinfoil` |
| Moneo | `moneo` |
| Hetzner | `hetzner` |
| FrogBot | `frogbot` |
| Poe | `poe` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Gisoo | `gisoo` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| TokenLab | `tokenlab` |
| Venice AI | `venice` |
| Vultr | `vultr` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| GraphN | `graphn` |
| Prime Inference | `prime` |
| Alibaba | `alibaba` |
| Adaption | `adaption` |
| STACKIT | `stackit` |
| Morph | `morph` |
| Inference | `inference` |
| HPC-AI | `hpc-ai` |
| Synthetic | `synthetic` |
| Zhipu AI | `zhipuai` |
| NEAR AI Cloud | `nearai` |
| CommandCode | `commandcode` |
| abliteration.ai | `abliteration-ai` |
| HUMAIN | `humain` |
| Wallaby | `wallaby` |
| StepFun (Global) | `stepfun-ai` |
| Meganova | `meganova` |
| BytePlus ModelArk | `byteplus` |
| Confidential AI | `confidential-ai` |
| Klavo AI | `klavo` |
| Pareto by Unbiased | `unbiased` |
| GMI Cloud | `gmicloud` |
| OpenAI | `openai` |
| Eden AI | `edenai` |
| Amazon Bedrock | `amazon-bedrock` |
| UplinkSwitch | `uplinkswitch` |
| NanoGPT | `nano-gpt` |
| KoRouter | `korouter` |
| APIKO | `apiko` |
| CoreWeave | `wandb` |
| Rayline | `rayline` |
| Bothub | `bothub` |
| Vercel AI Gateway | `vercel` |
| Helicone | `helicone` |
| ModelScope | `modelscope` |
| Inferris | `inferris` |
| EBCloud | `ebcloud` |
| InferAll | `inferall` |
| AI21 Labs | `ai21` |
| Pendra | `pendra` |
| xxapi | `xxapi` |
| Tencent TokenHub | `tencent-tokenhub` |
| Anthropic | `anthropic` |
| DevPass (LLM Gateway) | `llmgateway` |
| SambaNova | `sambanova` |
| stepping stone AG | `stepping-stone` |
| Regolo AI | `regolo-ai` |
| Bailing | `bailing` |
| Teapot Router | `teapot-router` |
| LLM Tech | `llmtech` |
| SparrowCodes | `sparrowcodes` |
| Vancine | `vancine` |
| Doubleword | `doubleword` |
| Ollama Cloud | `ollama-cloud` |
| Nebius Token Factory | `nebius` |
| AI Power Grid | `aipg` |
| Abacus | `abacus` |
| cheapaimodel | `cheapaimodel` |
| Inference Cooperative | `inference-coop` |
| Kunavo | `kunavo` |
| DigitalOcean | `digitalocean` |
| MiniMax (minimax.io) | `minimax` |
| Infer by Flow7 | `infer` |
| Lyceum | `lyceum` |
| nokeep | `nokeep` |
| DeepSeek | `deepseek` |
| JoinGonka | `joingonka` |
| Hopper | `hopper` |
| Qiniu | `qiniu-ai` |
| Zro | `zro` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Cortecs | `cortecs` |
| Xpersona | `xpersona` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| ai& | `aiand` |
| RunInfra | `runinfra` |
| AIHubMix | `aihubmix` |
| GitLab Duo | `gitlab` |
| SOKKAN Router | `sokkan` |
| Synthorai | `synthorai` |
| Fireworks AI | `fireworks-ai` |
| Subconscious | `subconscious` |
| Pioneer | `pioneer` |
| Nodecode | `nodecode` |
| LowRouter | `lowrouter` |
| AMD | `amd` |
| LongCat | `longcat` |
| Hubris | `hubris` |
| AI/ML API | `aimlapi` |
| Bumo Router | `bumo` |
| SAGG | `sagg` |
| Mallard AI | `mallard` |
| Scaleway | `scaleway` |
| Isoquant | `isoquant` |
| Deep Infra | `deepinfra` |
| Frequency | `frequency` |
| Moonshot AI (China) | `moonshotai-cn` |
| Impossibl | `impossibl` |
| Alibaba (China) | `alibaba-cn` |
| Infersia | `infersia` |
| ClinePass | `cline-pass` |
| Phala | `phala` |
| Zenifra | `zenifra` |
| Nvidia | `nvidia` |
| Groq | `groq` |
| Together AI | `togetherai` |
| Jad AI | `jad-ai` |
| SCNet Token Plan | `scnet-token-plan` |
| CheapestToken | `cheapest-token` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| LithosAI | `lithosai` |
| DaoXE | `daoxe` |
| AKI.IO | `aki-io` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Inception | `inception` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Bee by HEOSSI | `bee` |
| Hostinger Router | `hostinger-router` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| ainetcafe | `ainetcafe` |
| SenseNova (China) | `sensenova` |
| Vertex | `google-vertex` |
| Cohere | `cohere` |
| 302.AI | `302ai` |
| UncensuredAI | `uncensuredai` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| RuAPI | `ruapi` |
| Meta | `meta` |
| LMStudio | `lmstudio` |
| Ofox | `ofox` |
| SCX.ai | `scx-ai` |
| Perplexity | `perplexity` |
| D.Run (China) | `drun` |
| ParalonCloud | `paraloncloud` |
| FreeModel | `freemodel` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| PrimaLabs | `primalabs` |
| Kilo Gateway | `kilo` |
| Volcengine Ark | `volcengine` |
| Neuralwatt | `neuralwatt` |
| SaladCloud AI Gateway | `salad-cloud` |
| DInference | `dinference` |
| Privatemode AI | `privatemode-ai` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| CedarLLM | `cedarllm` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Moonshot AI | `moonshotai` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| IO.NET | `io-net` |
| Opper | `opper` |
| AIGROW | `aigrow` |
| Kosmik Compute | `kosmik` |
| Standard Compute | `standardcompute` |
| Wally | `wally` |
| Watt Cloud | `watt` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Inceptron | `inceptron` |
| Z.AI | `zai` |
| Vispark | `vispark` |
| AbliteratedLLM | `abliteratedllm` |
| QiHang | `qihang-ai` |
| LucidQuery | `lucidquery` |
| Clarifai | `clarifai` |
| Z.AI Coding Plan | `zai-coding-plan` |
| meraGPT | `meragpt` |
| TeamoRouter | `teamorouter` |
| Azure | `azure` |
| Aixy | `aixy` |
| Augure | `augure` |
| Reflection | `reflection` |
| Berget.AI | `berget` |
| Ezkielyna | `ezkielyna` |
| OCI Generative AI | `oci` |
| ZenMux | `zenmux` |
| submodel | `submodel` |
| GitHub Copilot | `github-copilot` |
| Modelis | `modelis` |
| Jiekou.AI | `jiekou` |
| EmpirioLabs AI | `empiriolabs` |
| Mistral | `mistral` |
| NeoSmith | `neosmith` |
| LLMTR | `llmtr` |
| QVAC | `qvac` |
| OpenCode Go | `opencode-go` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Unrestricted | `unrestricted` |
| Autarcho | `autarcho` |
| AnonRouter | `anonrouter` |
| IteraCompute | `iteracompute` |
| Friendli | `friendli` |
| Arcee | `arcee` |
| OrcaRouter | `orcarouter` |
| Runcrate | `runcrate` |
| SAP AI Core | `sap-ai-core` |
| Perplexity Agent | `perplexity-agent` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| routing.run | `routing-run` |
| Liquid Inference | `liquid` |
| Claudinio | `claudinio` |
| xAI | `xai` |
| Entrim | `entrim` |
| Munito AI (EU) | `munito-eu` |
| Snowflake Cortex | `snowflake-cortex` |
| Powerspring | `powerspring` |
| Crusoe | `crusoe` |
| Ambient | `ambient` |
| Hugging Face | `huggingface` |
| Vivgrid | `vivgrid` |
| StepFun (China) | `stepfun` |
| Poolside | `poolside` |
<!-- PROVIDERS:END -->

## License

MIT
