import type { ReactNode } from 'react'

export default function PresentLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className="h-screen w-screen overflow-hidden bg-white">
			{children}
		</div>
	)
}
