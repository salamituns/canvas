'use client'

import { NodeShell, type PresentationNodeProps } from './node-shell'

export function CodeBlockNode({ data }: PresentationNodeProps) {
	return (
		<NodeShell widthClassName="w-[380px]">
			<div className="rounded-xl border-2 border-dashed border-violet-300 bg-violet-50 px-5 py-4">
				<pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-700">
					<code>{data.code}</code>
				</pre>
			</div>
		</NodeShell>
	)
}
