# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**312 providers · 9570 models · Updated 2026-11-21**
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
| Merge Gateway | `merge-gateway` |
| Perplexity Agent | `perplexity-agent` |
| GitLab Duo | `gitlab` |
| Boundless | `boundless` |
| STACKIT | `stackit` |
| Kilo Gateway | `kilo` |
| Google | `google` |
| AI-ROUTER | `ai-router` |
| Opper | `opper` |
| Lyceum | `lyceum` |
| Poolside | `poolside` |
| Lynkr | `lynkr` |
| Synthetic | `synthetic` |
| Confidential AI | `confidential-ai` |
| Standard Compute | `standardcompute` |
| SiliconFlow | `siliconflow` |
| Unrestricted | `unrestricted` |
| Z.AI Coding Plan | `zai-coding-plan` |
| RunInfra | `runinfra` |
| Verda | `verda` |
| Powerspring | `powerspring` |
| Munito AI (EU) | `munito-eu` |
| cheapllm.shop | `cheapllm` |
| Huawei Cloud MAAS | `huawei-maas` |
| Charm Hyper | `hyper` |
| Meta | `meta` |
| APIKO | `apiko` |
| xAI | `xai` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Autarcho | `autarcho` |
| Z.AI | `zai` |
| Zeldoc | `zeldoc` |
| ModelScope | `modelscope` |
| Berget.AI | `berget` |
| GMI Cloud | `gmicloud` |
| Wafer | `wafer.ai` |
| Bumo Router | `bumo` |
| Hostinger Router | `hostinger-router` |
| meraGPT | `meragpt` |
| Vispark | `vispark` |
| TokenGo | `tokengo` |
| Obscurify.ai | `obscurify` |
| AKI.IO | `aki-io` |
| RuAPI | `ruapi` |
| Tokenify | `tokenify` |
| SambaNova | `sambanova` |
| Ambient | `ambient` |
| Moark | `moark` |
| 302.AI | `302ai` |
| Inference APIs | `inferenceapis` |
| Nvidia | `nvidia` |
| Helicone | `helicone` |
| watsonx.ai | `watsonx` |
| AI/ML API | `aimlapi` |
| KoRouter | `korouter` |
| DotHoosh | `dothoosh` |
| FastRouter | `fastrouter` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| submodel | `submodel` |
| Privatemode AI | `privatemode-ai` |
| SAGG | `sagg` |
| Requesty | `requesty` |
| Vivgrid | `vivgrid` |
| AIHubMix | `aihubmix` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Phase Router | `phase` |
| Kunavo | `kunavo` |
| Subconscious | `subconscious` |
| AMD | `amd` |
| SOKKAN Router | `sokkan` |
| TokenWatt | `tokenwatt` |
| Deep Infra | `deepinfra` |
| CoralBricks | `coralbricks` |
| NeoSmith | `neosmith` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| QiHang | `qihang-ai` |
| Runcrate | `runcrate` |
| Meganova | `meganova` |
| superbot | `superbot-gg` |
| Munito AI | `munito` |
| Hopper | `hopper` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Wally | `wally` |
| SandBase | `sandbase` |
| Melious | `melious` |
| AIGROW | `aigrow` |
| DInference | `dinference` |
| Together AI | `togetherai` |
| EmpirioLabs AI | `empiriolabs` |
| Infomaniak | `infomaniak` |
| CedarLLM | `cedarllm` |
| Alibaba | `alibaba` |
| Perplexity | `perplexity` |
| Adaption | `adaption` |
| Inception | `inception` |
| Auriko | `auriko` |
| Phala | `phala` |
| JZSTOKEN | `jzstoken` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Modal | `modal` |
| Entrim | `entrim` |
| OpenReason | `openreason` |
| Neon | `neon` |
| InferX | `inferx` |
| Oathbreaker AI | `oathbreaker` |
| Tencent Token Plan | `tencent-token-plan` |
| ClinePass | `cline-pass` |
| TensorX | `tensorx` |
| LongCat | `longcat` |
| OpenRouter | `openrouter` |
| abliteration.ai | `abliteration-ai` |
| TheRouter | `therouter` |
| SCNet Token Plan | `scnet-token-plan` |
| Rayline | `rayline` |
| Inco | `inco` |
| Friendli | `friendli` |
| Inference | `inference` |
| FreeModel | `freemodel` |
| Alibaba (China) | `alibaba-cn` |
| UncensuredAI | `uncensuredai` |
| LLM Tech | `llmtech` |
| LowRouter | `lowrouter` |
| Inceptron | `inceptron` |
| Amazon Bedrock | `amazon-bedrock` |
| Kosmik Compute | `kosmik` |
| Pioneer | `pioneer` |
| NEAR AI Cloud | `nearai` |
| Qiniu | `qiniu-ai` |
| DigitalOcean | `digitalocean` |
| TeamoRouter | `teamorouter` |
| InferAll | `inferall` |
| SiliconFlow (China) | `siliconflow-cn` |
| TokenRouter | `tokenrouter` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Zenifra | `zenifra` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Cerebras | `cerebras` |
| DeepSeek | `deepseek` |
| OCI Generative AI | `oci` |
| Isoquant | `isoquant` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Anthropic | `anthropic` |
| Nodecode | `nodecode` |
| Pareto Inference | `pareto` |
| Reflection | `reflection` |
| EBCloud | `ebcloud` |
| Bee by HEOSSI | `bee` |
| Morph | `morph` |
| NaN | `nan` |
| Sakana AI | `sakana` |
| Modular | `modular` |
| Kitani | `kitani` |
| CrossModel | `crossmodel` |
| Vancine | `vancine` |
| UnoRouter | `unorouter` |
| DevPass (LLM Gateway) | `llmgateway` |
| stepping stone AG | `stepping-stone` |
| Mistral | `mistral` |
| IteraCompute | `iteracompute` |
| Eden AI | `edenai` |
| DaoXE | `daoxe` |
| Pendra | `pendra` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Vultr | `vultr` |
| Databricks | `databricks` |
| ainetcafe | `ainetcafe` |
| Snowflake Cortex | `snowflake-cortex` |
| Umans AI | `umans-ai` |
| Hubris | `hubris` |
| LucidQuery | `lucidquery` |
| SAP AI Core | `sap-ai-core` |
| cheapaimodel | `cheapaimodel` |
| Moonshot AI (China) | `moonshotai-cn` |
| AnonRouter | `anonrouter` |
| Augure | `augure` |
| GitHub Copilot | `github-copilot` |
| D.Run (China) | `drun` |
| BytePlus ModelArk | `byteplus` |
| Adzuki AI | `adzuki` |
| Klavo AI | `klavo` |
| CoreWeave | `wandb` |
| Tencent TokenHub | `tencent-tokenhub` |
| Jiekou.AI | `jiekou` |
| Jad AI | `jad-ai` |
| SenseNova (China) | `sensenova` |
| Agnes AI | `agnes` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Ollama Cloud | `ollama-cloud` |
| Volcengine Ark | `volcengine` |
| QVAC | `qvac` |
| CheapestToken | `cheapest-token` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Vertex | `google-vertex` |
| Modelis | `modelis` |
| Teapot Router | `teapot-router` |
| LLMTR | `llmtr` |
| Jalapeno Cloud | `jalapeno` |
| Xpersona | `xpersona` |
| Echo | `echo` |
| FrogBot | `frogbot` |
| Inference Cooperative | `inference-coop` |
| Venice AI | `venice` |
| Crusoe | `crusoe` |
| Nebius Token Factory | `nebius` |
| GreenPT | `greenpt` |
| Gisoo | `gisoo` |
| Infersia | `infersia` |
| Infer by Flow7 | `infer` |
| Hugging Face | `huggingface` |
| Groq | `groq` |
| evroc | `evroc` |
| Watt Cloud | `watt` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| AI21 Labs | `ai21` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| NanoGPT | `nano-gpt` |
| Upstage | `upstage` |
| Alibaba Token Plan | `alibaba-token-plan` |
| LLM Gateway | `llmgateway-providers` |
| StepFun (China) | `stepfun` |
| Synthorai | `synthorai` |
| xxapi | `xxapi` |
| Novita AI | `novita-ai` |
| Xiaomi | `xiaomi` |
| ProxyStacks Relay | `proxystacks` |
| Outer Labs | `outerlabs` |
| Fireworks AI | `fireworks-ai` |
| StepFun (Global) | `stepfun-ai` |
| klokintegration.se | `klokintegration` |
| Arcee | `arcee` |
| Prime Inference | `prime` |
| Tenstorrent | `tenstorrent` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| JoinGonka | `joingonka` |
| engy | `engy` |
| Moonshot AI | `moonshotai` |
| LMStudio | `lmstudio` |
| Atomic Chat | `atomic-chat` |
| Keln | `keln` |
| TokenLab | `tokenlab` |
| Kenari | `kenari` |
| Vercel AI Gateway | `vercel` |
| nokeep | `nokeep` |
| ParalonCloud | `paraloncloud` |
| OpenAI | `openai` |
| Zro | `zro` |
| HUMAIN | `humain` |
| Frequency | `frequency` |
| LithosAI | `lithosai` |
| Wallaby | `wallaby` |
| AbliteratedLLM | `abliteratedllm` |
| GraphN | `graphn` |
| SCX.ai | `scx-ai` |
| Ofox | `ofox` |
| Azure | `azure` |
| above.dev | `above` |
| IO.NET | `io-net` |
| ai& | `aiand` |
| UplinkSwitch | `uplinkswitch` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Impossibl | `impossibl` |
| ZeroGPU | `zerogpu` |
| Thinking Machines | `thinkingmachines` |
| Abacus | `abacus` |
| Mixlayer | `mixlayer` |
| Scaleway | `scaleway` |
| Liquid Inference | `liquid` |
| Baseten | `baseten` |
| Mallard AI | `mallard` |
| OrcaRouter | `orcarouter` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Claudinio | `claudinio` |
| Chutes | `chutes` |
| routing.run | `routing-run` |
| OpenCode | `opencode` |
| Inferris | `inferris` |
| SparrowCodes | `sparrowcodes` |
| Bailing | `bailing` |
| Cortecs | `cortecs` |
| Pareto by Unbiased | `unbiased` |
| Bothub | `bothub` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Doubleword | `doubleword` |
| SaladCloud AI Gateway | `salad-cloud` |
| Tinfoil | `tinfoil` |
| ZenMux | `zenmux` |
| Neuralwatt | `neuralwatt` |
| Poe | `poe` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Moneo | `moneo` |
| CloudCode.ONE | `cloudcode` |
| MiniMax (minimax.io) | `minimax` |
| OpenCode Go | `opencode-go` |
| Aixy | `aixy` |
| Clarifai | `clarifai` |
| 50X | `fiftyx` |
| Sarvam AI | `sarvam` |
| Cohere | `cohere` |
| Refuseless | `refuseless` |
| Ezkielyna | `ezkielyna` |
| Fortytwo | `fortytwo` |
| CommandCode | `commandcode` |
| Regolo AI | `regolo-ai` |
| Zhipu AI | `zhipuai` |
| AI Power Grid | `aipg` |
| HPC-AI | `hpc-ai` |
| Logits | `logits` |
| Nova | `nova` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Hetzner | `hetzner` |
<!-- PROVIDERS:END -->

## License

MIT
