import { cva, VariantProps } from 'class-variance-authority';
import { Option } from './option';
import './option.css';

const optionListVariants = cva('option-list', {
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

interface OptionListProps extends VariantProps<typeof optionListVariants> {
  mode?: 'light' | 'dark';
  labels: Array<string>;
  index?: number
  setIndex?: (index: number) => void;
}

export function OptionList({ mode, labels, index, setIndex }: OptionListProps) {
  const setActive = (e: any) => {
    setIndex && setIndex(e.currentTarget.value);
  };

  return (
    <div className={optionListVariants({ mode })}>
      <div className="labels">
        {labels.map((label, i) => {
          return (
            <Option
              mode={mode}
              active={index == i}
              onClick={setActive}
              value={i}
              key={i}
            >
              {label}
            </Option>
          );
        })}
      </div>

      <hr className="divider" />
    </div>
  );
}
