import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { ReactNode, forwardRef } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className = '',
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg transition-all font-medium';

  const variantClasses = {
    primary: 'bg-emerald-400 text-slate-900 hover:bg-emerald-300 active:bg-emerald-500',
    secondary: 'bg-slate-700 text-emerald-300 hover:bg-slate-600 active:bg-slate-800 border border-emerald-500/20',
    success: 'bg-green-500 text-white hover:bg-green-400 active:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-400 active:bg-red-600',
    ghost: 'bg-transparent text-emerald-300 hover:bg-emerald-400/10 active:bg-emerald-400/20',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <motion.button
      ref={ref}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled || loading ? disabledClasses : ''
      } ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
