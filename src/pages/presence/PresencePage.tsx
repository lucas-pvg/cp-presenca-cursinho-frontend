import { cva, VariantProps } from "class-variance-authority";
import { Hero } from "../../components/hero/hero";
import { Table } from "../../components/table/Table";
import { Student, studentsMock } from "../../data/students";

import "./PresencePage.css";
import React from "react";
import { Button } from "../../components/button/Button";

const PresencePageVariants = cva("presence page", {
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

interface PresencePageProps extends VariantProps<typeof PresencePageVariants> {
	mode?: "light" | "dark";
}

export const PresencePage = ({ mode, ...props }: PresencePageProps) => {
	const [studentsData, setStudentsData] =
		React.useState<Array<Student>>(studentsMock);

	// useEffect(() => {
	// 	setStudentsData(students);
	// });

	const createTableDataFromStudentsData = () => {
		return studentsData.map((student, index) => [
			student.name,
			<Button
				onClick={(e) => {
					e.preventDefault();

					const newPresence =
						student.presence === "ausente" ? "presente" : "ausente";

					setStudentsData((prevStudents) => {
						const newStudents = [...prevStudents];
						newStudents[index] = {
							...newStudents[index],
							presence: newPresence,
						};
						return newStudents;
					});
				}}
				className={
					student.presence === "presente"
						? "presence-check-button"
						: "abscense-button"
				}
			>
				{student.presence}
			</Button>,
		]);
	};

	return (
		<div className={PresencePageVariants({ mode })} {...props}>
			<Hero
				title={"Consultar Presença"}
				description="Tenha acesso às informações de uma aula e à lista de presença gerada."
			/>
			<div className="page-content">
				<Table
					header={["Nome do aluno", "Presença"]}
					data={createTableDataFromStudentsData()}
				/>
			</div>
		</div>
	);
};
