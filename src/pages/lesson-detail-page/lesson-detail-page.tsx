import { useState, useEffect } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Hero } from '../../components/hero/hero'
import { CardMenu } from '../../components/card-menu/card-menu'
import { Card } from '../../components/card-menu/card'
import { Search } from '../../components/search/search'
import { Table } from '../../components/table/Table'

import axios from 'axios';
import './lesson-detail-page.css'

interface Classes {
  id: number
  name: string
  start_datetime: string
  end_datetime: string
  attendance_start_datetime: string
  attendance_end_datetime: string
  is_attendance_registrable: boolean
  lesson_recurrency: number
}

const LessonDetailPageVariants = cva(
  'lesson-detail page',
  {
    variants: {
      mode: {
        light: 'light',
        dark: 'dark'
      }
    },
    defaultVariants: {
      mode: 'light'
    }
  }
)

interface LessonDetailPageProps extends VariantProps<typeof LessonDetailPageVariants> {
  mode?: 'light' | 'dark'
}

export function LessonDetailPage({ mode, ...props }: LessonDetailPageProps) {
  // const [ classData, setClassData ] = useState([])
  // const [ search, setSearch ] = useState<string>('')
  // const [ lessons, setLessons ] = useState<string[][]>([])

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/lesson/')
  //     .then(response => {
  //       setClassData(response.data.map((obj:any) => {
  //         // return (Object.keys(obj).map((key) => obj[key as keyof Classes]))
  //         return ([obj.name, obj.id, obj.start_datetime])
  //       }))

  //       setLessons(response.data.map((obj:any) => {
  //         // return (Object.keys(obj).map((key) => obj[key as keyof Classes]))
  //         return ([obj.name, obj.id, obj.start_datetime])
  //       }))
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);



  // const filterLesson = (e:any) => {
  //   setSearch(e.target.value)

  //   if (e.target.value == '') {
  //     setLessons(classData)
  //   } else {
  //     setLessons(classData.filter((lesson) => lesson[0].includes(e.target.value)))
  //   }
  // }

  return (
    <div className={LessonDetailPageVariants({ mode })} {...props}>
      <Hero 
        title='Aula de Matemática'
        description='Matemática • Turma 1'
      />

      <CardMenu className='menu'>
        <Card to='' label='Editar' mode='light' />
        <Card to='' label='Excluir' mode='light' />
      </CardMenu>

      <div className='page-content'>
        <div className='lesson-table'>
          {/* <Search value={search} onChange={filterLesson} /> */}
          {/* <Table
            mode='light'
            clickable={true}
            header={['Aula', 'ID', 'Datetime']}
            data={lessons}
          /> */}
        </div>
      </div>
    </div>
  )
}
