import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, hover = true, onClick, className = '' }: CardProps) {
  const baseClasses = 'bg-slate-800/50 border border-emerald-500/10 rounded-lg p-4 transition-all';
  const hoverClasses = hover ? 'hover:border-emerald-400/30 hover:shadow-lg hover:shadow-emerald-400/10' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
}
