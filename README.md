# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**314 providers · 9615 models · Updated 2026-11-28**
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
| NanoGPT | `nano-gpt` |
| HUMAIN | `humain` |
| Liquid Inference | `liquid` |
| Adaption | `adaption` |
| Bumo Router | `bumo` |
| Poe | `poe` |
| Synthetic | `synthetic` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| LucidQuery | `lucidquery` |
| routing.run | `routing-run` |
| StepFun (China) | `stepfun` |
| Arcee | `arcee` |
| Vertex | `google-vertex` |
| FrogBot | `frogbot` |
| Snowflake Cortex | `snowflake-cortex` |
| Z.AI | `zai` |
| Atomic Chat | `atomic-chat` |
| Thinking Machines | `thinkingmachines` |
| Together AI | `togetherai` |
| Privatemode AI | `privatemode-ai` |
| nokeep | `nokeep` |
| 50X | `fiftyx` |
| Hetzner | `hetzner` |
| TokenGo | `tokengo` |
| DigitalOcean | `digitalocean` |
| Qiniu | `qiniu-ai` |
| GreenPT | `greenpt` |
| Outer Labs | `outerlabs` |
| Jad AI | `jad-ai` |
| Venice AI | `venice` |
| Eden AI | `edenai` |
| Anthropic | `anthropic` |
| Inception | `inception` |
| Hubris | `hubris` |
| klokintegration.se | `klokintegration` |
| Abacus | `abacus` |
| Scaleway | `scaleway` |
| xxapi | `xxapi` |
| PrimaLabs | `primalabs` |
| AI Power Grid | `aipg` |
| CheapestToken | `cheapest-token` |
| Refuseless | `refuseless` |
| Logits | `logits` |
| TokenWatt | `tokenwatt` |
| RuAPI | `ruapi` |
| Sarvam AI | `sarvam` |
| HPC-AI | `hpc-ai` |
| Melious | `melious` |
| Requesty | `requesty` |
| Bothub | `bothub` |
| Fireworks AI | `fireworks-ai` |
| Wafer | `wafer.ai` |
| SenseNova (China) | `sensenova` |
| SAP AI Core | `sap-ai-core` |
| ainetcafe | `ainetcafe` |
| CoreWeave | `wandb` |
| UncensuredAI | `uncensuredai` |
| Tinfoil | `tinfoil` |
| Volcengine Ark | `volcengine` |
| AKI.IO | `aki-io` |
| Bee by HEOSSI | `bee` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Perplexity | `perplexity` |
| UnoRouter | `unorouter` |
| Augure | `augure` |
| Aixy | `aixy` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Cohere | `cohere` |
| Concentrate | `concentrate` |
| Synthorai | `synthorai` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Helicone | `helicone` |
| CoralBricks | `coralbricks` |
| Huawei Cloud MAAS | `huawei-maas` |
| Nova | `nova` |
| Claudinio | `claudinio` |
| Infer by Flow7 | `infer` |
| Entrim | `entrim` |
| CedarLLM | `cedarllm` |
| JZSTOKEN | `jzstoken` |
| Pareto Inference | `pareto` |
| Lyceum | `lyceum` |
| Jalapeno Cloud | `jalapeno` |
| Hugging Face | `huggingface` |
| Zeldoc | `zeldoc` |
| Infersia | `infersia` |
| Gisoo | `gisoo` |
| Runcrate | `runcrate` |
| Opper | `opper` |
| AI-ROUTER | `ai-router` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| CommandCode | `commandcode` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| STACKIT | `stackit` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Zhipu AI | `zhipuai` |
| NaN | `nan` |
| MiniMax (minimax.io) | `minimax` |
| Vispark | `vispark` |
| Zenifra | `zenifra` |
| GraphN | `graphn` |
| Chutes | `chutes` |
| Hopper | `hopper` |
| Ezkielyna | `ezkielyna` |
| Kosmik Compute | `kosmik` |
| Google | `google` |
| Modular | `modular` |
| Kenari | `kenari` |
| FreeModel | `freemodel` |
| SCNet Token Plan | `scnet-token-plan` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| OCI Generative AI | `oci` |
| submodel | `submodel` |
| Wallaby | `wallaby` |
| Tokenify | `tokenify` |
| SAGG | `sagg` |
| Vultr | `vultr` |
| Umans AI | `umans-ai` |
| Nvidia | `nvidia` |
| Hostinger Router | `hostinger-router` |
| Tencent Token Plan | `tencent-token-plan` |
| OpenAI | `openai` |
| abliteration.ai | `abliteration-ai` |
| NeoSmith | `neosmith` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| OpenReason | `openreason` |
| AI/ML API | `aimlapi` |
| Mixlayer | `mixlayer` |
| Mallard AI | `mallard` |
| Upstage | `upstage` |
| Fortytwo | `fortytwo` |
| Unrestricted | `unrestricted` |
| Inco | `inco` |
| evroc | `evroc` |
| OpenCode | `opencode` |
| Echo | `echo` |
| ProxyStacks Relay | `proxystacks` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| JoinGonka | `joingonka` |
| Berget.AI | `berget` |
| 302.AI | `302ai` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Zro | `zro` |
| Bailing | `bailing` |
| DevPass (LLM Gateway) | `llmgateway` |
| Modelis | `modelis` |
| AbliteratedLLM | `abliteratedllm` |
| Ollama Cloud | `ollama-cloud` |
| Regolo AI | `regolo-ai` |
| CrossModel | `crossmodel` |
| Inference | `inference` |
| Infomaniak | `infomaniak` |
| Phala | `phala` |
| Standard Compute | `standardcompute` |
| InferX | `inferx` |
| Kitani | `kitani` |
| SandBase | `sandbase` |
| Inferris | `inferris` |
| EmpirioLabs AI | `empiriolabs` |
| Ambient | `ambient` |
| ClinePass | `cline-pass` |
| Kunavo | `kunavo` |
| Impossibl | `impossibl` |
| Subconscious | `subconscious` |
| Poolside | `poolside` |
| DeepSeek | `deepseek` |
| Munito AI (EU) | `munito-eu` |
| Pioneer | `pioneer` |
| SOKKAN Router | `sokkan` |
| StepFun (Global) | `stepfun-ai` |
| GitLab Duo | `gitlab` |
| UplinkSwitch | `uplinkswitch` |
| Confidential AI | `confidential-ai` |
| Tencent TokenHub | `tencent-tokenhub` |
| Autarcho | `autarcho` |
| Inference Cooperative | `inference-coop` |
| stepping stone AG | `stepping-stone` |
| Isoquant | `isoquant` |
| Oathbreaker AI | `oathbreaker` |
| Crusoe | `crusoe` |
| Databricks | `databricks` |
| Teapot Router | `teapot-router` |
| Charm Hyper | `hyper` |
| QVAC | `qvac` |
| Meganova | `meganova` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| APIKO | `apiko` |
| xAI | `xai` |
| LithosAI | `lithosai` |
| GitHub Copilot | `github-copilot` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| IO.NET | `io-net` |
| Nodecode | `nodecode` |
| cheapaimodel | `cheapaimodel` |
| Watt Cloud | `watt` |
| Clarifai | `clarifai` |
| Pendra | `pendra` |
| Moonshot AI (China) | `moonshotai-cn` |
| Adzuki AI | `adzuki` |
| SparrowCodes | `sparrowcodes` |
| D.Run (China) | `drun` |
| Friendli | `friendli` |
| meraGPT | `meragpt` |
| Moark | `moark` |
| Inceptron | `inceptron` |
| IteraCompute | `iteracompute` |
| ZeroGPU | `zerogpu` |
| ai& | `aiand` |
| OpenCode Go | `opencode-go` |
| Ofox | `ofox` |
| AI21 Labs | `ai21` |
| TokenRouter | `tokenrouter` |
| Reflection | `reflection` |
| InferAll | `inferall` |
| DaoXE | `daoxe` |
| Alibaba Token Plan | `alibaba-token-plan` |
| CloudCode.ONE | `cloudcode` |
| Jiekou.AI | `jiekou` |
| Pareto by Unbiased | `unbiased` |
| above.dev | `above` |
| Tenstorrent | `tenstorrent` |
| Amazon Bedrock | `amazon-bedrock` |
| Keln | `keln` |
| ZenMux | `zenmux` |
| Azure | `azure` |
| cheapllm.shop | `cheapllm` |
| Prime Inference | `prime` |
| Phase Router | `phase` |
| OpenRouter | `openrouter` |
| Obscurify.ai | `obscurify` |
| OVHcloud AI Endpoints | `ovhcloud` |
| AIGROW | `aigrow` |
| Kilo Gateway | `kilo` |
| SCX.ai | `scx-ai` |
| Meta | `meta` |
| Neuralwatt | `neuralwatt` |
| Moneo | `moneo` |
| LLM Gateway | `llmgateway-providers` |
| Baseten | `baseten` |
| superbot | `superbot-gg` |
| Groq | `groq` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Powerspring | `powerspring` |
| Frequency | `frequency` |
| Nebius Token Factory | `nebius` |
| Modal | `modal` |
| Cortecs | `cortecs` |
| KoRouter | `korouter` |
| Boundless | `boundless` |
| Cerebras | `cerebras` |
| ParalonCloud | `paraloncloud` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Deep Infra | `deepinfra` |
| OrcaRouter | `orcarouter` |
| QiHang | `qihang-ai` |
| Sakana AI | `sakana` |
| DotHoosh | `dothoosh` |
| TensorX | `tensorx` |
| SaladCloud AI Gateway | `salad-cloud` |
| LowRouter | `lowrouter` |
| Perplexity Agent | `perplexity-agent` |
| LMStudio | `lmstudio` |
| Neon | `neon` |
| Vercel AI Gateway | `vercel` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Munito AI | `munito` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| engy | `engy` |
| LongCat | `longcat` |
| Alibaba | `alibaba` |
| BytePlus ModelArk | `byteplus` |
| watsonx.ai | `watsonx` |
| NEAR AI Cloud | `nearai` |
| SiliconFlow | `siliconflow` |
| EBCloud | `ebcloud` |
| SambaNova | `sambanova` |
| AMD | `amd` |
| Rayline | `rayline` |
| GMI Cloud | `gmicloud` |
| Alibaba (China) | `alibaba-cn` |
| AnonRouter | `anonrouter` |
| Xpersona | `xpersona` |
| FastRouter | `fastrouter` |
| Merge Gateway | `merge-gateway` |
| Vancine | `vancine` |
| Auriko | `auriko` |
| TeamoRouter | `teamorouter` |
| ModelScope | `modelscope` |
| Lynkr | `lynkr` |
| Inference APIs | `inferenceapis` |
| Doubleword | `doubleword` |
| SiliconFlow (China) | `siliconflow-cn` |
| Moonshot AI | `moonshotai` |
| DInference | `dinference` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| AIHubMix | `aihubmix` |
| Morph | `morph` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| LLM Tech | `llmtech` |
| Wally | `wally` |
| Mistral | `mistral` |
| Vivgrid | `vivgrid` |
| LLMTR | `llmtr` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Agnes AI | `agnes` |
| TheRouter | `therouter` |
| RunInfra | `runinfra` |
| TokenLab | `tokenlab` |
| Novita AI | `novita-ai` |
| Xiaomi | `xiaomi` |
| Verda | `verda` |
| Klavo AI | `klavo` |
<!-- PROVIDERS:END -->

## License

MIT
