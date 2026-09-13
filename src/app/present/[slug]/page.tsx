import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PresentationCanvasLoader } from '@/components/presentation/presentation-canvas-loader'
import {
	getPresentationConfig,
	listPresentationSlugs,
} from '@/lib/presentation/get-presentation'

interface PresentPageProps {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	const slugs = await listPresentationSlugs()
	return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
	params,
}: PresentPageProps): Promise<Metadata> {
	const { slug } = await params
	const config = await getPresentationConfig(slug)

	if (!config) {
		return { title: 'Presentation not found' }
	}

	return { title: config.title }
}

export default async function PresentPage({ params }: PresentPageProps) {
	const { slug } = await params
	const config = await getPresentationConfig(slug)

	if (!config) {
		notFound()
	}

	return <PresentationCanvasLoader config={config} />
}
