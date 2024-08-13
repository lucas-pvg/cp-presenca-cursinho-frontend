import { cva, VariantProps } from 'class-variance-authority';
import { useState } from 'react';
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
}

export function OptionList({ mode, labels }: OptionListProps) {
  const [option, setOption] = useState(0);

  const setActive = (e: any) => {
    setOption(e.currentTarget.value);
  };

  return (
    <div className={optionListVariants({ mode })}>
      <div className="labels">
        {labels.map((label, i) => {
          return (
            <Option
              mode={mode}
              active={option == i}
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
