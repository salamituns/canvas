import Link from 'next/link'
import { listPresentationSlugs, getPresentationConfig } from '@/lib/presentation/get-presentation'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default async function HomePage() {
	const slugs = await listPresentationSlugs()
	const decks = (
		await Promise.all(slugs.map((slug) => getPresentationConfig(slug)))
	).filter((deck) => deck !== null)

	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-8 px-6 py-16">
			<div className="grid gap-2">
				<p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
					Canvas
				</p>
				<h1 className="text-3xl font-medium tracking-tight">
					Presentation engine
				</h1>
				<p className="max-w-lg text-sm text-muted-foreground">
					Each deck is a JSON file in public/presentations. The
					slug in the URL selects the file; React Flow only
					filters nodes by step.
				</p>
			</div>
			<ul className="grid gap-3">
				{decks.map((deck) => (
					<li key={deck.slug}>
						<Link href={`/present/${deck.slug}`} className="block">
							<Card className="transition-colors hover:bg-muted/40">
								<CardHeader>
									<CardTitle>{deck.title}</CardTitle>
									<CardDescription>
										{deck.steps} steps · {deck.initialNodes.length} nodes · /present/{deck.slug}
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					</li>
				))}
			</ul>
		</main>
	)
}
