# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**312 providers · 9554 models · Updated 2026-11-19**
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
| Privatemode AI | `privatemode-ai` |
| Together AI | `togetherai` |
| Doubleword | `doubleword` |
| Bee by HEOSSI | `bee` |
| Pioneer | `pioneer` |
| Lynkr | `lynkr` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| Venice AI | `venice` |
| Mixlayer | `mixlayer` |
| Tokenify | `tokenify` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| LLM Tech | `llmtech` |
| CrossModel | `crossmodel` |
| Qiniu | `qiniu-ai` |
| AMD | `amd` |
| Phala | `phala` |
| stepping stone AG | `stepping-stone` |
| TeamoRouter | `teamorouter` |
| Hugging Face | `huggingface` |
| Kosmik Compute | `kosmik` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Arcee | `arcee` |
| xAI | `xai` |
| Morph | `morph` |
| Munito AI | `munito` |
| SenseNova (China) | `sensenova` |
| DigitalOcean | `digitalocean` |
| above.dev | `above` |
| AIHubMix | `aihubmix` |
| Meta | `meta` |
| ai& | `aiand` |
| Snowflake Cortex | `snowflake-cortex` |
| Novita AI | `novita-ai` |
| ParalonCloud | `paraloncloud` |
| Fortytwo | `fortytwo` |
| Claudinio | `claudinio` |
| SiliconFlow (China) | `siliconflow-cn` |
| Modal | `modal` |
| Entrim | `entrim` |
| GraphN | `graphn` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| Vivgrid | `vivgrid` |
| TokenWatt | `tokenwatt` |
| 50X | `fiftyx` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Frequency | `frequency` |
| NanoGPT | `nano-gpt` |
| SCNet Token Plan | `scnet-token-plan` |
| StepFun (Global) | `stepfun-ai` |
| Hopper | `hopper` |
| Alibaba | `alibaba` |
| SAGG | `sagg` |
| Ollama Cloud | `ollama-cloud` |
| SandBase | `sandbase` |
| CheapestToken | `cheapest-token` |
| Synthorai | `synthorai` |
| SiliconFlow | `siliconflow` |
| Perplexity | `perplexity` |
| SAP AI Core | `sap-ai-core` |
| Melious | `melious` |
| JoinGonka | `joingonka` |
| HUMAIN | `humain` |
| Xpersona | `xpersona` |
| Neuralwatt | `neuralwatt` |
| Poe | `poe` |
| Clarifai | `clarifai` |
| Anthropic | `anthropic` |
| BytePlus ModelArk | `byteplus` |
| Ezkielyna | `ezkielyna` |
| Aixy | `aixy` |
| Confidential AI | `confidential-ai` |
| InferX | `inferx` |
| Nvidia | `nvidia` |
| Isoquant | `isoquant` |
| TokenGo | `tokengo` |
| Keln | `keln` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Ambient | `ambient` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| AI/ML API | `aimlapi` |
| TokenLab | `tokenlab` |
| Berget.AI | `berget` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| CloudCode.ONE | `cloudcode` |
| Upstage | `upstage` |
| EmpirioLabs AI | `empiriolabs` |
| Infer by Flow7 | `infer` |
| InferAll | `inferall` |
| xxapi | `xxapi` |
| APIKO | `apiko` |
| Standard Compute | `standardcompute` |
| ModelScope | `modelscope` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Meganova | `meganova` |
| Fireworks AI | `fireworks-ai` |
| Cerebras | `cerebras` |
| JZSTOKEN | `jzstoken` |
| EBCloud | `ebcloud` |
| IteraCompute | `iteracompute` |
| Mistral | `mistral` |
| Kitani | `kitani` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Moonshot AI | `moonshotai` |
| OpenCode Go | `opencode-go` |
| Tinfoil | `tinfoil` |
| Umans AI | `umans-ai` |
| Bailing | `bailing` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Nova | `nova` |
| Rayline | `rayline` |
| Agnes AI | `agnes` |
| Huawei Cloud MAAS | `huawei-maas` |
| Helicone | `helicone` |
| superbot | `superbot-gg` |
| AbliteratedLLM | `abliteratedllm` |
| Jalapeno Cloud | `jalapeno` |
| Synthetic | `synthetic` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Runcrate | `runcrate` |
| ProxyStacks Relay | `proxystacks` |
| Tenstorrent | `tenstorrent` |
| watsonx.ai | `watsonx` |
| StepFun (China) | `stepfun` |
| Alibaba (China) | `alibaba-cn` |
| Verda | `verda` |
| OCI Generative AI | `oci` |
| DotHoosh | `dothoosh` |
| Tencent Token Plan | `tencent-token-plan` |
| CoreWeave | `wandb` |
| RunInfra | `runinfra` |
| Vancine | `vancine` |
| NEAR AI Cloud | `nearai` |
| Moonshot AI (China) | `moonshotai-cn` |
| Wallaby | `wallaby` |
| Z.AI | `zai` |
| Ofox | `ofox` |
| AI21 Labs | `ai21` |
| KoRouter | `korouter` |
| FastRouter | `fastrouter` |
| Liquid Inference | `liquid` |
| NaN | `nan` |
| CedarLLM | `cedarllm` |
| LLMTR | `llmtr` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| OpenCode | `opencode` |
| Lyceum | `lyceum` |
| Perplexity Agent | `perplexity-agent` |
| Hostinger Router | `hostinger-router` |
| Zro | `zro` |
| Zeldoc | `zeldoc` |
| Baseten | `baseten` |
| Vertex | `google-vertex` |
| NeoSmith | `neosmith` |
| Teapot Router | `teapot-router` |
| Azure | `azure` |
| DInference | `dinference` |
| TokenRouter | `tokenrouter` |
| Subconscious | `subconscious` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| QVAC | `qvac` |
| engy | `engy` |
| Auriko | `auriko` |
| IO.NET | `io-net` |
| Sarvam AI | `sarvam` |
| Inference APIs | `inferenceapis` |
| Crusoe | `crusoe` |
| MiniMax (minimax.io) | `minimax` |
| klokintegration.se | `klokintegration` |
| Friendli | `friendli` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| UnoRouter | `unorouter` |
| Bothub | `bothub` |
| Inception | `inception` |
| Kenari | `kenari` |
| Inference Cooperative | `inference-coop` |
| AKI.IO | `aki-io` |
| SCX.ai | `scx-ai` |
| Hetzner | `hetzner` |
| LongCat | `longcat` |
| Inceptron | `inceptron` |
| Cortecs | `cortecs` |
| Watt Cloud | `watt` |
| Outer Labs | `outerlabs` |
| DevPass (LLM Gateway) | `llmgateway` |
| LMStudio | `lmstudio` |
| Infomaniak | `infomaniak` |
| AI-ROUTER | `ai-router` |
| SparrowCodes | `sparrowcodes` |
| Zenifra | `zenifra` |
| DaoXE | `daoxe` |
| Eden AI | `edenai` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Bumo Router | `bumo` |
| meraGPT | `meragpt` |
| Obscurify.ai | `obscurify` |
| Modelis | `modelis` |
| UncensuredAI | `uncensuredai` |
| Thinking Machines | `thinkingmachines` |
| RuAPI | `ruapi` |
| OpenAI | `openai` |
| Vultr | `vultr` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Jad AI | `jad-ai` |
| Inferris | `inferris` |
| Cohere | `cohere` |
| Augure | `augure` |
| Poolside | `poolside` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| Impossibl | `impossibl` |
| HPC-AI | `hpc-ai` |
| abliteration.ai | `abliteration-ai` |
| Groq | `groq` |
| Moark | `moark` |
| GitLab Duo | `gitlab` |
| Pendra | `pendra` |
| Munito AI (EU) | `munito-eu` |
| Merge Gateway | `merge-gateway` |
| Oathbreaker AI | `oathbreaker` |
| Xiaomi | `xiaomi` |
| cheapllm.shop | `cheapllm` |
| Hubris | `hubris` |
| Moneo | `moneo` |
| DeepSeek | `deepseek` |
| Amazon Bedrock | `amazon-bedrock` |
| Vispark | `vispark` |
| TensorX | `tensorx` |
| GitHub Copilot | `github-copilot` |
| Scaleway | `scaleway` |
| Nebius Token Factory | `nebius` |
| Pareto Inference | `pareto` |
| Wally | `wally` |
| routing.run | `routing-run` |
| OpenRouter | `openrouter` |
| Tencent TokenHub | `tencent-tokenhub` |
| Vercel AI Gateway | `vercel` |
| Logits | `logits` |
| OrcaRouter | `orcarouter` |
| Zhipu AI | `zhipuai` |
| Refuseless | `refuseless` |
| LowRouter | `lowrouter` |
| Neon | `neon` |
| Abacus | `abacus` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Reflection | `reflection` |
| 302.AI | `302ai` |
| Opper | `opper` |
| Inco | `inco` |
| SOKKAN Router | `sokkan` |
| Charm Hyper | `hyper` |
| Boundless | `boundless` |
| Autarcho | `autarcho` |
| UplinkSwitch | `uplinkswitch` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Inference | `inference` |
| Gisoo | `gisoo` |
| AIGROW | `aigrow` |
| Deep Infra | `deepinfra` |
| Pareto by Unbiased | `unbiased` |
| LucidQuery | `lucidquery` |
| QiHang | `qihang-ai` |
| Volcengine Ark | `volcengine` |
| Requesty | `requesty` |
| ClinePass | `cline-pass` |
| D.Run (China) | `drun` |
| AI Power Grid | `aipg` |
| STACKIT | `stackit` |
| Phase Router | `phase` |
| Mallard AI | `mallard` |
| submodel | `submodel` |
| ZenMux | `zenmux` |
| Echo | `echo` |
| Kilo Gateway | `kilo` |
| OpenReason | `openreason` |
| CommandCode | `commandcode` |
| Infersia | `infersia` |
| evroc | `evroc` |
| Prime Inference | `prime` |
| GMI Cloud | `gmicloud` |
| nokeep | `nokeep` |
| FrogBot | `frogbot` |
| Jiekou.AI | `jiekou` |
| Regolo AI | `regolo-ai` |
| AnonRouter | `anonrouter` |
| Modular | `modular` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Klavo AI | `klavo` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| ainetcafe | `ainetcafe` |
| Atomic Chat | `atomic-chat` |
| cheapaimodel | `cheapaimodel` |
| Unrestricted | `unrestricted` |
| CoralBricks | `coralbricks` |
| Alibaba Token Plan | `alibaba-token-plan` |
| SambaNova | `sambanova` |
| Adaption | `adaption` |
| TheRouter | `therouter` |
| Adzuki AI | `adzuki` |
| Wafer | `wafer.ai` |
| ZeroGPU | `zerogpu` |
| GreenPT | `greenpt` |
| Sakana AI | `sakana` |
| LLM Gateway | `llmgateway-providers` |
| Powerspring | `powerspring` |
| MiniMax (minimax.cn) | `minimax-cn` |
| LithosAI | `lithosai` |
| SaladCloud AI Gateway | `salad-cloud` |
| Kunavo | `kunavo` |
| Databricks | `databricks` |
| FreeModel | `freemodel` |
| Nodecode | `nodecode` |
| Google | `google` |
| Chutes | `chutes` |
<!-- PROVIDERS:END -->

## License

MIT
