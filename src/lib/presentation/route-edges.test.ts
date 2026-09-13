import { describe, expect, it } from 'vitest'
import { pickEdgeHandles } from './route-edges'

describe('pickEdgeHandles', () => {
	it('uses bottom to top when the target sits below the source', () => {
		expect(
			pickEdgeHandles({ x: 0, y: 0 }, { x: 10, y: 200 }),
		).toEqual({
			sourceHandle: 'source-bottom',
			targetHandle: 'target-top',
		})
	})

	it('uses right to left when the target sits to the right', () => {
		expect(
			pickEdgeHandles({ x: 0, y: 40 }, { x: 400, y: 50 }),
		).toEqual({
			sourceHandle: 'source-right',
			targetHandle: 'target-left',
		})
	})

	it('uses top to bottom when the target sits above the source', () => {
		expect(
			pickEdgeHandles({ x: 0, y: 200 }, { x: 0, y: 0 }),
		).toEqual({
			sourceHandle: 'source-top',
			targetHandle: 'target-bottom',
		})
	})
})
