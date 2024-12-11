import { useState, useEffect } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

import { Hero } from '../../components/hero/hero';
import { Search } from '../../components/search/search';
import { Input } from '../../components/input/input';
import { SelectInput } from '../../components/select-input/select-input';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/icon';
import { Table } from '../../components/table/Table';
import { TableRow } from '../../components/table/TableRow';

import { Subject } from '../../data/models/subject.model';
import { StudentClass } from '../../data/models/student-class.model';
import Services from '../../services';

import './metrics-page.css';

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
  const [studentFiltered, setStudentFiltered] = useState([]);
  useEffect(() => {
    const filters = Object.fromEntries(
      Object.entries(metricFilters).filter(([_, v]) => v !== '')
    );

    Services.getStudentsTotalAttendance(filters)
      .then((data) => {
        setStudentTotalAttendance(data);
        setStudentFiltered(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const [subjectsAvgAttendancePercentage, setSubjectsAvgAttendancePercentage] = useState([]);
  useEffect(() => {
    const filters = Object.fromEntries(
      Object.entries(metricFilters).filter(([_, v]) => v !== '')
    );

    Services.getSubjectsAvgAttendancePercentage(filters)
      .then((data) => {
        setSubjectsAvgAttendancePercentage(data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const [studentClassesAvgAttendancePercentage, setStudentClassesAvgAttendancePercentage] = useState([]);
  useEffect(() => {
    const filters = Object.fromEntries(
      Object.entries(metricFilters).filter(([_, v]) => v !== '')
    );

    Services.getStudentClassesAvgAttendancePercentage(filters)
      .then((data) => {
        setStudentClassesAvgAttendancePercentage(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const [attendanceHistory, setAttendanceHistory] = useState(Array<any>);
  const [timespan, setTimespan] = useState<string>('day');
  const [lines, setLines] = useState(Array<any>);

  const createDataPeriod = (timespan: string) => {
    const dataPeriod: Array<any> = [];
    
    if (timespan === "day") {
      const hours = Array.from(Array(24).keys())
      hours.forEach(h => dataPeriod.push({timePeriod: `${h}h`}))
    } else if (timespan === "month") {
      const days = Array.from(Array(31).keys())
      days.forEach(day => dataPeriod.push({timePeriod: `${day + 1}`}))
    } else if (timespan === "year") {
      const weeks = Array.from(Array(53).keys())
      weeks.forEach(week => dataPeriod.push({timePeriod: `${week + 1}`}))
    }

    return dataPeriod;
  };

  const formatTimePeriod = (timePeriod: string, timespan: string) => {
    const date = new Date(timePeriod);
  
    if (timespan === "day") {
      return `${date.getHours()}h`;
    } else if (timespan === "month") {
      return `${date.getDate()}`;
    } else if (timespan === "year") {
      const oneJan = new Date(date.getFullYear(), 0, 1);
      const millisDiff = date.getTime() - oneJan.getTime();
      const dayDiff = millisDiff / (24 * 60 * 60 * 1000);
      const weekNumber = Math.ceil((dayDiff + oneJan.getDay() + 1) / 7);
      return `${weekNumber}`;
    }

    return timePeriod;
  };

  useEffect(() => {
    const filters = Object.fromEntries(
      Object.entries(metricFilters).filter(([_, v]) => v !== '')
    );

    Services.getAttendanceHistory(filters)
      .then((data) => {
        const processedData = createDataPeriod(timespan);
        const uniqueKeys = new Set();
        let ts;

        data.forEach((entry: any) => {
          const timePeriod = formatTimePeriod(entry.time_period, entry.timespan);
          const key = entry.student_class || entry.subject;

          let existingEntry = processedData.find((d) => d.timePeriod === timePeriod);
          ts = entry.timespan;

          if (!existingEntry) {
            existingEntry = { timePeriod };
            processedData.push(existingEntry);
          }

          existingEntry[key] = entry.total_attendance;
          uniqueKeys.add(key);
        });

        setAttendanceHistory(processedData);
        setTimespan(ts ?? 'day');
        setLines([...uniqueKeys]);

        console.log(processedData)
        console.log([...uniqueKeys])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const [subjects, setSubjects] = useState(Array<Subject>);
  useEffect(() => {
    Services.listSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [studentClasses, setStudentClasses] = useState(Array<StudentClass>);
  useEffect(() => {
    Services.listStudentClasses()
      .then((data) => {
        setStudentClasses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [metricFilters, setMetricFilters] = useState({
    student_name: '',
    student_id: '',
    subject_id: '34',
    student_class_id: '34',
    start_datetime__gte: '',
    timespan: 'day',
  });

  const handleSearch = (e: any) => {
    const { name, value } = e.target;
    setMetricFilters((prevData) => ({ ...prevData, [name]: value }));
    setStudentFiltered(studentTotalAttendance.filter((data: any) => data.student.includes(value)))

  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMetricFilters((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const filters = Object.fromEntries(
      Object.entries(metricFilters).filter(([_, v]) => v !== '')
    );

    console.log(filters)
    // Services.listLessonsWithDetails(filters)
    //   .then((data) => {
    //     setLessons(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const resetFilters = () => {
    setMetricFilters({
      student_name: '',
      student_id: '',
      subject_id: '34',
      student_class_id: '34',
      start_datetime__gte: '',
      timespan: 'day',
    });

    // Services.listLessonsWithDetails()
    //   .then((data) => {
    //     setLessons(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <div className={MetricsPageVariants({ mode })} {...props}>
        <Hero 
          title="Métricas"
          description="Veja diferentes métricas de presença dos alunos, turmas e disciplinas."
          minimized
        />

        <div className='dashboard'>
          <div className="filter-container">
            <form
              className="filters"
              id="filter-lesson-form"
              method="GET"
              onSubmit={handleSubmit}
            >
              <Search
                className="search"
                name="student_name"
                placeholder="Nome do Aluno"
                value={metricFilters.student_name}
                onChange={handleSearch}
              />

              <SelectInput
                placeholder="-- Turma --"
                name="student_class_id"
                value={metricFilters.student_class_id}
                onChange={handleChange}
                disabled
              >
                {studentClasses.map((studentClass) => (
                  <option key={studentClass.id} value={studentClass.name}>
                    {studentClass.name}
                  </option>
                ))}
              </SelectInput>

              <SelectInput
                placeholder="-- Disciplina --"
                name="subject_id"
                value={metricFilters.subject_id}
                onChange={handleChange}
                disabled
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </SelectInput>

              <Input
                type="date"
                name="start_datetime__gte"
                value={metricFilters.start_datetime__gte}
                mode={mode}
                onChange={handleChange}
                disabled
              />
            </form>

            <div className="buttons">
              <Button type="submit" form="filter-lesson-form" disabled>
                <Icon iconType="search" size={16} />
              </Button>

              <Button onClick={resetFilters} disabled>
                <Icon iconType="x" size={16} />
              </Button>
            </div>
          </div>
          
          <div className='students'>
            <Table
              variant={'base'}
              mode="light"
              clickable={false}
              header={['Aluno', 'Presença']}
            >
              {studentFiltered.map((data: any) => {
                return (
                  <TableRow key={data.student_id} clickable={false}>
                    <td>{ data.student }</td>
                    <td>{ data.percentage_attendance }%</td>
                    {/* <td>
                      {
                        student.attendance == AttendanceStatus.PRESENT
                          ? 'Presente'
                          : 'Ausente'
                      }
                    </td> */}
                  </TableRow>
                );
              })}
            </Table>
          </div>

          <div className='chart classes'>
            <h6>Presença por Turma</h6>

            {
              studentClassesAvgAttendancePercentage.length > 0 && (
                studentClassesAvgAttendancePercentage.length > 1
                ? (
                  <BarChart width={350} height={250} data={studentClassesAvgAttendancePercentage} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="student_class"
                      tick={{ angle: -30, textAnchor: 'end' }}
                      interval={0}
                      dy={10}
                    />
                    <YAxis type="number" domain={[0, 100]}>
                      <Label
                        value="Presença (%)"
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: 'middle' }}
                      />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="average_attendance_percentage" fill="#8884d8" />
                  </BarChart>
                )
                : (
                  <PieChart width={350} height={250}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={[
                        {'name': 'Presente', 'value': studentClassesAvgAttendancePercentage[0].average_attendance_percentage}, 
                        {'name': 'Ausente', 'value': 100 - studentClassesAvgAttendancePercentage[0].average_attendance_percentage}
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name }) => name}
                    >
                      <Cell fill="#4e55a1" />
                      <Cell fill="#ff0000" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                )
              )
            }
          </div>
          
          <div className='chart subjects'>
            <h6>Presença por Frente</h6>

            <BarChart width={350} height={250} data={subjectsAvgAttendancePercentage} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="subject"
                tick={{ angle: -30, textAnchor: 'end' }}
                interval={0}
                dy={10}
              />
              <YAxis type="number" domain={[0, 100]}>
                <Label
                  value="Presença (%)"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip />
              <Bar dataKey="average_attendance_percentage" fill="#8884d8" />
            </BarChart>
          </div>

          <div className='chart history'>
            {
              timespan == 'day' && <h6>Histórico de Presença por Hora</h6> ||
              timespan == 'month' && <h6>Histórico de Presença por Dia</h6> ||
              timespan == 'year' && <h6>Histórico de Presença por Semana</h6>
            }

            <LineChart width={700} height={250} data={attendanceHistory} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timePeriod" 
                interval={1}
              >
                {
                  timespan == 'day' && <Label value="Horas do Dia" position="bottom" style={{ textAnchor: 'middle' }} /> ||
                  timespan == 'month' && <Label value="Dias do Mês" position="bottom" style={{ textAnchor: 'middle' }} /> ||
                  timespan == 'year' && <Label value="Semanas do Ano" position="bottom" style={{ textAnchor: 'middle' }} />
                }
              </XAxis>
              <YAxis interval={1}>
                <Label
                  value="Presença Total"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip />
              <Legend 
                wrapperStyle={{
                  position: 'relative',
                  marginTop: '8px'
                }}
              />

              {lines.map((key) => (
                <Line key={key} type="monotone" dataKey={key} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
              ))}
            </LineChart>
          </div>
        </div>
      </div>
    </>
  )
}