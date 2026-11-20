# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**312 providers · 9579 models · Updated 2026-11-20**
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
| Synthetic | `synthetic` |
| Pareto by Unbiased | `unbiased` |
| Tencent TokenHub | `tencent-tokenhub` |
| Together AI | `togetherai` |
| Liquid Inference | `liquid` |
| Sarvam AI | `sarvam` |
| Nova | `nova` |
| Adzuki AI | `adzuki` |
| Munito AI (EU) | `munito-eu` |
| Perplexity Agent | `perplexity-agent` |
| CoreWeave | `wandb` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Nebius Token Factory | `nebius` |
| CrossModel | `crossmodel` |
| Umans AI | `umans-ai` |
| Boundless | `boundless` |
| LLM Gateway | `llmgateway-providers` |
| RunInfra | `runinfra` |
| GMI Cloud | `gmicloud` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Charm Hyper | `hyper` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Scaleway | `scaleway` |
| TensorX | `tensorx` |
| Pendra | `pendra` |
| StepFun (Global) | `stepfun-ai` |
| Arcee | `arcee` |
| Crusoe | `crusoe` |
| DaoXE | `daoxe` |
| Moneo | `moneo` |
| Keln | `keln` |
| MiniMax (minimax.cn) | `minimax-cn` |
| CommandCode | `commandcode` |
| Echo | `echo` |
| Upstage | `upstage` |
| Inception | `inception` |
| Neuralwatt | `neuralwatt` |
| Jiekou.AI | `jiekou` |
| Verda | `verda` |
| 302.AI | `302ai` |
| Bumo Router | `bumo` |
| Inco | `inco` |
| TokenLab | `tokenlab` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| UncensuredAI | `uncensuredai` |
| HPC-AI | `hpc-ai` |
| Friendli | `friendli` |
| cheapaimodel | `cheapaimodel` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| LLM Tech | `llmtech` |
| Rayline | `rayline` |
| Logits | `logits` |
| DotHoosh | `dothoosh` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| QVAC | `qvac` |
| Requesty | `requesty` |
| AMD | `amd` |
| 50X | `fiftyx` |
| Tokenify | `tokenify` |
| DInference | `dinference` |
| Phala | `phala` |
| GitLab Duo | `gitlab` |
| LithosAI | `lithosai` |
| DigitalOcean | `digitalocean` |
| Wafer | `wafer.ai` |
| LowRouter | `lowrouter` |
| Z.AI | `zai` |
| AI-ROUTER | `ai-router` |
| SAGG | `sagg` |
| NanoGPT | `nano-gpt` |
| Sakana AI | `sakana` |
| Munito AI | `munito` |
| klokintegration.se | `klokintegration` |
| Amazon Bedrock | `amazon-bedrock` |
| Thinking Machines | `thinkingmachines` |
| Moonshot AI | `moonshotai` |
| Databricks | `databricks` |
| Runcrate | `runcrate` |
| DevPass (LLM Gateway) | `llmgateway` |
| Mistral | `mistral` |
| Moark | `moark` |
| FrogBot | `frogbot` |
| Novita AI | `novita-ai` |
| AIGROW | `aigrow` |
| Morph | `morph` |
| Fireworks AI | `fireworks-ai` |
| Pioneer | `pioneer` |
| OVHcloud AI Endpoints | `ovhcloud` |
| NEAR AI Cloud | `nearai` |
| Inferris | `inferris` |
| JoinGonka | `joingonka` |
| Lyceum | `lyceum` |
| TheRouter | `therouter` |
| Vertex | `google-vertex` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| nokeep | `nokeep` |
| watsonx.ai | `watsonx` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Merge Gateway | `merge-gateway` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| JZSTOKEN | `jzstoken` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Moonshot AI (China) | `moonshotai-cn` |
| SiliconFlow | `siliconflow` |
| Modular | `modular` |
| Phase Router | `phase` |
| Anthropic | `anthropic` |
| CheapestToken | `cheapest-token` |
| above.dev | `above` |
| Meganova | `meganova` |
| Chutes | `chutes` |
| Gisoo | `gisoo` |
| D.Run (China) | `drun` |
| Huawei Cloud MAAS | `huawei-maas` |
| Modelis | `modelis` |
| SCX.ai | `scx-ai` |
| Wallaby | `wallaby` |
| Watt Cloud | `watt` |
| Kunavo | `kunavo` |
| Outer Labs | `outerlabs` |
| AI21 Labs | `ai21` |
| Perplexity | `perplexity` |
| Venice AI | `venice` |
| Neon | `neon` |
| Wally | `wally` |
| ModelScope | `modelscope` |
| superbot | `superbot-gg` |
| Xpersona | `xpersona` |
| Poolside | `poolside` |
| OpenReason | `openreason` |
| evroc | `evroc` |
| Unrestricted | `unrestricted` |
| OpenRouter | `openrouter` |
| Fortytwo | `fortytwo` |
| Aixy | `aixy` |
| Zenifra | `zenifra` |
| Tenstorrent | `tenstorrent` |
| AKI.IO | `aki-io` |
| Inference Cooperative | `inference-coop` |
| Kitani | `kitani` |
| ZeroGPU | `zerogpu` |
| OpenAI | `openai` |
| abliteration.ai | `abliteration-ai` |
| LucidQuery | `lucidquery` |
| SAP AI Core | `sap-ai-core` |
| Opper | `opper` |
| Hopper | `hopper` |
| Vivgrid | `vivgrid` |
| Frequency | `frequency` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| GitHub Copilot | `github-copilot` |
| Obscurify.ai | `obscurify` |
| Infomaniak | `infomaniak` |
| Powerspring | `powerspring` |
| Confidential AI | `confidential-ai` |
| Infer by Flow7 | `infer` |
| routing.run | `routing-run` |
| Reflection | `reflection` |
| Autarcho | `autarcho` |
| Nvidia | `nvidia` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| xAI | `xai` |
| Google | `google` |
| Regolo AI | `regolo-ai` |
| Bothub | `bothub` |
| Inceptron | `inceptron` |
| LongCat | `longcat` |
| Pareto Inference | `pareto` |
| Jad AI | `jad-ai` |
| Bee by HEOSSI | `bee` |
| Zeldoc | `zeldoc` |
| Clarifai | `clarifai` |
| AIHubMix | `aihubmix` |
| ainetcafe | `ainetcafe` |
| CloudCode.ONE | `cloudcode` |
| Prime Inference | `prime` |
| Xiaomi | `xiaomi` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| KoRouter | `korouter` |
| stepping stone AG | `stepping-stone` |
| Groq | `groq` |
| Claudinio | `claudinio` |
| Cohere | `cohere` |
| Snowflake Cortex | `snowflake-cortex` |
| SOKKAN Router | `sokkan` |
| Baseten | `baseten` |
| AnonRouter | `anonrouter` |
| Mixlayer | `mixlayer` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| ZenMux | `zenmux` |
| Meta | `meta` |
| Standard Compute | `standardcompute` |
| ClinePass | `cline-pass` |
| Poe | `poe` |
| Atomic Chat | `atomic-chat` |
| Zhipu AI | `zhipuai` |
| SparrowCodes | `sparrowcodes` |
| xxapi | `xxapi` |
| FreeModel | `freemodel` |
| SCNet Token Plan | `scnet-token-plan` |
| Subconscious | `subconscious` |
| LLMTR | `llmtr` |
| Eden AI | `edenai` |
| Ambient | `ambient` |
| Isoquant | `isoquant` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| StepFun (China) | `stepfun` |
| Azure | `azure` |
| Alibaba Token Plan | `alibaba-token-plan` |
| NaN | `nan` |
| Entrim | `entrim` |
| Kilo Gateway | `kilo` |
| OCI Generative AI | `oci` |
| Cerebras | `cerebras` |
| Hugging Face | `huggingface` |
| Synthorai | `synthorai` |
| Zro | `zro` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| SiliconFlow (China) | `siliconflow-cn` |
| Modal | `modal` |
| GraphN | `graphn` |
| Auriko | `auriko` |
| Vancine | `vancine` |
| Kenari | `kenari` |
| DeepSeek | `deepseek` |
| InferX | `inferx` |
| Kosmik Compute | `kosmik` |
| Qiniu | `qiniu-ai` |
| TokenRouter | `tokenrouter` |
| SaladCloud AI Gateway | `salad-cloud` |
| TokenWatt | `tokenwatt` |
| Teapot Router | `teapot-router` |
| GreenPT | `greenpt` |
| Ofox | `ofox` |
| Jalapeno Cloud | `jalapeno` |
| BytePlus ModelArk | `byteplus` |
| Doubleword | `doubleword` |
| Adaption | `adaption` |
| AI/ML API | `aimlapi` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| STACKIT | `stackit` |
| TokenGo | `tokengo` |
| InferAll | `inferall` |
| QiHang | `qihang-ai` |
| Vercel AI Gateway | `vercel` |
| FastRouter | `fastrouter` |
| AI Power Grid | `aipg` |
| Oathbreaker AI | `oathbreaker` |
| AbliteratedLLM | `abliteratedllm` |
| Ollama Cloud | `ollama-cloud` |
| UnoRouter | `unorouter` |
| APIKO | `apiko` |
| Vultr | `vultr` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| EmpirioLabs AI | `empiriolabs` |
| CoralBricks | `coralbricks` |
| engy | `engy` |
| Helicone | `helicone` |
| Tencent Token Plan | `tencent-token-plan` |
| Berget.AI | `berget` |
| CedarLLM | `cedarllm` |
| SenseNova (China) | `sensenova` |
| Mallard AI | `mallard` |
| ai& | `aiand` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| IteraCompute | `iteracompute` |
| HUMAIN | `humain` |
| Tinfoil | `tinfoil` |
| NeoSmith | `neosmith` |
| UplinkSwitch | `uplinkswitch` |
| Infersia | `infersia` |
| Hostinger Router | `hostinger-router` |
| Agnes AI | `agnes` |
| Lynkr | `lynkr` |
| Bailing | `bailing` |
| ProxyStacks Relay | `proxystacks` |
| OrcaRouter | `orcarouter` |
| Impossibl | `impossibl` |
| Alibaba (China) | `alibaba-cn` |
| Alibaba | `alibaba` |
| OpenCode Go | `opencode-go` |
| SandBase | `sandbase` |
| Augure | `augure` |
| Cortecs | `cortecs` |
| TeamoRouter | `teamorouter` |
| RuAPI | `ruapi` |
| Melious | `melious` |
| Nodecode | `nodecode` |
| Inference APIs | `inferenceapis` |
| OpenCode | `opencode` |
| Hubris | `hubris` |
| submodel | `submodel` |
| Deep Infra | `deepinfra` |
| IO.NET | `io-net` |
| SambaNova | `sambanova` |
| Hetzner | `hetzner` |
| Klavo AI | `klavo` |
| Inference | `inference` |
| MiniMax (minimax.io) | `minimax` |
| Abacus | `abacus` |
| Ezkielyna | `ezkielyna` |
| meraGPT | `meragpt` |
| cheapllm.shop | `cheapllm` |
| Volcengine Ark | `volcengine` |
| Refuseless | `refuseless` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| EBCloud | `ebcloud` |
| Privatemode AI | `privatemode-ai` |
| Vispark | `vispark` |
| ParalonCloud | `paraloncloud` |
| LMStudio | `lmstudio` |
<!-- PROVIDERS:END -->

## License

MIT
