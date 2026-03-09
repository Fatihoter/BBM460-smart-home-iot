import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  activeColor?: string;
  inactiveColor?: string;
}

const Toggle = ({
  enabled,
  onChange,
  activeColor = 'bg-indigo-600',
  inactiveColor = 'bg-gray-200'
}: ToggleProps) => {
  return (
    <button
      type="button"
      className={`${
        enabled ? activeColor : inactiveColor
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={onChange}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
};

export default Toggle;