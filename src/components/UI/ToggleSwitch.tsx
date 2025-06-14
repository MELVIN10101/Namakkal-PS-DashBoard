import React from 'react';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <label
          htmlFor={id}
          className={`
            block overflow-hidden h-6 rounded-full 
            ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'} 
            cursor-pointer transition-colors duration-200 ease-in-out
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >          <span 
            className={`
              absolute inset-y-0 block w-4 h-4 m-1
              bg-white dark:bg-gray-200 rounded-full shadow-md
              transition-transform duration-300 ease-in-out
              transform ${checked ? 'translate-x-4' : 'translate-x-0'} 
            `}
            style={{
              transitionTimingFunction: checked ? 'cubic-bezier(0.17, 0.67, 0.43, 1.05)' : 'cubic-bezier(0.17, 0.67, 0.43, 1.05)'
            }}
          /></label>
      </div>
      {label && (
        <label 
          htmlFor={id} 
          className={`text-sm text-gray-700 dark:text-gray-300 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
