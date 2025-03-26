import { useNavigate } from 'react-router-dom';
import './button.css';

import { FC, MouseEvent, MouseEventHandler } from 'react';

interface ButtonProps {
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    to?: string; // Added the 'to' property
}



const  Buttons: FC<ButtonProps> = ({ label, onClick, className, type = 'button', to }) => {
    const navigate = useNavigate();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick(event);
        }
    };

    return (
        <button 
            className={`btn ${className}`} 
            onClick={handleClick} 
            type={type}
        >
            {label}
        </button>
    );
};

export default Buttons;

