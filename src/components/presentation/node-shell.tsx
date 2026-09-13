import type { ReactNode } from 'react'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import type { PresentationNodeData } from '@/lib/presentation/types'

export type PresentationFlowNode = Node<PresentationNodeData>

const handleClassName =
	'!z-10 !size-2.5 !rounded-full !border-2 !border-slate-400 !bg-slate-200'

const handlePositions = [
	{ type: 'target' as const, id: 'target-top', position: Position.Top },
	{ type: 'source' as const, id: 'source-top', position: Position.Top },
	{ type: 'target' as const, id: 'target-right', position: Position.Right },
	{ type: 'source' as const, id: 'source-right', position: Position.Right },
	{ type: 'target' as const, id: 'target-bottom', position: Position.Bottom },
	{ type: 'source' as const, id: 'source-bottom', position: Position.Bottom },
	{ type: 'target' as const, id: 'target-left', position: Position.Left },
	{ type: 'source' as const, id: 'source-left', position: Position.Left },
]

export function NodeShell({
	children,
	widthClassName = 'w-[280px]',
}: {
	children: ReactNode
	widthClassName?: string
}) {
	return (
		<div className={`relative ${widthClassName}`}>
			{handlePositions.map((handle) => (
				<Handle
					key={handle.id}
					type={handle.type}
					id={handle.id}
					position={handle.position}
					className={handleClassName}
				/>
			))}
			{children}
		</div>
	)
}

export type PresentationNodeProps = NodeProps<PresentationFlowNode>
