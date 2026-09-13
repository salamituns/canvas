import type { PresentationConfig } from './types'

export function clampStep(currentStep: number, totalSteps: number): number {
	if (totalSteps < 1) {
		return 1
	}

	return Math.min(totalSteps, Math.max(1, currentStep))
}

/**
 * Derive the visible graph for a step. Source arrays stay intact so
 * Reset / scrubbing never mutates the loaded JSON.
 */
export function getVisibleGraph(
	config: PresentationConfig,
	currentStep: number,
) {
	const step = clampStep(currentStep, config.steps)
	const nodes = config.initialNodes.filter(
		(node) => node.data.step <= step,
	)
	const visibleIds = new Set(nodes.map((node) => node.id))
	const edges = config.initialEdges.filter(
		(edge) =>
			edge.step <= step &&
			visibleIds.has(edge.source) &&
			visibleIds.has(edge.target),
	)

	return { nodes, edges, step }
}

/**
 * Overlay live drag coordinates onto the filtered JSON nodes.
 * JSON remains the source of identity; RF state only remembers x/y.
 */
export function mergeVisibleNodes<
	T extends { id: string; position: { x: number; y: number } },
>(visibleNodes: T[], liveNodes: Array<{ id: string; position: { x: number; y: number } }>): T[] {
	const positions = new Map(
		liveNodes.map((node) => [node.id, node.position]),
	)

	return visibleNodes.map((node) => {
		const dragged = positions.get(node.id)
		if (!dragged) {
			return node
		}

		return {
			...node,
			position: { x: dragged.x, y: dragged.y },
		}
	})
}
