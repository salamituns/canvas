'use client'

import { useCallback, useEffect } from 'react'

interface StepControlsProps {
	title: string
	step: number
	steps: number
	onPrevious: () => void
	onNext: () => void
	onReset: () => void
}

const chromeButtonClassName =
	'rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'

export function StepControls({
	title,
	step,
	steps,
	onPrevious,
	onNext,
	onReset,
}: StepControlsProps) {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'ArrowRight' || event.key === ' ') {
				event.preventDefault()
				onNext()
			} else if (event.key === 'ArrowLeft') {
				event.preventDefault()
				onPrevious()
			} else if (event.key === 'Home') {
				event.preventDefault()
				onReset()
			}
		},
		[onNext, onPrevious, onReset],
	)

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	return (
		<>
			<header className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-6 text-center">
				<h1 className="text-lg font-semibold text-slate-900">
					{title}
				</h1>
			</header>
			<footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-2 pb-6">
				<div className="pointer-events-auto flex items-center gap-3">
					<button
						type="button"
						className={chromeButtonClassName}
						onClick={onPrevious}
						disabled={step <= 1}
					>
						Previous
					</button>
					<p className="min-w-24 text-center text-sm text-slate-500">
						Step {step} of {steps}
					</p>
					<button
						type="button"
						className={chromeButtonClassName}
						onClick={onNext}
						disabled={step >= steps}
					>
						Next
					</button>
					<button
						type="button"
						className={chromeButtonClassName}
						onClick={onReset}
					>
						Reset
					</button>
				</div>
				<p className="text-xs text-slate-400">
					Click Next to reveal each step
				</p>
			</footer>
		</>
	)
}
