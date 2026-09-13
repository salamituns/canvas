import { MarkerType, type Edge } from '@xyflow/react'
import type { NodePosition, PresentationEdge } from './types'

export const EDGE_STROKE = '#334155'

export function pickEdgeHandles(
	source: NodePosition,
	target: NodePosition,
): { sourceHandle: string; targetHandle: string } {
	const dx = target.x - source.x
	const dy = target.y - source.y

	if (Math.abs(dy) >= Math.abs(dx)) {
		if (dy >= 0) {
			return {
				sourceHandle: 'source-bottom',
				targetHandle: 'target-top',
			}
		}

		return {
			sourceHandle: 'source-top',
			targetHandle: 'target-bottom',
		}
	}

	if (dx >= 0) {
		return {
			sourceHandle: 'source-right',
			targetHandle: 'target-left',
		}
	}

	return {
		sourceHandle: 'source-left',
		targetHandle: 'target-right',
	}
}

export function toFlowEdges(
	edges: PresentationEdge[],
	nodes: Array<{ id: string; position: NodePosition }>,
): Edge[] {
	const positions = new Map(nodes.map((node) => [node.id, node.position]))

	return edges.map((edge) => {
		const source = positions.get(edge.source)
		const target = positions.get(edge.target)
		const handles =
			source && target
				? pickEdgeHandles(source, target)
				: {
						sourceHandle: 'source-right',
						targetHandle: 'target-left',
					}

		return {
			id: edge.id,
			source: edge.source,
			target: edge.target,
			sourceHandle: handles.sourceHandle,
			targetHandle: handles.targetHandle,
			label: edge.label,
			type: 'smoothstep',
			animated: true,
			pathOptions: {
				borderRadius: 28,
				offset: 16,
			},
			markerEnd: {
				type: MarkerType.ArrowClosed,
				width: 18,
				height: 18,
				color: EDGE_STROKE,
			},
			style: {
				stroke: EDGE_STROKE,
				strokeWidth: 1.75,
				strokeDasharray: '7 6',
			},
		}
	})
}
