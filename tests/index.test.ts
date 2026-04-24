import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { getPrice, getProviders, getProvider, getModels, getModelsByProvider, getModel, filterModels } from '../src/index.js';

describe('getProviders', () => {
    it('returns a non-empty array', () => {
        const providers = getProviders();
        assert.ok(providers.length > 0);
    });

    it('every provider has an id and a name', () => {
        for (const p of getProviders()) {
            assert.ok(p.id);
            assert.ok(p.name);
        }
    });
});

describe('getProvider', () => {
    it('returns openai', () => {
        const p = getProvider('openai');
        assert.ok(p);
        assert.equal(p.id, 'openai');
        assert.equal(p.name, 'OpenAI');
    });

    it('returns undefined for unknown provider', () => {
        assert.equal(getProvider('inconnu-xyz'), undefined);
    });
});

describe('getModels', () => {
    it('returns a non-empty array with providerId', () => {
        const models = getModels();
        assert.ok(models.length > 0);
        for (const m of models.slice(0, 5)) {
            assert.ok(m.providerId);
            assert.ok(m.providerName);
            assert.ok(m.id);
        }
    });
});

describe('getModelsByProvider', () => {
    it('returns anthropic models', () => {
        const models = getModelsByProvider('anthropic');
        assert.ok(models.length > 0);
        assert.ok(models.some(m => m.id.includes('claude')));
    });

    it('returns an empty array for unknown provider', () => {
        assert.deepEqual(getModelsByProvider('inconnu-xyz'), []);
    });
});

describe('getModel', () => {
    it('returns an existing model', () => {
        const m = getModel('anthropic', 'claude-sonnet-4-6');
        assert.ok(m);
        assert.equal(m.id, 'claude-sonnet-4-6');
        assert.ok(m.cost);
    });

    it('returns undefined for unknown model', () => {
        assert.equal(getModel('openai', 'nope-999'), undefined);
    });

    it('returns undefined for unknown provider', () => {
        assert.equal(getModel('inconnu-xyz', 'gpt-4o'), undefined);
    });
});

describe('getPrice via string id', () => {
    it('computes a price with provider/model string', () => {
        const price = getPrice('anthropic/claude-sonnet-4-6', { noCacheInput: 1000, noCacheOutput: 500 });
        assert.ok(price);
        assert.ok(price.total > 0);
    });

    it('returns null for unknown model', () => {
        assert.equal(getPrice('openai/nope-999', { noCacheInput: 100 }), null);
    });
});

describe('filterModels', () => {
    it('filters by provider', () => {
        const models = filterModels({ provider: 'anthropic' });
        assert.ok(models.length > 0);
        for (const m of models) {
            assert.equal(m.providerId, 'anthropic');
        }
    });

    it('filters by maxInputCost', () => {
        const models = filterModels({ maxInputCost: 1 });
        for (const m of models) {
            assert.ok(m.cost!.input <= 1);
        }
    });

    it('filters by minContextWindow', () => {
        const models = filterModels({ minContextWindow: 200_000 });
        for (const m of models) {
            assert.ok(m.limit!.context >= 200_000);
        }
    });

    it('filters by multiple providers', () => {
        const models = filterModels({ provider: ['openai', 'anthropic'] });
        const providerIds = new Set(models.map(m => m.providerId));
        assert.ok(providerIds.size <= 2);
        for (const pid of providerIds) {
            assert.ok(['openai', 'anthropic'].includes(pid));
        }
    });
});
