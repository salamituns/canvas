import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: {
		default: 'Canvas',
		template: '%s · Canvas',
	},
	description: 'JSON-driven presentation engine built on React Flow.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="m-0 h-full min-h-full bg-white p-0 text-slate-900">
				{children}
			</body>
		</html>
	)
}
