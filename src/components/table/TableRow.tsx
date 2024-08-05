import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import "./Table.css";

const TableRowVariants = cva("table-row", {
	variants: {
		clickable: {
			true: "click",
			false: "not-click",
		},
		mode: {
			light: "light",
			dark: "dark",
		},
	},
	defaultVariants: {
		mode: "light",
		clickable: true,
	},
});

interface TableRowProps
	extends ComponentProps<"tr">, VariantProps<typeof TableRowVariants> {
		mode?: "light" | "dark";
		clickable?: boolean;
}

export function TableRow({ mode, clickable, ...props }: TableRowProps) {
	// const [presenceText, setPresenceText] = React.useState(data[1] === 'presente');
	// const presenceButtonTap = () => {
	//   setPresenceText(!presenceText);
	// }

	return (
		<tr className={TableRowVariants({ mode, clickable })} {...props}>
			{ props.children }
			<td className="icon">{">"}</td>
		</tr>
	);
	// return (
	//   <tr className={TableRowVariants({ mode, clickable })} {...props}>
	//     {data.map((d, i) => d === 'presente' || d === 'ausente' ?
	//       <td key={i}><Button onClick={presenceButtonTap} className={presenceText ? 'presence-check-button' : 'abscense-button'}>{presenceText ? 'presente' : 'ausente'}</Button></td> :
	//       <td key={i}>{d}</td>
	//     )}
	//     <td className='icon'>{'>'}</td>
	//   </tr>
	// )
}
