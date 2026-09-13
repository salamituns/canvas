'use client'

import Image from 'next/image'
import { NodeShell, type PresentationNodeProps } from './node-shell'

export function ImageCardNode({ data }: PresentationNodeProps) {
	const src = typeof data.src === 'string' ? data.src : '/globe.svg'
	const alt = typeof data.alt === 'string' ? data.alt : ''
	const isCurrent = data.isCurrent === true

	return (
		<NodeShell widthClassName="w-[300px]">
			<div
				className={
					isCurrent
						? 'rounded-2xl border border-sky-300 bg-sky-50 p-5 text-center shadow-sm'
						: 'rounded-2xl border border-slate-200 bg-slate-100 p-5 text-center shadow-sm'
				}
			>
				{data.title ? (
					<p className="text-[15px] font-semibold text-slate-800">
						{data.title}
					</p>
				) : null}
				<div className="mt-3 flex h-32 items-center justify-center overflow-hidden rounded-lg bg-white/70">
					<Image
						src={src}
						alt={alt}
						width={160}
						height={120}
						className="object-contain"
					/>
				</div>
				{data.caption ? (
					<p className="mt-2 text-sm text-slate-500">{data.caption}</p>
				) : null}
			</div>
		</NodeShell>
	)
}
