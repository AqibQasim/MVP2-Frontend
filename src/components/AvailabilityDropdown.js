import React from "react";
import ButtonDown from "@/svgs/ButtonDown";

function AvailabilityDropdown({
  options = [],
  className,
  placeholder = "",
  onChange, // Changed from `onPress` to `onChange` for consistency
  ...rest
}) {
  const commonClasses =
    "border border-gray-300 bg-[#F2F1F8] text-gray-900 rounded-full focus:ring-primary focus:border-primary block py-3 px-10 transition-colors duration-300 ease-in-out custom-select";

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (onChange) {
      onChange(selectedValue); // Pass only the value to the handler
    }
  };

  return (
    <div className={`relative ${className}`}>
      <select
        className={commonClasses}
        onChange={handleChange}
        defaultValue={placeholder ? "" : undefined}
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
    </div>
  );
}

export default AvailabilityDropdown;
