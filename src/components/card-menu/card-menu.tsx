import { Card } from './card'
import './card.css'

interface cardMenuProps {
	className?: string
	mode?: 'light' | 'dark'
	labels: Array<string>
	to: Array<string>
}

export function CardMenu({ className, mode, labels, to }: cardMenuProps) {
	const classes = className ? `${className} card-menu` : 'card-menu'

	return (
		<div className={classes}>
			{
				labels.map((label, i) => {
					return (
						<Card to={to[i]} mode={mode} label={label} key={i} />
					)
				})
			}
		</div>
	)
}
