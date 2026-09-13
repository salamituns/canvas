import { describe, expect, it } from 'vitest'
import { getPresentationConfig, isSafePresentationSlug } from './get-presentation'

describe('isSafePresentationSlug', () => {
	it('accepts kebab-case slugs', () => {
		expect(isSafePresentationSlug('site-selection')).toBe(true)
		expect(isSafePresentationSlug('architecture')).toBe(true)
	})

	it('rejects path traversal and unexpected characters', () => {
		expect(isSafePresentationSlug('../secret')).toBe(false)
		expect(isSafePresentationSlug('site selection')).toBe(false)
		expect(isSafePresentationSlug('site/selection')).toBe(false)
		expect(isSafePresentationSlug('')).toBe(false)
	})
})

describe('getPresentationConfig', () => {
	it('loads a JSON deck from public/presentations by slug', async () => {
		const config = await getPresentationConfig('site-selection')

		expect(config?.slug).toBe('site-selection')
		expect(config?.steps).toBeGreaterThan(0)
		expect(config?.initialNodes.length).toBeGreaterThan(0)
		expect(config?.initialNodes[0]?.position).toEqual(
			expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }),
		)
		expect(config?.initialNodes[0]?.data.step).toEqual(expect.any(Number))
	})

	it('returns null for a missing or unsafe slug', async () => {
		expect(await getPresentationConfig('does-not-exist')).toBeNull()
		expect(await getPresentationConfig('../package')).toBeNull()
	})
})
