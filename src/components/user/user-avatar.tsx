import React, { ComponentProps } from 'react';

import './user-avatar.css';
import { Icon } from '../icon/icon';
import { DropDown } from '../dropdown/dropdown';
import { cva, VariantProps } from 'class-variance-authority';

const UserAvatarVariants = cva(
    'base-use-avatar', 
    {
        variants: {
            variant: {
                solid: 'solid',
                outline: 'outline'
            }, 
            mode: {
                dark: 'dark', 
                light: 'light'
            }
        }, 
        defaultVariants: {
            variant: 'solid',
            mode: 'light'
        }
    }
)

interface UserAvatarProps extends ComponentProps<'div'>, VariantProps<typeof UserAvatarVariants>{
    variant?: 'solid' | 'outline'
    mode?: 'light' | 'dark'
    photoUrl: string, 
    userName: string,
    onClick: () => void;
}

export const UserAvatar = ({variant, mode, ...props}: UserAvatarProps) => {
    const [active, setActive] = React.useState(false);

    return (
        <div className={UserAvatarVariants({variant, mode})} {...props}>
             <div className="user-avatar" onClick={props.onClick}>
                <div className="user-name">{props.userName}</div>
                <div className="avatar-image">
                    <img src={props.photoUrl} alt={`${props.userName}'s avatar`} />
                </div>
                <div className="drop-arrow" onClick={() => setActive(!active)}>
                    {active ? <Icon iconType={'chevron-down'} to={''} /> : <Icon iconType={'chevron-right'} to={''} />}
                </div>
            </div>
            <div className={`dropdown-menu ${active ? 'active' : 'inactive'}`}>
                <DropDown />
            </div>
        </div>
       
    );
};