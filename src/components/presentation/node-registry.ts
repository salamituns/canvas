import type { NodeTypes } from '@xyflow/react'
import { TextCardNode } from './text-card-node'
import { CodeBlockNode } from './code-block-node'
import { ImageCardNode } from './image-card-node'

/**
 * JSON `type` strings map here. Add a component and a key to
 * introduce a new visual without touching the canvas.
 */
export const presentationNodeTypes = {
	TextCard: TextCardNode,
	CodeBlock: CodeBlockNode,
	ImageCard: ImageCardNode,
	// TODO: register another type here (e.g. MetricCard) and point a JSON node at it
} satisfies NodeTypes
