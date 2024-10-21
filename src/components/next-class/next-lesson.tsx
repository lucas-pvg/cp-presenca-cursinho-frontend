import { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '../../data/models/lesson.model';
import './next-lesson.css';

const nextLessonVariants = cva('next-lesson', {
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

interface nextLessonProps
  extends ComponentProps<'div'>,
    VariantProps<typeof nextLessonVariants> {
  mode?: 'light' | 'dark';
  lesson: Lesson;
}

export function NextLesson({ mode, lesson, ...props }: nextLessonProps) {
  const nav = useNavigate();

  return (
    <div
      className={nextLessonVariants({ mode })}
      onClick={() => nav(`/lessons/${lesson.id}`)}
      {...props}
    >
      <h6>{lesson.subject}</h6>

      <div className="next-lesson-info">
        <p>{lesson.startTimeFormat()}</p>

        <div className="next-lesson-class">
          <p>{lesson.studentClass}</p>
        </div>
      </div>
    </div>
  );
}
