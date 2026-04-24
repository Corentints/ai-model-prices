import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { getPrice } from '../src/pricing.js';
import { getPrice as getPriceByString } from '../src/index.js';
import type { Model } from '../src/types.js';

function model(cost: Model['cost']): Model {
    return { id: 'test', name: 'Test', cost };
}

// Round to 6 decimal places to avoid floating point errors
function round(n: number) {
    return Math.round(n * 1_000_000) / 1_000_000;
}

function closeTo(actual: number, expected: number, precision = 6) {
    const diff = Math.abs(actual - expected);
    assert.ok(diff < Math.pow(10, -precision), `expected ${actual} to be close to ${expected}`);
}

describe('getPrice - basics', () => {
    it('returns null when no cost', () => {
        assert.equal(getPrice(model(undefined), { noCacheInput: 1000 }), null);
    });

    it('computes simple input + output', () => {
        const price = getPrice(model({ input: 3, output: 15 }), { noCacheInput: 1_000_000, noCacheOutput: 500_000 });
        assert.ok(price);
        // 1M * 3/1M = 3, 0.5M * 15/1M = 7.5
        assert.equal(price.noCacheInput, 3);
        assert.equal(price.noCacheOutput, 7.5);
        assert.equal(price.total, 10.5);
    });

    it('handles zero tokens', () => {
        const price = getPrice(model({ input: 3, output: 15 }), {});
        assert.ok(price);
        assert.equal(price.total, 0);
    });
});

describe('getPrice - cache read/write', () => {
    it('computes cache read and cache write', () => {
        const price = getPrice(
            model({ input: 3, output: 15, cache_read: 0.3, cache_write: 3.75 }),
            { noCacheInput: 500_000, noCacheOutput: 200_000, cacheInput: 300_000, cacheWrite: 100_000 },
        );
        assert.ok(price);
        assert.equal(price.noCacheInput, 1.5);
        assert.equal(price.noCacheOutput, 3);
        closeTo(price.cacheInput, 0.09);
        assert.equal(price.cacheWrite, 0.375);
        assert.equal(round(price.total), round(1.5 + 3 + 0.09 + 0.375));
    });

    it('missing cache_read rate => cacheInput = 0', () => {
        const price = getPrice(model({ input: 3, output: 15 }), { cacheInput: 100_000 });
        assert.ok(price);
        assert.equal(price.cacheInput, 0);
    });
});

describe('getPrice - reasoning', () => {
    it('uses reasoning rate when defined', () => {
        const price = getPrice(
            model({ input: 0.7, output: 2.8, reasoning: 8.4 }),
            { noCacheInput: 100_000, noCacheOutput: 50_000, reasoning: 200_000 },
        );
        assert.ok(price);
        closeTo(price.reasoning, 1.68);
    });

    it('falls back to output rate when reasoning undefined', () => {
        const price = getPrice(
            model({ input: 3, output: 15 }),
            { reasoning: 100_000 },
        );
        assert.ok(price);
        assert.equal(price.reasoning, 1.5);
    });
});

describe('getPrice - context_over_200k', () => {
    it('uses normal rates under 200k', () => {
        const price = getPrice(
            model({ input: 5, output: 30, context_over_200k: { input: 10, output: 45 } }),
            { noCacheInput: 100_000, noCacheOutput: 50_000 },
        );
        assert.ok(price);
        assert.equal(price.noCacheInput, 0.5);
        assert.equal(price.noCacheOutput, 1.5);
    });

    it('uses higher rates above 200k', () => {
        const price = getPrice(
            model({ input: 5, output: 30, context_over_200k: { input: 10, output: 45 } }),
            { noCacheInput: 180_000, noCacheOutput: 30_000 },
        );
        assert.ok(price);
        closeTo(price.noCacheInput, 1.8);
        closeTo(price.noCacheOutput, 1.35);
    });

    it('exact threshold at 200_001', () => {
        const price = getPrice(
            model({ input: 5, output: 30, context_over_200k: { input: 10, output: 45 } }),
            { noCacheInput: 200_001, noCacheOutput: 0 },
        );
        assert.ok(price);
        closeTo(price.noCacheInput, 200_001 / 1_000_000 * 10);
    });
});

