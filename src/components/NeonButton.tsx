import React from 'react';
import '../styles/glass-neon-buttons.css';

type NeonButtonProps = {
  color?: 'orange' | 'yellow' | 'green';
  children: React.ReactNode;
  onClick?: () => void;
};

export const NeonButton: React.FC<NeonButtonProps> = ({
  color = 'green',
  children,
  onClick,
}) => (
  <button
    className={`glass-neon-btn ${color}`}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

export default NeonButton;
