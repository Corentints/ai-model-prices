# ai-model-prices

[![npm](https://img.shields.io/npm/v/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)
[![npm downloads](https://img.shields.io/npm/dm/ai-model-prices)](https://www.npmjs.com/package/ai-model-prices)

Pricing data for AI models, typed and kept up to date daily from [models.dev](https://models.dev).

<!-- STATS:START -->
**314 providers · 9744 models · Updated 2026-11-25**
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
| Phala | `phala` |
| Moneo | `moneo` |
| Keln | `keln` |
| Refuseless | `refuseless` |
| IO.NET | `io-net` |
| Entrim | `entrim` |
| Infomaniak | `infomaniak` |
| watsonx.ai | `watsonx` |
| Alibaba Token Plan | `alibaba-token-plan` |
| DeepSeek | `deepseek` |
| KUAE Cloud Coding Plan | `kuae-cloud-coding-plan` |
| Frequency | `frequency` |
| Databricks | `databricks` |
| OpenRouter | `openrouter` |
| Verda | `verda` |
| 302.AI | `302ai` |
| nokeep | `nokeep` |
| Adzuki AI | `adzuki` |
| HPC-AI | `hpc-ai` |
| NEAR AI Cloud | `nearai` |
| Jiekou.AI | `jiekou` |
| xAI | `xai` |
| cheapllm.shop | `cheapllm` |
| Bothub | `bothub` |
| SenseNova (China) | `sensenova` |
| Inference APIs | `inferenceapis` |
| Fireworks AI | `fireworks-ai` |
| superbot | `superbot-gg` |
| Venice AI | `venice` |
| CoralBricks | `coralbricks` |
| CedarLLM | `cedarllm` |
| AIGROW | `aigrow` |
| TokenGo | `tokengo` |
| 50X | `fiftyx` |
| SCNet Token Plan | `scnet-token-plan` |
| Subconscious | `subconscious` |
| Cerebras | `cerebras` |
| Azure | `azure` |
| Watt Cloud | `watt` |
| LLM Tech | `llmtech` |
| LithosAI | `lithosai` |
| Doubleword | `doubleword` |
| submodel | `submodel` |
| Xiaomi | `xiaomi` |
| LucidQuery | `lucidquery` |
| FastRouter | `fastrouter` |
| AMD | `amd` |
| Tencent Coding Plan (China) | `tencent-coding-plan` |
| ClinePass | `cline-pass` |
| QiHang | `qihang-ai` |
| Z.AI Coding Plan | `zai-coding-plan` |
| Snowflake Cortex | `snowflake-cortex` |
| Scaleway | `scaleway` |
| Tenstorrent | `tenstorrent` |
| xxapi | `xxapi` |
| Autarcho | `autarcho` |
| Moonshot AI (China) | `moonshotai-cn` |
| Groq | `groq` |
| Inference | `inference` |
| Wally | `wally` |
| Logits | `logits` |
| Ambient | `ambient` |
| Jad AI | `jad-ai` |
| Cortecs | `cortecs` |
| RunInfra | `runinfra` |
| Poolside | `poolside` |
| Zro | `zro` |
| Zeldoc | `zeldoc` |
| Lynkr | `lynkr` |
| NanoGPT | `nano-gpt` |
| Neuralwatt | `neuralwatt` |
| abliteration.ai | `abliteration-ai` |
| klokintegration.se | `klokintegration` |
| LLMTR | `llmtr` |
| AbliteratedLLM | `abliteratedllm` |
| Wallaby | `wallaby` |
| APIKO | `apiko` |
| CheapestToken | `cheapest-token` |
| SOKKAN Router | `sokkan` |
| Vispark | `vispark` |
| Tokenify | `tokenify` |
| Tencent Token Plan | `tencent-token-plan` |
| LLM Gateway | `llmgateway-providers` |
| Ofox | `ofox` |
| AI Power Grid | `aipg` |
| Pendra | `pendra` |
| Perplexity Agent | `perplexity-agent` |
| stepping stone AG | `stepping-stone` |
| InferX | `inferx` |
| ParalonCloud | `paraloncloud` |
| Bailing | `bailing` |
| Alibaba Coding Plan | `alibaba-coding-plan` |
| SCX.ai | `scx-ai` |
| Kilo Gateway | `kilo` |
| OpenCode | `opencode` |
| above.dev | `above` |
| SaladCloud AI Gateway | `salad-cloud` |
| Klavo AI | `klavo` |
| TokenWatt | `tokenwatt` |
| Augure | `augure` |
| Ezkielyna | `ezkielyna` |
| NeoSmith | `neosmith` |
| TokenLab | `tokenlab` |
| Morph | `morph` |
| DotHoosh | `dothoosh` |
| Inception | `inception` |
| GreenPT | `greenpt` |
| GitLab Duo | `gitlab` |
| Meta | `meta` |
| Alibaba | `alibaba` |
| NaN | `nan` |
| Munito AI | `munito` |
| Pareto Inference | `pareto` |
| Zhipu AI Coding Plan | `zhipuai-coding-plan` |
| Perplexity | `perplexity` |
| Hetzner | `hetzner` |
| Prime Inference | `prime` |
| Alibaba Coding Plan (China) | `alibaba-coding-plan-cn` |
| TeamoRouter | `teamorouter` |
| GitHub Copilot | `github-copilot` |
| Abacus | `abacus` |
| AIHubMix | `aihubmix` |
| TokenRouter | `tokenrouter` |
| Umans AI Coding Plan | `umans-ai-coding-plan` |
| Huawei Cloud MAAS | `huawei-maas` |
| Teapot Router | `teapot-router` |
| IteraCompute | `iteracompute` |
| SiliconFlow (China) | `siliconflow-cn` |
| DevPass (LLM Gateway) | `llmgateway` |
| Synthorai | `synthorai` |
| Echo | `echo` |
| Inceptron | `inceptron` |
| Vivgrid | `vivgrid` |
| Phase Router | `phase` |
| Opper | `opper` |
| Modelis | `modelis` |
| Pareto by Unbiased | `unbiased` |
| Unrestricted | `unrestricted` |
| Friendli | `friendli` |
| UplinkSwitch | `uplinkswitch` |
| Deep Infra | `deepinfra` |
| Bumo Router | `bumo` |
| MiniMax (minimax.io) | `minimax` |
| Volcengine Ark | `volcengine` |
| Vercel AI Gateway | `vercel` |
| OCI Generative AI | `oci` |
| Aixy | `aixy` |
| EmpirioLabs AI | `empiriolabs` |
| Zhipu AI | `zhipuai` |
| Arcee | `arcee` |
| Kitani | `kitani` |
| DaoXE | `daoxe` |
| evroc | `evroc` |
| Moonshot AI | `moonshotai` |
| LMStudio | `lmstudio` |
| Nebius Token Factory | `nebius` |
| Atomic Chat | `atomic-chat` |
| Vertex | `google-vertex` |
| routing.run | `routing-run` |
| Baseten | `baseten` |
| Moark | `moark` |
| ZeroGPU | `zerogpu` |
| ainetcafe | `ainetcafe` |
| Pioneer | `pioneer` |
| JZSTOKEN | `jzstoken` |
| Powerspring | `powerspring` |
| Infersia | `infersia` |
| Zenifra | `zenifra` |
| EBCloud | `ebcloud` |
| SiliconFlow | `siliconflow` |
| Alibaba (China) | `alibaba-cn` |
| Tinfoil | `tinfoil` |
| Mistral | `mistral` |
| Clarifai | `clarifai` |
| Hugging Face | `huggingface` |
| UnoRouter | `unorouter` |
| AI21 Labs | `ai21` |
| Poe | `poe` |
| Meganova | `meganova` |
| Crusoe | `crusoe` |
| ProxyStacks Relay | `proxystacks` |
| Rayline | `rayline` |
| Anthropic | `anthropic` |
| Concentrate | `concentrate` |
| Kimi For Coding (kimi.ai) | `kimi-code-plan-global` |
| Melious | `melious` |
| Together AI | `togetherai` |
| PrimaLabs | `primalabs` |
| UncensuredAI | `uncensuredai` |
| CrossModel | `crossmodel` |
| DInference | `dinference` |
| TensorX | `tensorx` |
| Z.AI | `zai` |
| engy | `engy` |
| Jalapeno Cloud | `jalapeno` |
| Neon | `neon` |
| TheRouter | `therouter` |
| Kosmik Compute | `kosmik` |
| Mixlayer | `mixlayer` |
| OrcaRouter | `orcarouter` |
| Xiaomi Token Plan (China) | `xiaomi-token-plan-cn` |
| HUMAIN | `humain` |
| Boundless | `boundless` |
| Inco | `inco` |
| Adaption | `adaption` |
| Sakana AI | `sakana` |
| Standard Compute | `standardcompute` |
| Obscurify.ai | `obscurify` |
| Cohere | `cohere` |
| Cloudflare Workers AI | `cloudflare-workers-ai` |
| GraphN | `graphn` |
| Alibaba Token Plan (China) | `alibaba-token-plan-cn` |
| Kunavo | `kunavo` |
| Tencent TokenHub | `tencent-tokenhub` |
| Berget.AI | `berget` |
| Amazon Bedrock | `amazon-bedrock` |
| Hopper | `hopper` |
| Vertex (Anthropic) | `google-vertex-anthropic` |
| Kimi For Coding (kimi.com) | `kimi-code-plan-cn` |
| LongCat | `longcat` |
| OVHcloud AI Endpoints | `ovhcloud` |
| LowRouter | `lowrouter` |
| Auriko | `auriko` |
| CloudCode.ONE | `cloudcode` |
| Munito AI (EU) | `munito-eu` |
| SandBase | `sandbase` |
| FrogBot | `frogbot` |
| Gisoo | `gisoo` |
| AKI.IO | `aki-io` |
| Xiaomi Token Plan (Singapore) | `xiaomi-token-plan-sgp` |
| SAP AI Core | `sap-ai-core` |
| AnonRouter | `anonrouter` |
| Nvidia | `nvidia` |
| DigitalOcean | `digitalocean` |
| Inference Cooperative | `inference-coop` |
| Vancine | `vancine` |
| D.Run (China) | `drun` |
| CommandCode | `commandcode` |
| Liquid Inference | `liquid` |
| Agnes AI | `agnes` |
| StepFun (Global) | `stepfun-ai` |
| InferAll | `inferall` |
| cheapaimodel | `cheapaimodel` |
| Merge Gateway | `merge-gateway` |
| STACKIT | `stackit` |
| MiniMax (minimax.cn) | `minimax-cn` |
| Azure Cognitive Services | `azure-cognitive-services` |
| Xpersona | `xpersona` |
| StepFun (China) | `stepfun` |
| Umans AI | `umans-ai` |
| Runcrate | `runcrate` |
| Privatemode AI | `privatemode-ai` |
| Requesty | `requesty` |
| Google | `google` |
| Hostinger Router | `hostinger-router` |
| Vultr | `vultr` |
| JoinGonka | `joingonka` |
| QVAC | `qvac` |
| Helicone | `helicone` |
| SAGG | `sagg` |
| Sarvam AI | `sarvam` |
| Bee by HEOSSI | `bee` |
| GMI Cloud | `gmicloud` |
| Isoquant | `isoquant` |
| Qiniu | `qiniu-ai` |
| Reflection | `reflection` |
| Charm Hyper | `hyper` |
| Modal | `modal` |
| Lyceum | `lyceum` |
| Nova | `nova` |
| Wafer | `wafer.ai` |
| ai& | `aiand` |
| MiniMax Token Plan (minimax.cn) | `minimax-cn-coding-plan` |
| Oathbreaker AI | `oathbreaker` |
| SambaNova | `sambanova` |
| Cloudflare AI Gateway | `cloudflare-ai-gateway` |
| Mallard AI | `mallard` |
| Synthetic | `synthetic` |
| AI-ROUTER | `ai-router` |
| Impossibl | `impossibl` |
| Thinking Machines | `thinkingmachines` |
| Regolo AI | `regolo-ai` |
| Eden AI | `edenai` |
| Infer by Flow7 | `infer` |
| RuAPI | `ruapi` |
| Ollama Cloud | `ollama-cloud` |
| Nodecode | `nodecode` |
| OpenCode Go | `opencode-go` |
| KoRouter | `korouter` |
| CloudFerro Sherlock | `cloudferro-sherlock` |
| CoreWeave | `wandb` |
| AI/ML API | `aimlapi` |
| Chutes | `chutes` |
| Novita AI | `novita-ai` |
| ZenMux | `zenmux` |
| Volcengine Ark Coding Plan | `volcengine-coding-plan` |
| Upstage | `upstage` |
| Outer Labs | `outerlabs` |
| Fortytwo | `fortytwo` |
| Confidential AI | `confidential-ai` |
| Kenari | `kenari` |
| SparrowCodes | `sparrowcodes` |
| BytePlus ModelArk | `byteplus` |
| ModelScope | `modelscope` |
| meraGPT | `meragpt` |
| Xiaomi Token Plan (Europe) | `xiaomi-token-plan-ams` |
| MiniMax Token Plan (minimax.io) | `minimax-coding-plan` |
| Hubris | `hubris` |
| OpenAI | `openai` |
| FreeModel | `freemodel` |
| Claudinio | `claudinio` |
| OpenReason | `openreason` |
| Inferris | `inferris` |
| Modular | `modular` |
<!-- PROVIDERS:END -->

## License

MIT
