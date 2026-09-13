import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: '#0f172a',
					borderRadius: 40,
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 10,
						width: 118,
					}}
				>
					<div
						style={{
							width: 78,
							height: 36,
							borderRadius: 12,
							background: '#e0f2fe',
							border: '3px solid #7dd3fc',
						}}
					/>
					<div
						style={{
							width: 78,
							height: 36,
							marginLeft: 40,
							borderRadius: 12,
							background: '#f1f5f9',
							border: '3px solid #cbd5e1',
						}}
					/>
				</div>
			</div>
		),
		size,
	)
}
