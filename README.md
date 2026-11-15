# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**312 providers · 9446 models · Updated 2026-11-15**
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
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Inference APIs | `inferenceapis` |
| Moonshot AI | `moonshotai` |
| Crusoe | `crusoe` |
| QiHang | `qihang-ai` |
| UncensuredAI | `uncensuredai` |
| Jad AI | `jad-ai` |
| Reflection | `reflection` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| Kitani | `kitani` |
| ZeroGPU | `zerogpu` |
| Ofox | `ofox` |
| GreenPT | `greenpt` |
| Requesty | `requesty` |
| Pareto by Unbiased | `unbiased` |
| Modal | `modal` |
| Thinking Machines | `thinkingmachines` |
| CoreWeave | `wandb` |
| NaN | `nan` |
| Synthetic | `synthetic` |
| xAI | `xai` |
| Eden AI | `edenai` |
| TeamoRouter | `teamorouter` |
| CoralBricks | `coralbricks` |
| OpenRouter | `openrouter` |
| 302.AI | `302ai` |
| Zeldoc | `zeldoc` |
| CedarLLM | `cedarllm` |
| LucidQuery | `lucidquery` |
| ProxyStacks Relay | `proxystacks` |
| submodel | `submodel` |
| Moark | `moark` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| SCNet Token Plan | `scnet-token-plan` |
| Hetzner | `hetzner` |
| Nodecode | `nodecode` |
| Meta | `meta` |
| Anthropic | `anthropic` |
| engy | `engy` |
| Friendli | `friendli` |
| Doubleword | `doubleword` |
| Infersia | `infersia` |
| Obscurify.ai | `obscurify` |
| Inferris | `inferris` |
| nokeep | `nokeep` |
| Venice AI | `venice` |
| SCX.ai | `scx-ai` |
| Vertex | `google-vertex` |
| Moonshot AI (China) | `moonshotai-cn` |
| Augure | `augure` |
| SAP AI Core | `sap-ai-core` |
| xxapi | `xxapi` |
| AI Power Grid | `aipg` |
| Zhipu AI | `zhipuai` |
| Synthorai | `synthorai` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| AbliteratedLLM | `abliteratedllm` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Mixlayer | `mixlayer` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Regolo AI | `regolo-ai` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Wally | `wally` |
| OrcaRouter | `orcarouter` |
| LLM Tech | `llmtech` |
| ZenMux | `zenmux` |
| Munito AI (EU) | `munito-eu` |
| Subconscious | `subconscious` |
| Phase Router | `phase` |
| JZSTOKEN | `jzstoken` |
| klokintegration.se | `klokintegration` |
| NEAR AI Cloud | `nearai` |
| Aixy | `aixy` |
| Modelis | `modelis` |
| Zenifra | `zenifra` |
| Vancine | `vancine` |
| Vivgrid | `vivgrid` |
| Infomaniak | `infomaniak` |
| Perplexity | `perplexity` |
| Powerspring | `powerspring` |
| Meganova | `meganova` |
| Nvidia | `nvidia` |
| LongCat | `longcat` |
| TheRouter | `therouter` |
| Tencent TokenHub | `tencent-tokenhub` |
| Boundless | `boundless` |
| GitHub Copilot | `github-copilot` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Perplexity Agent | `perplexity-agent` |
| Cohere | `cohere` |
| TensorX | `tensorx` |
| OpenCode | `opencode` |
| Poe | `poe` |
| SambaNova | `sambanova` |
| StepFun (China) | `stepfun` |
| ClinePass | `cline-pass` |
| routing.run | `routing-run` |
| Entrim | `entrim` |
| Amazon Bedrock | `amazon-bedrock` |
| Echo | `echo` |
| Logits | `logits` |
| Nova | `nova` |
| Sakana AI | `sakana` |
| Vultr | `vultr` |
| MiniMax (minimax.io) | `minimax` |
| GMI Cloud | `gmicloud` |
| ModelScope | `modelscope` |
| Ollama Cloud | `ollama-cloud` |
| Tokenify | `tokenify` |
| SiliconFlow | `siliconflow` |
| Fireworks AI | `fireworks-ai` |
| stepping stone AG | `stepping-stone` |
| Together AI | `togetherai` |
| Hopper | `hopper` |
| Kenari | `kenari` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Bee by HEOSSI | `bee` |
| Impossibl | `impossibl` |
| Huawei Cloud MAAS | `huawei-maas` |
| ParalonCloud | `paraloncloud` |
| ai& | `aiand` |
| Hubris | `hubris` |
| AIHubMix | `aihubmix` |
| Berget.AI | `berget` |
| QVAC | `qvac` |
| StepFun (Global) | `stepfun-ai` |
| Kosmik Compute | `kosmik` |
| meraGPT | `meragpt` |
| Neuralwatt | `neuralwatt` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Bothub | `bothub` |
| Xiaomi | `xiaomi` |
| SAGG | `sagg` |
| CheapestToken | `cheapest-token` |
| InferX | `inferx` |
| Outer Labs | `outerlabs` |
| EmpirioLabs AI | `empiriolabs` |
| Charm Hyper | `hyper` |
| Azure | `azure` |
| MiniMax (minimax.cn) | `minimax-cn` |
| LLM Gateway | `llmgateway-providers` |
| above.dev | `above` |
| evroc | `evroc` |
| LowRouter | `lowrouter` |
| DigitalOcean | `digitalocean` |
| Keln | `keln` |
| AKI.IO | `aki-io` |
| GitLab Duo | `gitlab` |
| superbot | `superbot-gg` |
| RunInfra | `runinfra` |
| LLMTR | `llmtr` |
| EBCloud | `ebcloud` |
| Neon | `neon` |
| Deep Infra | `deepinfra` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Vispark | `vispark` |
| CrossModel | `crossmodel` |
| IO.NET | `io-net` |
| SaladCloud AI Gateway | `salad-cloud` |
| Mistral | `mistral` |
| IteraCompute | `iteracompute` |
| Chutes | `chutes` |
| GraphN | `graphn` |
| Prime Inference | `prime` |
| cheapaimodel | `cheapaimodel` |
| Atomic Chat | `atomic-chat` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Databricks | `databricks` |
| Upstage | `upstage` |
| abliteration.ai | `abliteration-ai` |
| HPC-AI | `hpc-ai` |
| Verda | `verda` |
| DeepSeek | `deepseek` |
| Adaption | `adaption` |
| Alibaba | `alibaba` |
| DotHoosh | `dothoosh` |
| Novita AI | `novita-ai` |
| Opper | `opper` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Bumo Router | `bumo` |
| AnonRouter | `anonrouter` |
| ainetcafe | `ainetcafe` |
| OpenReason | `openreason` |
| Alibaba (China) | `alibaba-cn` |
| D.Run (China) | `drun` |
| AI21 Labs | `ai21` |
| Wafer | `wafer.ai` |
| Refuseless | `refuseless` |
| OVHcloud AI Endpoints | `ovhcloud` |
| CloudCode.ONE | `cloudcode` |
| Agnes AI | `agnes` |
| DaoXE | `daoxe` |
| Tencent Token Plan | `tencent-token-plan` |
| LMStudio | `lmstudio` |
| Claudinio | `claudinio` |
| Inco | `inco` |
| Xpersona | `xpersona` |
| Poolside | `poolside` |
| Hostinger Router | `hostinger-router` |
| UplinkSwitch | `uplinkswitch` |
| Rayline | `rayline` |
| Tinfoil | `tinfoil` |
| Ambient | `ambient` |
| SandBase | `sandbase` |
| Teapot Router | `teapot-router` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Hugging Face | `huggingface` |
| Pareto Inference | `pareto` |
| NeoSmith | `neosmith` |
| Privatemode AI | `privatemode-ai` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| HUMAIN | `humain` |
| Arcee | `arcee` |
| Volcengine Ark | `volcengine` |
| cheapllm.shop | `cheapllm` |
| Z.AI | `zai` |
| TokenRouter | `tokenrouter` |
| Moneo | `moneo` |
| Groq | `groq` |
| FastRouter | `fastrouter` |
| Gisoo | `gisoo` |
| Phala | `phala` |
| SenseNova (China) | `sensenova` |
| Baseten | `baseten` |
| STACKIT | `stackit` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Nebius Token Factory | `nebius` |
| Frequency | `frequency` |
| Inference Cooperative | `inference-coop` |
| Runcrate | `runcrate` |
| Jiekou.AI | `jiekou` |
| Inference | `inference` |
| Auriko | `auriko` |
| Modular | `modular` |
| TokenWatt | `tokenwatt` |
| InferAll | `inferall` |
| Kilo Gateway | `kilo` |
| Fortytwo | `fortytwo` |
| TokenGo | `tokengo` |
| Cortecs | `cortecs` |
| Munito AI | `munito` |
| Liquid Inference | `liquid` |
| Vercel AI Gateway | `vercel` |
| OCI Generative AI | `oci` |
| DInference | `dinference` |
| Clarifai | `clarifai` |
| Sarvam AI | `sarvam` |
| Autarcho | `autarcho` |
| Klavo AI | `klavo` |
| Infer by Flow7 | `infer` |
| FrogBot | `frogbot` |
| SparrowCodes | `sparrowcodes` |
| Melious | `melious` |
| Oathbreaker AI | `oathbreaker` |
| Standard Compute | `standardcompute` |
| Morph | `morph` |
| AI-ROUTER | `ai-router` |
| UnoRouter | `unorouter` |
| Inceptron | `inceptron` |
| Isoquant | `isoquant` |
| KoRouter | `korouter` |
| Helicone | `helicone` |
| Pendra | `pendra` |
| DevPass (LLM Gateway) | `llmgateway` |
| OpenCode Go | `opencode-go` |
| Pioneer | `pioneer` |
| Bailing | `bailing` |
| RuAPI | `ruapi` |
| Mallard AI | `mallard` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Zro | `zro` |
| SiliconFlow (China) | `siliconflow-cn` |
| Cerebras | `cerebras` |
| AI/ML API | `aimlapi` |
| Confidential AI | `confidential-ai` |
| Abacus | `abacus` |
| LithosAI | `lithosai` |
| Adzuki AI | `adzuki` |
| CommandCode | `commandcode` |
| SOKKAN Router | `sokkan` |
| TokenLab | `tokenlab` |
| 50X | `fiftyx` |
| Lyceum | `lyceum` |
| Google | `google` |
| NanoGPT | `nano-gpt` |
| Watt Cloud | `watt` |
| Lynkr | `lynkr` |
| Ezkielyna | `ezkielyna` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| watsonx.ai | `watsonx` |
| Merge Gateway | `merge-gateway` |
| AMD | `amd` |
| Jalapeno Cloud | `jalapeno` |
| Qiniu | `qiniu-ai` |
| OpenAI | `openai` |
| FreeModel | `freemodel` |
| JoinGonka | `joingonka` |
| BytePlus ModelArk | `byteplus` |
| Wallaby | `wallaby` |
| Alibaba Token Plan | `alibaba-token-plan` |
| Tenstorrent | `tenstorrent` |
| Umans AI | `umans-ai` |
| Unrestricted | `unrestricted` |
| APIKO | `apiko` |
| Scaleway | `scaleway` |
| AIGROW | `aigrow` |
| Snowflake Cortex | `snowflake-cortex` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Kunavo | `kunavo` |
| Inception | `inception` |
<!-- PROVIDERS:END -->

## License

MIT
