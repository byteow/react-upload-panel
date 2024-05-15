import { FC } from 'react';
import styles from './Button.module.css';
import { IButtonProps } from './button.props';

const Button: FC<IButtonProps> = ({ children, variant = 'plain', className, ...props }) => {
    return (
        <button className={`${styles.button} ${variant === 'primary' && styles.primary} ${className}`}
            { ...props }
        >
            { children }
        </button>
    );
}

export default Button;
