import { Children, ComponentProps, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
import "./Table.css";

const TableVariants = cva("base-table", {
	variants: {
		variant: {
      base: '',
      attendance: 'attendance-table'
    },
		mode: {
			light: "light",
			dark: "dark",
		},
	},
	defaultVariants: {
    variant: 'base',
		mode: "light",
	},
});

interface TableProps
	extends ComponentProps<"table">, VariantProps<typeof TableVariants> {
    	variant?: 'base' | 'attendance'
		mode?: "light" | "dark";
		clickable?: boolean;
		header: Array<string>;
		itemsPerPage?: number
		onClick?: () => void;
}

export function Table({ mode, variant, clickable, header, itemsPerPage, onClick, ...props }: TableProps) {
	const [ page, setPage ] = useState(1);
	const items = itemsPerPage ? itemsPerPage : 10
	const maxPage = Math.ceil(Children.count(props.children) / items);

	return (
		<table className={TableVariants({ mode, variant })} {...props}>
			<TableHeader mode={mode} clickable={clickable} headers={header} />

			<tbody>
				{ Children.toArray(props.children).slice((page - 1) * items, page * items) }
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
