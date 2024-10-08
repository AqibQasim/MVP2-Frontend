import React from "react";
import ButtonDown from "@/svgs/ButtonDown";

function ChangeStatusDropdown({
  options = [], // List of options for the dropdown
  className,
  placeholder = "",
  onPress, // This will be used for handling the option selection
  ...rest
}) {
  const commonClasses =
    "border border-gray-300 bg-[#F2F1F8] text-gray-900 rounded-full focus:ring-primary focus:border-primary block py-3 px-3 transition-colors duration-300 ease-in-out custom-select";

  // Handle option selection
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    // Call the onPress function (if passed) when an option is selected
    if (onPress) {
      onPress(selectedValue);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <select className={commonClasses} onChange={handleChange} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ChangeStatusDropdown;
