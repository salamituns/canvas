import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { PresentationConfig } from './types'

const PRESENTATIONS_DIR = path.join(
	process.cwd(),
	'public',
	'presentations',
)

export function isSafePresentationSlug(slug: string): boolean {
	return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

function isPresentationConfig(value: unknown): value is PresentationConfig {
	if (!isRecord(value)) {
		return false
	}

	return (
		typeof value.title === 'string' &&
		typeof value.slug === 'string' &&
		typeof value.steps === 'number' &&
		Number.isInteger(value.steps) &&
		value.steps > 0 &&
		Array.isArray(value.initialNodes) &&
		Array.isArray(value.initialEdges)
	)
}

export async function getPresentationConfig(
	slug: string,
): Promise<PresentationConfig | null> {
	if (!isSafePresentationSlug(slug)) {
		return null
	}

	const filePath = path.join(PRESENTATIONS_DIR, `${slug}.json`)

	try {
		const raw = await fs.readFile(filePath, 'utf8')
		const parsed: unknown = JSON.parse(raw)

		if (!isPresentationConfig(parsed)) {
			return null
		}

		return parsed
	} catch {
		return null
	}
}

export async function listPresentationSlugs(): Promise<string[]> {
	try {
		const files = await fs.readdir(PRESENTATIONS_DIR)
		return files
			.filter((file) => file.endsWith('.json'))
			.map((file) => file.replace(/\.json$/, ''))
			.filter(isSafePresentationSlug)
	} catch {
		return []
	}
}
