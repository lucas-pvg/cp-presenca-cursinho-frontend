import { ComponentProps, ReactNode, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableFooter } from "./TableFooter";
import "./Table.css";

const TableVariants = cva("base-table", {
	variants: {
		mode: {
			light: "light",
			dark: "dark",
		},
	},
	defaultVariants: {
		mode: "light",
	},
});

interface TableProps
	extends ComponentProps<"table">,
		VariantProps<typeof TableVariants> {
	mode?: "light" | "dark";
	clickable?: boolean;
	header: Array<string>;
	data: Array<Array<ReactNode>>;
	onRowClick?: (index: number) => void;
}

export function Table({
	mode,
	clickable,
	header,
	data,
	onRowClick,
	...props
}: TableProps) {
	const [page, setPage] = useState(1);
	const maxPage = Math.ceil(data.length / 10);

	return (
		<table className={TableVariants({ mode })} {...props}>
			<TableHeader mode={mode} clickable={clickable} headers={header} />

			<tbody>
				{data.slice((page - 1) * 10, page * 10).map((row, i) => {
					return (
						<TableRow
							mode={mode}
							clickable={clickable}
							key={i}
							onClick={() => onRowClick?.(i)}
						>
							{row}
						</TableRow>
					);
				})}
			</tbody>

			<TableFooter
				mode={mode}
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
		</table>
	);
}