describe('getPrice - audio', () => {
    it('computes audio tokens', () => {
        const price = getPrice(
            model({ input: 0.5, output: 2, input_audio: 3, output_audio: 12 }),
            { noCacheInput: 100_000, noCacheOutput: 50_000, inputAudio: 10_000, outputAudio: 5_000 },
        );
        assert.ok(price);
        closeTo(price.audio, 0.09);
    });

    it('audio = 0 when no audio rate', () => {
        const price = getPrice(
            model({ input: 3, output: 15 }),
            { inputAudio: 10_000, outputAudio: 5_000 },
        );
        assert.ok(price);
        assert.equal(price.audio, 0);
    });
});

// Real model tests from data.json
describe('real model pricing', () => {
    it('claude-sonnet-4-6 - basic usage', () => {
        const price = getPriceByString('anthropic/claude-sonnet-4-6', {
            noCacheInput: 1_000_000,
            noCacheOutput: 100_000,
        });
        assert.ok(price);
        assert.equal(price.noCacheInput, 3);
        assert.equal(price.noCacheOutput, 1.5);
        assert.equal(price.total, 4.5);
    });

    it('claude-sonnet-4-6 - with cache', () => {
        const price = getPriceByString('anthropic/claude-sonnet-4-6', {
            noCacheInput: 500_000,
            noCacheOutput: 100_000,
            cacheInput: 400_000,
            cacheWrite: 200_000,
        });
        assert.ok(price);
        assert.equal(price.noCacheInput, 1.5);
        assert.equal(price.noCacheOutput, 1.5);
        closeTo(price.cacheInput, 0.12);
        assert.equal(price.cacheWrite, 0.75);
        assert.equal(round(price.total), round(1.5 + 1.5 + 0.12 + 0.75));
    });

    it('claude-opus-4-5 - expensive usage', () => {
        const price = getPriceByString('anthropic/claude-opus-4-5-20251101', {
            noCacheInput: 2_000_000,
            noCacheOutput: 500_000,
        });
        assert.ok(price);
        assert.equal(price.noCacheInput, 10);
        assert.equal(price.noCacheOutput, 12.5);
        assert.equal(price.total, 22.5);
    });

    it('gpt-5-mini - budget model', () => {
        const price = getPriceByString('openai/gpt-5-mini', {
            noCacheInput: 10_000_000,
            noCacheOutput: 1_000_000,
            cacheInput: 5_000_000,
        });
        assert.ok(price);
        assert.equal(price.noCacheInput, 2.5);
        assert.equal(price.noCacheOutput, 2);
        assert.equal(price.cacheInput, 0.125);
        assert.equal(round(price.total), round(2.5 + 2 + 0.125));
    });

    it('gpt-5.5 - context_over_200k', () => {
        const priceUnder = getPriceByString('openai/gpt-5.5', {
            noCacheInput: 100_000,
            noCacheOutput: 50_000,
        });
        assert.ok(priceUnder);
        assert.equal(priceUnder.noCacheInput, 0.5);
        assert.equal(priceUnder.noCacheOutput, 1.5);

        const priceOver = getPriceByString('openai/gpt-5.5', {
            noCacheInput: 180_000,
            noCacheOutput: 30_000,
        });
        assert.ok(priceOver);
        closeTo(priceOver.noCacheInput, 1.8);
        closeTo(priceOver.noCacheOutput, 1.35);
    });

    it('gemini-live audio', () => {
        const price = getPriceByString('google/gemini-live-2.5-flash-preview-native-audio', {
            noCacheInput: 100_000,
            noCacheOutput: 50_000,
            inputAudio: 20_000,
            outputAudio: 10_000,
        });
        assert.ok(price);
        assert.equal(price.noCacheInput, 0.05);
        assert.equal(price.noCacheOutput, 0.1);
        closeTo(price.audio, 0.18);
    });

    it('returns null for non-existent model', () => {
        assert.equal(getPriceByString('openai/inexistant-xyz', { noCacheInput: 1000 }), null);
    });
});
