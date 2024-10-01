import { cva, VariantProps } from 'class-variance-authority';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { Icon } from '../icon/icon';
import './DragAndDrop.css';

const DragAndDropVariants = cva('base-modal input-modal', {
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

interface DragAndDropProps
  extends VariantProps<typeof DragAndDropVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  mode?: 'light' | 'dark';
  dropzoneProps: DropzoneOptions;
  onFileDrop: (files: File[]) => void;
}

export function DragAndDrop({
  dropzoneProps,
  className,
  onFileDrop,
  ...props
}: DragAndDropProps) {
  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneProps,
    onDrop: (acceptedFiles) => {
      onFileDrop(acceptedFiles);
    },
  });

  return (
    <div {...getRootProps()} className={`dropzone ${className}`} {...props}>
      <input {...getInputProps()} />
      <Icon className="upload-icon" iconType="upload-cloud" size={150} />
      <p className="caller-phrase">Solte o arquivo ou clique aqui!</p>
    </div>
  );
}
