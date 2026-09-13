import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PresentNotFound() {
	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8">
			<h1 className="text-xl font-medium">No presentation for that slug</h1>
			<p className="max-w-md text-center text-sm text-muted-foreground">
				Add a matching JSON file under public/presentations, then visit
				/present/your-slug.
			</p>
			<Button asChild>
				<Link href="/">Back to index</Link>
			</Button>
		</main>
	)
}
