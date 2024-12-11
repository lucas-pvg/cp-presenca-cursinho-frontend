import { useState, useEffect } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import { Hero } from '../../components/hero/hero';
import Services from '../../services';

const MetricsPageVariants = cva('metrics page', {
  variants: {
    mode: {
      light: 'light',
      dark: 'dark',
    },
  },
  defaultVariants: {
    mode: 'light',
  },
});

interface MetricsPageProps extends VariantProps<typeof MetricsPageVariants> {
  mode?: 'light' | 'dark';
}

export function MetricsPage({ mode, ...props }: MetricsPageProps) {
  const [studentTotalAttendance, setStudentTotalAttendance] = useState([]);
  useEffect(() => {
    Services.getStudentsTotalAttendance()
      .then((data) => {
        setStudentTotalAttendance(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const [lessonsAttendancePercentage, setLessonsAttendancePercentage] = useState([]);
  useEffect(() => {
    Services.getLessonsAttendancePercentage()
      .then((data) => {
        setLessonsAttendancePercentage(data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <>
      <div className={MetricsPageVariants({ mode })} {...props}>
        <Hero 
          title="Métricas"
          description="Veja diferentes métricas de presença dos alunos, turmas e disciplinas."
        />

        <BarChart width={600} height={400} data={studentTotalAttendance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="student_id" />
          <YAxis>
            <Label
              value="Presença (%)"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="percentage_attendance" fill="#8884d8" />
        </BarChart>

        <BarChart width={600} height={400} data={lessonsAttendancePercentage} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="lesson_id" />
          <YAxis>
            <Label
              value="Presença (%)"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="attendance_percentage" fill="#8884d8" />
        </BarChart>
      </div>
    </>
  )
}