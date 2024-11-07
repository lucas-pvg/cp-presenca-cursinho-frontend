// import { useState } from 'react';
// import { cva, VariantProps } from 'class-variance-authority';
// import { User } from '../../data/models/user.model';
// import { ModalFooter } from '../modal/modal-components/modal-footer';
// import { ModalHeader } from '../modal/modal-components/modal-header';
// import { ModalRow } from '../modal/modal-components/modal-row';
// import './SelectList.css';

// const selectListVariants = cva('base-modal input-modal select-list', {
//   variants: {
//     mode: {
//       light: 'light',
//       dark: 'dark',
//     },
//   },
//   defaultVariants: {
//     mode: 'light',
//   },
// });

// interface ListProps extends VariantProps<typeof selectListVariants> {
//   mode?: 'light' | 'dark';
//   variant?: 'solid' | 'outline';
//   users: User[];
//   verifyIncluded: (email: string) => boolean;
//   handleListChange: (email: string) => void;
//   confirm: () => void;
//   close: () => void;
// }

// export function SelectList({
//   mode,
//   variant,
//   users,
//   verifyIncluded,
//   handleListChange,
//   confirm,
//   close,
// }: ListProps) {
//   const [closingAnimation, setClosingAnimation] = useState(false);

//   const handleClose = () => {
//     setClosingAnimation(true);
//     setTimeout(() => close(), 200);
//   };

//   return (
//     <div className={closingAnimation ? 'modal modal-close' : 'modal modal-open'}>
//       <div className="modal-background" onClick={() => handleClose()} />

//       <div className={selectListVariants({ mode })}>
//         <ModalHeader
//           title="Gerenciar Alunos"
//           description="Adicione os alunos que farão parte desta turma."
//           variant={variant}
//           mode={mode}
//         />

//         <div className="modal-content">
//           <div className="content-body">
//             {users.map((user) => (
//               <div key={user.id}>
//                 <ModalRow labels={['Nome']} mode={mode}>
//                   <div className="row-content">
//                     <input
//                       type="checkbox"
//                       id={`item-${user.id}`}
//                       checked={verifyIncluded(user.email)}
//                       onChange={() => handleListChange(user.email)}
//                     />
//                     <label htmlFor={`item-${user.id}`}>{user.firstName}</label>
//                   </div>
//                 </ModalRow>
//               </div>
//             ))}
//           </div>

//           <hr className="divider" />
//           <ModalFooter
//             mode={mode}
//             close={() => handleClose()}
//             confirm={confirm}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
