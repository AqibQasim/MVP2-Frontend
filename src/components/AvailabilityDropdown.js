import React from 'react';

function AvailabilityDropdown({
  options = [], // List of options for the dropdown
  className,
  placeholder = "",
  ...rest
}) {
  const commonClasses =
    "border border-gray-300 bg-[#F2F1F8] text-gray-900 rounded-full focus:ring-primary focus:border-primary block py-3 px-10 transition-colors duration-300 ease-in-out";

  return (
    <>
    <select
      className={`${commonClasses} ${className}`}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    </>
  );
}

export default AvailabilityDropdown;
