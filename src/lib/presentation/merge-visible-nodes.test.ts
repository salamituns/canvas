import { describe, expect, it } from 'vitest'
import type { PresentationNode } from './types'
import { mergeVisibleNodes } from './filter-graph'

const jsonNodes: PresentationNode[] = [
	{
		id: 'a',
		type: 'TextCard',
		position: { x: 0, y: 0 },
		data: { step: 1, title: 'A' },
	},
	{
		id: 'b',
		type: 'TextCard',
		position: { x: 100, y: 0 },
		data: { step: 2, title: 'B' },
	},
]

describe('mergeVisibleNodes', () => {
	it('keeps dragged coordinates for nodes that stay on the canvas', () => {
		const dragged = [
			{
				id: 'a',
				type: 'TextCard',
				position: { x: 40, y: 80 },
				data: { step: 1, title: 'A' },
			},
		]

		const merged = mergeVisibleNodes(jsonNodes.slice(0, 1), dragged)
		expect(merged[0]?.position).toEqual({ x: 40, y: 80 })
	})

	it('uses JSON coordinates for newly revealed nodes', () => {
		const live = [
			{
				id: 'a',
				type: 'TextCard',
				position: { x: 40, y: 80 },
				data: { step: 1, title: 'A' },
			},
		]

		const merged = mergeVisibleNodes(jsonNodes, live)
		expect(merged.map((node) => node.position)).toEqual([
			{ x: 40, y: 80 },
			{ x: 100, y: 0 },
		])
	})

	it('does not mutate the JSON source nodes', () => {
		const live = [
			{
				id: 'a',
				type: 'TextCard',
				position: { x: 9, y: 9 },
				data: { step: 1, title: 'A' },
			},
		]

		mergeVisibleNodes(jsonNodes, live)
		expect(jsonNodes[0]?.position).toEqual({ x: 0, y: 0 })
	})
})
