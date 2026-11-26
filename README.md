# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**314 providers · 9599 models · Updated 2026-11-26**
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
| CloudFerro Sherlock | `cloudferro-sherlock` |
| Kitani | `kitani` |
| Opper | `opper` |
| Mistral | `mistral` |
| SparrowCodes | `sparrowcodes` |
| ParalonCloud | `paraloncloud` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Inceptron | `inceptron` |
| Phase Router | `phase` |
| Azure | `azure` |
| HPC-AI | `hpc-ai` |
| CloudCode.ONE | `cloudcode` |
| Inference | `inference` |
| CedarLLM | `cedarllm` |
| CheapestToken | `cheapest-token` |
| JZSTOKEN | `jzstoken` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Z.AI | `zai` |
| SCNet Token Plan | `scnet-token-plan` |
| Fortytwo | `fortytwo` |
| DeepSeek | `deepseek` |
| LLMTR | `llmtr` |
| stepping stone AG | `stepping-stone` |
| Teapot Router | `teapot-router` |
| Adzuki AI | `adzuki` |
| LowRouter | `lowrouter` |
| FastRouter | `fastrouter` |
| Clarifai | `clarifai` |
| Gisoo | `gisoo` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| watsonx.ai | `watsonx` |
| OpenReason | `openreason` |
| OpenCode | `opencode` |
| AbliteratedLLM | `abliteratedllm` |
| Logits | `logits` |
| Tencent Token Plan | `tencent-token-plan` |
| Inco | `inco` |
| JoinGonka | `joingonka` |
| NEAR AI Cloud | `nearai` |
| Tokenify | `tokenify` |
| Sakana AI | `sakana` |
| Helicone | `helicone` |
| nokeep | `nokeep` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| Klavo AI | `klavo` |
| DotHoosh | `dothoosh` |
| LucidQuery | `lucidquery` |
| LongCat | `longcat` |
| FrogBot | `frogbot` |
| Morph | `morph` |
| QVAC | `qvac` |
| Databricks | `databricks` |
| Confidential AI | `confidential-ai` |
| Hopper | `hopper` |
| Perplexity Agent | `perplexity-agent` |
| meraGPT | `meragpt` |
| Oathbreaker AI | `oathbreaker` |
| Moark | `moark` |
| LMStudio | `lmstudio` |
| StepFun (China) | `stepfun` |
| AI21 Labs | `ai21` |
| Hostinger Router | `hostinger-router` |
| APIKO | `apiko` |
| Bothub | `bothub` |
| Synthetic | `synthetic` |
| Qiniu | `qiniu-ai` |
| Pareto Inference | `pareto` |
| Novita AI | `novita-ai` |
| klokintegration.se | `klokintegration` |
| Jiekou.AI | `jiekou` |
| Regolo AI | `regolo-ai` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| Alibaba (China) | `alibaba-cn` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| xxapi | `xxapi` |
| SiliconFlow | `siliconflow` |
| LithosAI | `lithosai` |
| MiniMax (minimax.io) | `minimax` |
| Cerebras | `cerebras` |
| AMD | `amd` |
| DigitalOcean | `digitalocean` |
| SCX.ai | `scx-ai` |
| routing.run | `routing-run` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| GraphN | `graphn` |
| Atomic Chat | `atomic-chat` |
| Modular | `modular` |
| TokenGo | `tokengo` |
| Azure Cognitive Services | `azure-cognitive-services` |
| DInference | `dinference` |
| CoreWeave | `wandb` |
| IO.NET | `io-net` |
| Kunavo | `kunavo` |
| Kosmik Compute | `kosmik` |
| AI/ML API | `aimlapi` |
| xAI | `xai` |
| Privatemode AI | `privatemode-ai` |
| Hetzner | `hetzner` |
| 50X | `fiftyx` |
| Cortecs | `cortecs` |
| SambaNova | `sambanova` |
| Abacus | `abacus` |
| Aixy | `aixy` |
| InferX | `inferx` |
| Vercel AI Gateway | `vercel` |
| Xpersona | `xpersona` |
| KoRouter | `korouter` |
| Modelis | `modelis` |
| Xiaomi | `xiaomi` |
| Standard Compute | `standardcompute` |
| StepFun (Global) | `stepfun-ai` |
| AI-ROUTER | `ai-router` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Wallaby | `wallaby` |
| Outer Labs | `outerlabs` |
| SiliconFlow (China) | `siliconflow-cn` |
| NanoGPT | `nano-gpt` |
| Friendli | `friendli` |
| submodel | `submodel` |
| cheapllm.shop | `cheapllm` |
| Ambient | `ambient` |
| Berget.AI | `berget` |
| Google | `google` |
| Kenari | `kenari` |
| Echo | `echo` |
| ai& | `aiand` |
| Wally | `wally` |
| Vultr | `vultr` |
| IteraCompute | `iteracompute` |
| Infer by Flow7 | `infer` |
| Arcee | `arcee` |
| SAP AI Core | `sap-ai-core` |
| Bailing | `bailing` |
| OCI Generative AI | `oci` |
| Poolside | `poolside` |
| QiHang | `qihang-ai` |
| FreeModel | `freemodel` |
| Powerspring | `powerspring` |
| SenseNova (China) | `sensenova` |
| Prime Inference | `prime` |
| Crusoe | `crusoe` |
| LLM Gateway | `llmgateway-providers` |
| Jad AI | `jad-ai` |
| Groq | `groq` |
| Liquid Inference | `liquid` |
| Snowflake Cortex | `snowflake-cortex` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| engy | `engy` |
| Vancine | `vancine` |
| Modal | `modal` |
| SOKKAN Router | `sokkan` |
| Phala | `phala` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Agnes AI | `agnes` |
| Melious | `melious` |
| NaN | `nan` |
| TheRouter | `therouter` |
| Inference APIs | `inferenceapis` |
| SandBase | `sandbase` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Jalapeno Cloud | `jalapeno` |
| Pioneer | `pioneer` |
| Mallard AI | `mallard` |
| ProxyStacks Relay | `proxystacks` |
| Moneo | `moneo` |
| Lynkr | `lynkr` |
| Subconscious | `subconscious` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| Munito AI (EU) | `munito-eu` |
| Ollama Cloud | `ollama-cloud` |
| Alibaba | `alibaba` |
| Nova | `nova` |
| Nodecode | `nodecode` |
| Thinking Machines | `thinkingmachines` |
| ClinePass | `cline-pass` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Bumo Router | `bumo` |
| AIHubMix | `aihubmix` |
| Nvidia | `nvidia` |
| Claudinio | `claudinio` |
| Doubleword | `doubleword` |
| Munito AI | `munito` |
| Concentrate | `concentrate` |
| Charm Hyper | `hyper` |
| Boundless | `boundless` |
| Kilo Gateway | `kilo` |
| GreenPT | `greenpt` |
| TokenWatt | `tokenwatt` |
| Meganova | `meganova` |
| Pareto by Unbiased | `unbiased` |
| Amazon Bedrock | `amazon-bedrock` |
| Alibaba Token Plan | `alibaba-token-plan` |
| AKI.IO | `aki-io` |
| SAGG | `sagg` |
| OrcaRouter | `orcarouter` |
| above.dev | `above` |
| abliteration.ai | `abliteration-ai` |
| Adaption | `adaption` |
| Huawei Cloud MAAS | `huawei-maas` |
| Baseten | `baseten` |
| Infomaniak | `infomaniak` |
| Bee by HEOSSI | `bee` |
| GitHub Copilot | `github-copilot` |
| Runcrate | `runcrate` |
| TeamoRouter | `teamorouter` |
| Inference Cooperative | `inference-coop` |
| Infersia | `infersia` |
| Chutes | `chutes` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Ofox | `ofox` |
| Deep Infra | `deepinfra` |
| Zhipu AI | `zhipuai` |
| Watt Cloud | `watt` |
| Moonshot AI | `moonshotai` |
| Tenstorrent | `tenstorrent` |
| Synthorai | `synthorai` |
| Volcengine Ark | `volcengine` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| Tinfoil | `tinfoil` |
| Zeldoc | `zeldoc` |
| Keln | `keln` |
| D.Run (China) | `drun` |
| DevPass (LLM Gateway) | `llmgateway` |
| Hugging Face | `huggingface` |
| Ezkielyna | `ezkielyna` |
| GMI Cloud | `gmicloud` |
| Vertex | `google-vertex` |
| Lyceum | `lyceum` |
| OVHcloud AI Endpoints | `ovhcloud` |
| Verda | `verda` |
| Scaleway | `scaleway` |
| STACKIT | `stackit` |
| Inferris | `inferris` |
| Tencent TokenHub | `tencent-tokenhub` |
| CrossModel | `crossmodel` |
| Refuseless | `refuseless` |
| DaoXE | `daoxe` |
| Unrestricted | `unrestricted` |
| RuAPI | `ruapi` |
| SaladCloud AI Gateway | `salad-cloud` |
| ModelScope | `modelscope` |
| InferAll | `inferall` |
| UnoRouter | `unorouter` |
| Fireworks AI | `fireworks-ai` |
| OpenCode Go | `opencode-go` |
| evroc | `evroc` |
| CommandCode | `commandcode` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Poe | `poe` |
| Autarcho | `autarcho` |
| Impossibl | `impossibl` |
| Together AI | `togetherai` |
| ZeroGPU | `zerogpu` |
| HUMAIN | `humain` |
| Venice AI | `venice` |
| Obscurify.ai | `obscurify` |
| Augure | `augure` |
| TokenRouter | `tokenrouter` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Reflection | `reflection` |
| Rayline | `rayline` |
| MiniMax (minimax.cn) | `minimax-cn` |
| NeoSmith | `neosmith` |
| Perplexity | `perplexity` |
| 302.AI | `302ai` |
| Entrim | `entrim` |
| AIGROW | `aigrow` |
| Anthropic | `anthropic` |
| Vivgrid | `vivgrid` |
| EBCloud | `ebcloud` |
| EmpirioLabs AI | `empiriolabs` |
| Mixlayer | `mixlayer` |
| Sarvam AI | `sarvam` |
| Zenifra | `zenifra` |
| CoralBricks | `coralbricks` |
| UncensuredAI | `uncensuredai` |
| Inception | `inception` |
| Vispark | `vispark` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| ZenMux | `zenmux` |
| Cohere | `cohere` |
| OpenAI | `openai` |
| ainetcafe | `ainetcafe` |
| Umans AI | `umans-ai` |
| TokenLab | `tokenlab` |
| Eden AI | `edenai` |
| Auriko | `auriko` |
| Frequency | `frequency` |
| Nebius Token Factory | `nebius` |
| AI Power Grid | `aipg` |
| Neon | `neon` |
| Pendra | `pendra` |
| TensorX | `tensorx` |
| Zro | `zro` |
| RunInfra | `runinfra` |
| Neuralwatt | `neuralwatt` |
| Meta | `meta` |
| AnonRouter | `anonrouter` |
| Moonshot AI (China) | `moonshotai-cn` |
| cheapaimodel | `cheapaimodel` |
| Isoquant | `isoquant` |
| PrimaLabs | `primalabs` |
| Upstage | `upstage` |
| Wafer | `wafer.ai` |
| superbot | `superbot-gg` |
| OpenRouter | `openrouter` |
| Hubris | `hubris` |
| GitLab Duo | `gitlab` |
| BytePlus ModelArk | `byteplus` |
| LLM Tech | `llmtech` |
| Requesty | `requesty` |
| Merge Gateway | `merge-gateway` |
| UplinkSwitch | `uplinkswitch` |
<!-- PROVIDERS:END -->

## License

MIT
