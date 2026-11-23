# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**314 providers · 9764 models · Updated 2026-11-23**
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
| Prime Inference | `prime` |
| AI Power Grid | `aipg` |
| Nova | `nova` |
| SiliconFlow (China) | `siliconflow-cn` |
| OrcaRouter | `orcarouter` |
| Claudinio | `claudinio` |
| Powerspring | `powerspring` |
| Standard Compute | `standardcompute` |
| GitLab Duo | `gitlab` |
| Oathbreaker AI | `oathbreaker` |
| Crusoe | `crusoe` |
| Hubris | `hubris` |
| SambaNova | `sambanova` |
| Bailing | `bailing` |
| Nebius Token Factory | `nebius` |
| ParalonCloud | `paraloncloud` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Xpersona | `xpersona` |
| Verda | `verda` |
| Vultr | `vultr` |
| Adaption | `adaption` |
| Mallard AI | `mallard` |
| Rayline | `rayline` |
| CoralBricks | `coralbricks` |
| JoinGonka | `joingonka` |
| Requesty | `requesty` |
| NanoGPT | `nano-gpt` |
| Sakana AI | `sakana` |
| Munito AI (EU) | `munito-eu` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| EBCloud | `ebcloud` |
| Jad AI | `jad-ai` |
| Neon | `neon` |
| Nodecode | `nodecode` |
| AI-ROUTER | `ai-router` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| LowRouter | `lowrouter` |
| Clarifai | `clarifai` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Tencent TokenHub | `tencent-tokenhub` |
| OpenRouter | `openrouter` |
| AbliteratedLLM | `abliteratedllm` |
| LithosAI | `lithosai` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| TokenWatt | `tokenwatt` |
| Qiniu | `qiniu-ai` |
| Doubleword | `doubleword` |
| FrogBot | `frogbot` |
| Logits | `logits` |
| Mistral | `mistral` |
| LLMTR | `llmtr` |
| SAGG | `sagg` |
| Moneo | `moneo` |
| AIGROW | `aigrow` |
| nokeep | `nokeep` |
| Jalapeno Cloud | `jalapeno` |
| Kenari | `kenari` |
| 302.AI | `302ai` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Charm Hyper | `hyper` |
| Atomic Chat | `atomic-chat` |
| Neuralwatt | `neuralwatt` |
| AI/ML API | `aimlapi` |
| Kilo Gateway | `kilo` |
| GraphN | `graphn` |
| Zenifra | `zenifra` |
| AnonRouter | `anonrouter` |
| LucidQuery | `lucidquery` |
| Pendra | `pendra` |
| InferAll | `inferall` |
| OpenReason | `openreason` |
| Frequency | `frequency` |
| UnoRouter | `unorouter` |
| IteraCompute | `iteracompute` |
| Novita AI | `novita-ai` |
| Hetzner | `hetzner` |
| TokenLab | `tokenlab` |
| engy | `engy` |
| KoRouter | `korouter` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| routing.run | `routing-run` |
| DInference | `dinference` |
| ZeroGPU | `zerogpu` |
| 50X | `fiftyx` |
| Gisoo | `gisoo` |
| TeamoRouter | `teamorouter` |
| StepFun (Global) | `stepfun-ai` |
| SandBase | `sandbase` |
| CedarLLM | `cedarllm` |
| Tokenify | `tokenify` |
| Abacus | `abacus` |
| LongCat | `longcat` |
| ZenMux | `zenmux` |
| TheRouter | `therouter` |
| CheapestToken | `cheapest-token` |
| DigitalOcean | `digitalocean` |
| Azure | `azure` |
| Inferris | `inferris` |
| NEAR AI Cloud | `nearai` |
| Cortecs | `cortecs` |
| Meganova | `meganova` |
| CrossModel | `crossmodel` |
| Melious | `melious` |
| Subconscious | `subconscious` |
| Meta | `meta` |
| CoreWeave | `wandb` |
| Zeldoc | `zeldoc` |
| Moark | `moark` |
| Phala | `phala` |
| Inference | `inference` |
| SenseNova (China) | `sensenova` |
| Ofox | `ofox` |
| LMStudio | `lmstudio` |
| Inception | `inception` |
| OpenAI | `openai` |
| Modular | `modular` |
| Alibaba (China) | `alibaba-cn` |
| Inference Cooperative | `inference-coop` |
| Chutes | `chutes` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| D.Run (China) | `drun` |
| Kitani | `kitani` |
| Synthorai | `synthorai` |
| Volcengine Ark | `volcengine` |
| Friendli | `friendli` |
| LLM Gateway | `llmgateway-providers` |
| Inco | `inco` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| GitHub Copilot | `github-copilot` |
| SaladCloud AI Gateway | `salad-cloud` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Snowflake Cortex | `snowflake-cortex` |
| RunInfra | `runinfra` |
| GreenPT | `greenpt` |
| Lynkr | `lynkr` |
| stepping stone AG | `stepping-stone` |
| Boundless | `boundless` |
| TokenRouter | `tokenrouter` |
| abliteration.ai | `abliteration-ai` |
| UncensuredAI | `uncensuredai` |
| Thinking Machines | `thinkingmachines` |
| TensorX | `tensorx` |
| Liquid Inference | `liquid` |
| Vertex | `google-vertex` |
| Perplexity | `perplexity` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| UplinkSwitch | `uplinkswitch` |
| Hostinger Router | `hostinger-router` |
| Alibaba | `alibaba` |
| Zro | `zro` |
| Munito AI | `munito` |
| Wally | `wally` |
| Bee by HEOSSI | `bee` |
| Jiekou.AI | `jiekou` |
| Keln | `keln` |
| Perplexity Agent | `perplexity-agent` |
| Augure | `augure` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Together AI | `togetherai` |
| Phase Router | `phase` |
| evroc | `evroc` |
| Teapot Router | `teapot-router` |
| Moonshot AI | `moonshotai` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Vivgrid | `vivgrid` |
| Echo | `echo` |
| Tinfoil | `tinfoil` |
| DotHoosh | `dothoosh` |
| Baseten | `baseten` |
| Concentrate | `concentrate` |
| Fortytwo | `fortytwo` |
| meraGPT | `meragpt` |
| Modal | `modal` |
| LLM Tech | `llmtech` |
| Entrim | `entrim` |
| Pareto Inference | `pareto` |
| ProxyStacks Relay | `proxystacks` |
| Zhipu AI | `zhipuai` |
| InferX | `inferx` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| cheapllm.shop | `cheapllm` |
| QVAC | `qvac` |
| watsonx.ai | `watsonx` |
| cheapaimodel | `cheapaimodel` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Reflection | `reflection` |
| Helicone | `helicone` |
| Infer by Flow7 | `infer` |
| Ollama Cloud | `ollama-cloud` |
| MiniMax (minimax.io) | `minimax` |
| Runcrate | `runcrate` |
| klokintegration.se | `klokintegration` |
| Autarcho | `autarcho` |
| SCX.ai | `scx-ai` |
| Groq | `groq` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Pioneer | `pioneer` |
| EmpirioLabs AI | `empiriolabs` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Xiaomi | `xiaomi` |
| StepFun (China) | `stepfun` |
| Upstage | `upstage` |
| ai& | `aiand` |
| superbot | `superbot-gg` |
| STACKIT | `stackit` |
| QiHang | `qihang-ai` |
| CommandCode | `commandcode` |
| Lyceum | `lyceum` |
| Bumo Router | `bumo` |
| DevPass (LLM Gateway) | `llmgateway` |
| HPC-AI | `hpc-ai` |
| Bothub | `bothub` |
| FastRouter | `fastrouter` |
| Inference APIs | `inferenceapis` |
| AKI.IO | `aki-io` |
| Hopper | `hopper` |
| Agnes AI | `agnes` |
| Nvidia | `nvidia` |
| Impossibl | `impossibl` |
| Pareto by Unbiased | `unbiased` |
| Kosmik Compute | `kosmik` |
| GMI Cloud | `gmicloud` |
| Klavo AI | `klavo` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Wallaby | `wallaby` |
| Ezkielyna | `ezkielyna` |
| Tenstorrent | `tenstorrent` |
| Isoquant | `isoquant` |
| Scaleway | `scaleway` |
| DeepSeek | `deepseek` |
| RuAPI | `ruapi` |
| Eden AI | `edenai` |
| Poe | `poe` |
| Hugging Face | `huggingface` |
| HUMAIN | `humain` |
| Regolo AI | `regolo-ai` |
| Watt Cloud | `watt` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Wafer | `wafer.ai` |
| OCI Generative AI | `oci` |
| NeoSmith | `neosmith` |
| Google | `google` |
| Anthropic | `anthropic` |
| Deep Infra | `deepinfra` |
| Ambient | `ambient` |
| Infersia | `infersia` |
| ModelScope | `modelscope` |
| OpenCode | `opencode` |
| TokenGo | `tokengo` |
| Moonshot AI (China) | `moonshotai-cn` |
| Mixlayer | `mixlayer` |
| Privatemode AI | `privatemode-ai` |
| Opper | `opper` |
| Poolside | `poolside` |
| Synthetic | `synthetic` |
| NaN | `nan` |
| Aixy | `aixy` |
| SparrowCodes | `sparrowcodes` |
| xxapi | `xxapi` |
| ClinePass | `cline-pass` |
| Databricks | `databricks` |
| submodel | `submodel` |
| Cerebras | `cerebras` |
| SOKKAN Router | `sokkan` |
| AMD | `amd` |
| OpenCode Go | `opencode-go` |
| above.dev | `above` |
| SiliconFlow | `siliconflow` |
| Auriko | `auriko` |
| CloudCode.ONE | `cloudcode` |
| Cohere | `cohere` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Fireworks AI | `fireworks-ai` |
| Infomaniak | `infomaniak` |
| DaoXE | `daoxe` |
| Vercel AI Gateway | `vercel` |
| Inceptron | `inceptron` |
| Unrestricted | `unrestricted` |
| FreeModel | `freemodel` |
| xAI | `xai` |
| APIKO | `apiko` |
| Vancine | `vancine` |
| Outer Labs | `outerlabs` |
| Kunavo | `kunavo` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Berget.AI | `berget` |
| Venice AI | `venice` |
| Adzuki AI | `adzuki` |
| Obscurify.ai | `obscurify` |
| PrimaLabs | `primalabs` |
| SAP AI Core | `sap-ai-core` |
| Umans AI | `umans-ai` |
| Merge Gateway | `merge-gateway` |
| Huawei Cloud MAAS | `huawei-maas` |
| ainetcafe | `ainetcafe` |
| Vispark | `vispark` |
| Refuseless | `refuseless` |
| IO.NET | `io-net` |
| AIHubMix | `aihubmix` |
| AI21 Labs | `ai21` |
| JZSTOKEN | `jzstoken` |
| Sarvam AI | `sarvam` |
| Tencent Token Plan | `tencent-token-plan` |
| SCNet Token Plan | `scnet-token-plan` |
| BytePlus ModelArk | `byteplus` |
| Morph | `morph` |
| Confidential AI | `confidential-ai` |
| Modelis | `modelis` |
| Arcee | `arcee` |
| Amazon Bedrock | `amazon-bedrock` |
| Z.AI | `zai` |
<!-- PROVIDERS:END -->

## License

MIT
