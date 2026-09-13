import { describe, expect, it } from 'vitest'
import type { PresentationConfig } from './types'
import { getVisibleGraph } from './filter-graph'

const deck: PresentationConfig = {
	title: 'Test deck',
	slug: 'test-deck',
	steps: 3,
	initialNodes: [
		{
			id: 'a',
			type: 'TextCard',
			position: { x: 0, y: 0 },
			data: { step: 1, title: 'Intro' },
		},
		{
			id: 'b',
			type: 'CodeBlock',
			position: { x: 280, y: 0 },
			data: { step: 2, title: 'Code', code: 'const x = 1' },
		},
		{
			id: 'c',
			type: 'ImageCard',
			position: { x: 560, y: 0 },
			data: { step: 3, title: 'Image', src: '/next.svg', alt: 'logo' },
		},
	],
	initialEdges: [
		{ id: 'e-ab', source: 'a', target: 'b', step: 2 },
		{ id: 'e-bc', source: 'b', target: 'c', step: 3 },
	],
}

describe('getVisibleGraph', () => {
	it('shows only nodes whose step is less than or equal to the current step', () => {
		const { nodes, edges } = getVisibleGraph(deck, 1)

		expect(nodes.map((node) => node.id)).toEqual(['a'])
		expect(edges).toEqual([])
	})

	it('reveals later nodes and edges without mutating the source arrays', () => {
		const originalNodeCount = deck.initialNodes.length
		const originalEdgeCount = deck.initialEdges.length

		const stepTwo = getVisibleGraph(deck, 2)
		expect(stepTwo.nodes.map((node) => node.id)).toEqual(['a', 'b'])
		expect(stepTwo.edges.map((edge) => edge.id)).toEqual(['e-ab'])

		expect(deck.initialNodes).toHaveLength(originalNodeCount)
		expect(deck.initialEdges).toHaveLength(originalEdgeCount)
		expect(deck.initialNodes[1]?.data.step).toBe(2)
	})

	it('hides an edge until both endpoints are visible', () => {
		const leakyDeck: PresentationConfig = {
			...deck,
			initialEdges: [
				{ id: 'e-ac', source: 'a', target: 'c', step: 1 },
			],
		}

		const { edges } = getVisibleGraph(leakyDeck, 1)
		expect(edges).toEqual([])
	})

	it('clamps the current step into [1, steps]', () => {
		expect(getVisibleGraph(deck, 0).nodes).toHaveLength(1)
		expect(getVisibleGraph(deck, 99).nodes).toHaveLength(3)
	})
})
