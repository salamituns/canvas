/**
 * Product-agnostic deck schema. JSON in public/presentations/*.json
 * is the source of truth; React Flow only renders a filtered view.
 */

export interface NodePosition {
	x: number
	y: number
}

/**
 * Payload plus the integer that gates when this node appears.
 * Extra keys are allowed so product decks can carry custom fields.
 */
export interface PresentationNodeData {
	step: number
	title?: string
	body?: string
	code?: string
	language?: string
	src?: string
	alt?: string
	caption?: string
	[key: string]: unknown
}

export interface PresentationNode {
	id: string
	type: string
	position: NodePosition
	data: PresentationNodeData
}

export interface PresentationEdge {
	id: string
	source: string
	target: string
	step: number
	label?: string
	animated?: boolean
}

export interface PresentationConfig {
	title: string
	slug: string
	steps: number
	initialNodes: PresentationNode[]
	initialEdges: PresentationEdge[]
}
