'use client'

import { NodeShell, type PresentationNodeProps } from './node-shell'

export function TextCardNode({ data }: PresentationNodeProps) {
	const highlighted =
		data.tone === 'sky' ||
		(data.tone !== 'slate' && data.isCurrent === true)

	return (
		<NodeShell>
			<div
				className={
					highlighted
						? 'rounded-2xl border border-sky-300 bg-sky-50 px-8 py-4 text-center shadow-sm'
						: 'rounded-2xl border border-slate-200 bg-slate-100 px-8 py-4 text-center shadow-sm'
				}
			>
				{data.title ? (
					<p className="text-[15px] font-semibold text-slate-800">
						{data.title}
					</p>
				) : null}
				{data.body ? (
					<p className="mt-1 text-sm text-slate-500">{data.body}</p>
				) : null}
			</div>
		</NodeShell>
	)
}
