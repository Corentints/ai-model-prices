import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

type ProviderData = { name: string; models: Record<string, { name: string }> };

const data: Record<string, ProviderData> = JSON.parse(
  await readFile(join(import.meta.dirname, '../src/data.json'), 'utf-8'),
);

await mkdir(join(import.meta.dirname, '../dist/adapters'), { recursive: true });

const quote = (value: string) => JSON.stringify(value);
const union = (values: string[]) => values.map(quote).join(' | ');

await Promise.all(
  Object.entries(data).flatMap(([providerId, provider]) => {
    const modelIds = Object.keys(provider.models);
    const modelNames = [...new Set(Object.values(provider.models).map((model) => model.name))];

    const cjs = [
      '"use strict";',
      'Object.defineProperty(exports,"__esModule",{value:true});',
      'const{getModelsByProvider:_gm,getModel:_gmod,getPrice:_gp}=require("../index.js");',
      `const pid=${quote(providerId)};`,
      'const getModels=()=>_gm(pid);exports.getModels=getModels;',
      'const getModel=id=>_gmod(pid,id);exports.getModel=getModel;',
      'const getPrice=(id,tokens)=>_gp(pid,id,tokens);exports.getPrice=getPrice;',
    ].join('\n');

    const esm = [
      'import{getModelsByProvider as _gm,getModel as _gmod,getPrice as _gp}from"../index.mjs";',
      `const pid=${quote(providerId)};`,
      'export const getModels=()=>_gm(pid);',
      'export const getModel=id=>_gmod(pid,id);',
      'export const getPrice=(id,tokens)=>_gp(pid,id,tokens);',
    ].join('\n');

    const buildDts = (indexRef: string) =>
      [
        `import type{Model,PriceBreakdown,TokenUsage}from'${indexRef}';`,
        `export type ModelId=${union(modelIds)};`,
        `export type ModelName=${union(modelNames)};`,
        'export declare function getModels():Model[];',
        'export declare function getModel(id:ModelId):Model|undefined;',
        'export declare function getPrice(id:ModelId,tokens:TokenUsage):PriceBreakdown|null;',
      ].join('\n');

    const distFile = (filename: string) => join(import.meta.dirname, `../dist/adapters/${filename}`);
    return [
      writeFile(distFile(`${providerId}.js`), cjs),
      writeFile(distFile(`${providerId}.mjs`), esm),
      writeFile(distFile(`${providerId}.d.ts`), buildDts('../index.js')),
      writeFile(distFile(`${providerId}.d.mts`), buildDts('../index.mjs')),
    ];
  }),
);

console.log(`Generated ${Object.keys(data).length} adapters in dist/adapters/`);
