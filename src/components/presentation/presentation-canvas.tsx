'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
	applyNodeChanges,
	Background,
	BackgroundVariant,
	Controls,
	MarkerType,
	ReactFlow,
	useEdgesState,
	useNodesState,
	type DefaultEdgeOptions,
	type Node,
	type NodeChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { PresentationConfig } from '@/lib/presentation/types'
import { getVisibleGraph, mergeVisibleNodes } from '@/lib/presentation/filter-graph'
import { EDGE_STROKE, toFlowEdges } from '@/lib/presentation/route-edges'
import { presentationNodeTypes } from './node-registry'
import { StepControls } from './step-controls'

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: 'smoothstep',
	animated: true,
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

function withCurrentStep(nodes: Node[], step: number): Node[] {
	return nodes.map((node) => ({
		...node,
		data: {
			...node.data,
			isCurrent:
				typeof node.data.step === 'number' &&
				node.data.step === step,
		},
	}))
}

interface PresentationCanvasProps {
	config: PresentationConfig
}

export function PresentationCanvas({ config }: PresentationCanvasProps) {
	const [step, setStep] = useState(1)
	const initialGraph = getVisibleGraph(config, 1)
	const draggedPositions = useRef(new Map<string, { x: number; y: number }>())

	const [nodes, setNodes, onNodesChange] = useNodesState(
		withCurrentStep(initialGraph.nodes as Node[], 1),
	)
	const [edges, setEdges, onEdgesChange] = useEdgesState(
		toFlowEdges(initialGraph.edges, initialGraph.nodes),
	)

	useEffect(() => {
		const visible = getVisibleGraph(config, step)
		const live = Array.from(
			draggedPositions.current,
			([id, position]) => ({ id, position }),
		)
		const merged = withCurrentStep(
			mergeVisibleNodes(visible.nodes as Node[], live),
			step,
		)

		setNodes(merged)
		setEdges(toFlowEdges(visible.edges, merged))
	}, [config, step, setNodes, setEdges])

	const handleNodesChange = useCallback(
		(changes: NodeChange[]) => {
			onNodesChange(changes)

			const nextNodes = applyNodeChanges(changes, nodes)
			for (const change of changes) {
				if (change.type === 'position' && change.position) {
					draggedPositions.current.set(change.id, change.position)
				}
			}

			const visible = getVisibleGraph(config, step)
			setEdges(toFlowEdges(visible.edges, nextNodes))
		},
		[config, nodes, onNodesChange, setEdges, step],
	)

	const handlePrevious = useCallback(() => {
		setStep((current) => Math.max(1, current - 1))
	}, [])

	const handleNext = useCallback(() => {
		setStep((current) => Math.min(config.steps, current + 1))
	}, [config.steps])

	const handleReset = useCallback(() => {
		setStep(1)
	}, [])

	return (
		<div className="relative h-screen w-screen overflow-hidden bg-white">
			<StepControls
				title={config.title}
				step={step}
				steps={config.steps}
				onPrevious={handlePrevious}
				onNext={handleNext}
				onReset={handleReset}
			/>
			<ReactFlow
				className="h-screen w-screen bg-white"
				nodes={nodes}
				edges={edges}
				onNodesChange={handleNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={presentationNodeTypes}
				defaultEdgeOptions={defaultEdgeOptions}
				nodesDraggable={true}
				nodesConnectable={false}
				elementsSelectable={true}
				panOnDrag={true}
				zoomOnScroll={true}
				zoomOnPinch={true}
				fitView
				colorMode="light"
			>
				<Background
					variant={BackgroundVariant.Dots}
					gap={22}
					size={1}
					color="#e2e8f0"
				/>
				<Controls
					position="bottom-left"
					showInteractive={false}
					className="!border-slate-200 !bg-white !shadow-sm"
				/>
			</ReactFlow>
		</div>
	)
}
