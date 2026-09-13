'use client'

import dynamic from 'next/dynamic'
import type { PresentationConfig } from '@/lib/presentation/types'

const Canvas = dynamic(
	() =>
		import('./presentation-canvas').then((mod) => mod.PresentationCanvas),
	{
		ssr: false,
		loading: () => (
			<div className="flex h-screen w-screen items-center justify-center bg-white text-sm text-slate-400">
				Loading canvas…
			</div>
		),
	},
)

export function PresentationCanvasLoader({
	config,
}: {
	config: PresentationConfig
}) {
	return <Canvas key={config.slug} config={config} />
}
