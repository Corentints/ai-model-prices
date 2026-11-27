# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**314 providers · 9622 models · Updated 2026-11-27**
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
| Tencent TokenHub | `tencent-tokenhub` |
| Databricks | `databricks` |
| NanoGPT | `nano-gpt` |
| Charm Hyper | `hyper` |
| Keln | `keln` |
| Agnes AI | `agnes` |
| GitHub Copilot | `github-copilot` |
| Boundless | `boundless` |
| Wafer | `wafer.ai` |
| Inference | `inference` |
| AI/ML API | `aimlapi` |
| Moneo | `moneo` |
| Mistral | `mistral` |
| OpenAI | `openai` |
| GraphN | `graphn` |
| ai& | `aiand` |
| TokenWatt | `tokenwatt` |
| Pareto by Unbiased | `unbiased` |
| Adaption | `adaption` |
| evroc | `evroc` |
| Inference APIs | `inferenceapis` |
| Novita AI | `novita-ai` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Sarvam AI | `sarvam` |
| CheapestToken | `cheapest-token` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| submodel | `submodel` |
| Deep Infra | `deepinfra` |
| Alibaba | `alibaba` |
| Regolo AI | `regolo-ai` |
| Modular | `modular` |
| Infomaniak | `infomaniak` |
| Xpersona | `xpersona` |
| InferAll | `inferall` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| UnoRouter | `unorouter` |
| Berget.AI | `berget` |
| Inferris | `inferris` |
| StepFun (China) | `stepfun` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| QiHang | `qihang-ai` |
| LMStudio | `lmstudio` |
| APIKO | `apiko` |
| cheapaimodel | `cheapaimodel` |
| Auriko | `auriko` |
| abliteration.ai | `abliteration-ai` |
| TokenLab | `tokenlab` |
| Verda | `verda` |
| Inceptron | `inceptron` |
| Munito AI (EU) | `munito-eu` |
| LucidQuery | `lucidquery` |
| Confidential AI | `confidential-ai` |
| meraGPT | `meragpt` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| DevPass (LLM Gateway) | `llmgateway` |
| CoreWeave | `wandb` |
| Zhipu AI | `zhipuai` |
| Thinking Machines | `thinkingmachines` |
| OCI Generative AI | `oci` |
| AI-ROUTER | `ai-router` |
| Cohere | `cohere` |
| STACKIT | `stackit` |
| Powerspring | `powerspring` |
| SCX.ai | `scx-ai` |
| OpenReason | `openreason` |
| Rayline | `rayline` |
| StepFun (Global) | `stepfun-ai` |
| SparrowCodes | `sparrowcodes` |
| Wallaby | `wallaby` |
| Gisoo | `gisoo` |
| Subconscious | `subconscious` |
| Mallard AI | `mallard` |
| QVAC | `qvac` |
| Hostinger Router | `hostinger-router` |
| Requesty | `requesty` |
| CrossModel | `crossmodel` |
| Google | `google` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Helicone | `helicone` |
| FastRouter | `fastrouter` |
| RuAPI | `ruapi` |
| TokenGo | `tokengo` |
| Merge Gateway | `merge-gateway` |
| Ezkielyna | `ezkielyna` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Zeldoc | `zeldoc` |
| OpenCode Go | `opencode-go` |
| Prime Inference | `prime` |
| Chutes | `chutes` |
| MiniMax (minimax.io) | `minimax` |
| Nova | `nova` |
| KoRouter | `korouter` |
| NEAR AI Cloud | `nearai` |
| CoralBricks | `coralbricks` |
| DeepSeek | `deepseek` |
| routing.run | `routing-run` |
| Melious | `melious` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Ofox | `ofox` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| LongCat | `longcat` |
| MiniMax (minimax.cn) | `minimax-cn` |
| PrimaLabs | `primalabs` |
| Friendli | `friendli` |
| Reflection | `reflection` |
| LLM Gateway | `llmgateway-providers` |
| Adzuki AI | `adzuki` |
| watsonx.ai | `watsonx` |
| Alibaba (China) | `alibaba-cn` |
| Bee by HEOSSI | `bee` |
| DInference | `dinference` |
| HUMAIN | `humain` |
| SAGG | `sagg` |
| Anthropic | `anthropic` |
| Bothub | `bothub` |
| EBCloud | `ebcloud` |
| OpenCode | `opencode` |
| Ollama Cloud | `ollama-cloud` |
| Teapot Router | `teapot-router` |
| FrogBot | `frogbot` |
| SambaNova | `sambanova` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Eden AI | `edenai` |
| superbot | `superbot-gg` |
| Tencent Token Plan | `tencent-token-plan` |
| Impossibl | `impossibl` |
| Tinfoil | `tinfoil` |
| Tenstorrent | `tenstorrent` |
| Phase Router | `phase` |
| Vercel AI Gateway | `vercel` |
| Phala | `phala` |
| AbliteratedLLM | `abliteratedllm` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| UplinkSwitch | `uplinkswitch` |
| Lyceum | `lyceum` |
| Poolside | `poolside` |
| AI21 Labs | `ai21` |
| GitLab Duo | `gitlab` |
| Logits | `logits` |
| TokenRouter | `tokenrouter` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| SandBase | `sandbase` |
| Morph | `morph` |
| Augure | `augure` |
| Runcrate | `runcrate` |
| Amazon Bedrock | `amazon-bedrock` |
| Huawei Cloud MAAS | `huawei-maas` |
| ClinePass | `cline-pass` |
| Unrestricted | `unrestricted` |
| Upstage | `upstage` |
| Clarifai | `clarifai` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| HPC-AI | `hpc-ai` |
| Infersia | `infersia` |
| CommandCode | `commandcode` |
| Groq | `groq` |
| CedarLLM | `cedarllm` |
| Together AI | `togetherai` |
| Neon | `neon` |
| SaladCloud AI Gateway | `salad-cloud` |
| AKI.IO | `aki-io` |
| Snowflake Cortex | `snowflake-cortex` |
| Jiekou.AI | `jiekou` |
| Kenari | `kenari` |
| Inception | `inception` |
| Synthorai | `synthorai` |
| engy | `engy` |
| Kosmik Compute | `kosmik` |
| LLMTR | `llmtr` |
| Lynkr | `lynkr` |
| LowRouter | `lowrouter` |
| ZenMux | `zenmux` |
| Isoquant | `isoquant` |
| Jad AI | `jad-ai` |
| Entrim | `entrim` |
| D.Run (China) | `drun` |
| InferX | `inferx` |
| Atomic Chat | `atomic-chat` |
| Privatemode AI | `privatemode-ai` |
| Autarcho | `autarcho` |
| Zenifra | `zenifra` |
| LithosAI | `lithosai` |
| Frequency | `frequency` |
| Meta | `meta` |
| DotHoosh | `dothoosh` |
| JZSTOKEN | `jzstoken` |
| Fortytwo | `fortytwo` |
| Kitani | `kitani` |
| NaN | `nan` |
| Standard Compute | `standardcompute` |
| IteraCompute | `iteracompute` |
| Vultr | `vultr` |
| Abacus | `abacus` |
| xxapi | `xxapi` |
| Kilo Gateway | `kilo` |
| Doubleword | `doubleword` |
| Vivgrid | `vivgrid` |
| Watt Cloud | `watt` |
| Crusoe | `crusoe` |
| Venice AI | `venice` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| 50X | `fiftyx` |
| Synthetic | `synthetic` |
| Cerebras | `cerebras` |
| Concentrate | `concentrate` |
| Klavo AI | `klavo` |
| Zro | `zro` |
| Moonshot AI (China) | `moonshotai-cn` |
| Perplexity | `perplexity` |
| Aixy | `aixy` |
| Hetzner | `hetzner` |
| Echo | `echo` |
| EmpirioLabs AI | `empiriolabs` |
| Kunavo | `kunavo` |
| AIGROW | `aigrow` |
| Moonshot AI | `moonshotai` |
| Pioneer | `pioneer` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Oathbreaker AI | `oathbreaker` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Meganova | `meganova` |
| Inco | `inco` |
| Mixlayer | `mixlayer` |
| Infer by Flow7 | `infer` |
| GMI Cloud | `gmicloud` |
| Z.AI | `zai` |
| Volcengine Ark | `volcengine` |
| Cortecs | `cortecs` |
| Hopper | `hopper` |
| DaoXE | `daoxe` |
| Perplexity Agent | `perplexity-agent` |
| above.dev | `above` |
| Pendra | `pendra` |
| Tokenify | `tokenify` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| SiliconFlow (China) | `siliconflow-cn` |
| RunInfra | `runinfra` |
| ParalonCloud | `paraloncloud` |
| TensorX | `tensorx` |
| AIHubMix | `aihubmix` |
| Bailing | `bailing` |
| Alibaba Token Plan | `alibaba-token-plan` |
| ainetcafe | `ainetcafe` |
| Ambient | `ambient` |
| LLM Tech | `llmtech` |
| Munito AI | `munito` |
| Vispark | `vispark` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Vancine | `vancine` |
| Sakana AI | `sakana` |
| Xiaomi | `xiaomi` |
| SOKKAN Router | `sokkan` |
| stepping stone AG | `stepping-stone` |
| ZeroGPU | `zerogpu` |
| Nodecode | `nodecode` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Modelis | `modelis` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Claudinio | `claudinio` |
| BytePlus ModelArk | `byteplus` |
| Baseten | `baseten` |
| Jalapeno Cloud | `jalapeno` |
| Vertex | `google-vertex` |
| Nvidia | `nvidia` |
| Modal | `modal` |
| SiliconFlow | `siliconflow` |
| Umans AI | `umans-ai` |
| Liquid Inference | `liquid` |
| Poe | `poe` |
| Inference Cooperative | `inference-coop` |
| nokeep | `nokeep` |
| Arcee | `arcee` |
| SenseNova (China) | `sensenova` |
| Nebius Token Factory | `nebius` |
| OrcaRouter | `orcarouter` |
| IO.NET | `io-net` |
| Hubris | `hubris` |
| klokintegration.se | `klokintegration` |
| TheRouter | `therouter` |
| SCNet Token Plan | `scnet-token-plan` |
| FreeModel | `freemodel` |
| NeoSmith | `neosmith` |
| Bumo Router | `bumo` |
| GreenPT | `greenpt` |
| JoinGonka | `joingonka` |
| Opper | `opper` |
| AnonRouter | `anonrouter` |
| cheapllm.shop | `cheapllm` |
| Fireworks AI | `fireworks-ai` |
| 302.AI | `302ai` |
| Pareto Inference | `pareto` |
| Qiniu | `qiniu-ai` |
| Outer Labs | `outerlabs` |
| Moark | `moark` |
| UncensuredAI | `uncensuredai` |
| AMD | `amd` |
| AI Power Grid | `aipg` |
| Scaleway | `scaleway` |
| Azure | `azure` |
| Refuseless | `refuseless` |
| ProxyStacks Relay | `proxystacks` |
| TeamoRouter | `teamorouter` |
| xAI | `xai` |
| Hugging Face | `huggingface` |
| ModelScope | `modelscope` |
| Neuralwatt | `neuralwatt` |
| Wally | `wally` |
| OpenRouter | `openrouter` |
| SAP AI Core | `sap-ai-core` |
| Obscurify.ai | `obscurify` |
| DigitalOcean | `digitalocean` |
| CloudCode.ONE | `cloudcode` |
<!-- PROVIDERS:END -->

## License

MIT
