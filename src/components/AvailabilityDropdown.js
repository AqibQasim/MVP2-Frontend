import React from 'react';
import ButtonDown from '@/svgs/ButtonDown';

function AvailabilityDropdown({
  options = [], // List of options for the dropdown
  className,
  placeholder = "",
  ...rest
}) {
  const commonClasses =
    "border border-gray-300 bg-[#F2F1F8] text-gray-900 rounded-full focus:ring-primary focus:border-primary block py-3 px-10 transition-colors duration-300 ease-in-out custom-select";

  return (
    <div className={`relative ${className}`}>
      <div className="icon-container">
        <div className="bg-white rounded-full h-7 w-7"></div>
      </div>
      <select
        className={commonClasses}
        {...rest}
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    
      <div className="custom-arrow ">
      <ButtonDown />
</div>
    </div>
  );
}

export default AvailabilityDropdown;
