import React, { useState } from 'react';

// Reusable Components
export const FormInput = ({ label, value, onChange, type = "text", className = "" }) => {
  return (
    <div className="space-y-2">
      <label className="font-medium text-sm text-gray-900 dark:text-gray-100">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors ${className}`}
      />
    </div>
  );
};

export const TableCell = ({ children, className = "", isHeader = false }) => (
  <div
    className={`
      p-2 rounded-md transition-colors
      ${isHeader 
        ? 'bg-gray-100 dark:bg-gray-700 font-bold text-center text-gray-900 dark:text-gray-100' 
        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
      }
      ${className}
    `}
  >
    {children}
  </div>
);

export const TableInput = ({ value, onChange, className = "", placeholder = "" }) => (
  <input 
    type="text"
    className={`w-full h-full border-0 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 rounded px-1 py-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors ${className}`}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export const RadioGroup = ({ 
  name, 
  value, 
  onChange, 
  options = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] 
}) => {
  const getButtonStyle = (optionValue, optionLabel) => {
    const isSelected = value === optionValue;
    const isYes = optionLabel.toLowerCase() === 'yes';
    const isNo = optionLabel.toLowerCase() === 'no';
    
    let baseClasses = "py-2 text-center font-medium transition-all duration-200 cursor-pointer";
    
    if (isSelected) {
      if (isYes) {
        return `${baseClasses} bg-green-500 dark:bg-green-600 text-white`;
      } else if (isNo) {
        return `${baseClasses} bg-red-500 dark:bg-red-600 text-white`;
      } else {
        return `${baseClasses} bg-blue-500 dark:bg-blue-600 text-white`;
      }
    } else {
      return `${baseClasses} bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600`;
    }
  };

  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm transition-colors">
      {options.map((option, index) => (
        <div
          key={option.value}
          className={`flex-1 ${getButtonStyle(option.value, option.label)} ${
            index === 0 ? '' : 'border-l border-gray-300 dark:border-gray-600'
          }`}
          onClick={() => onChange(option.value)}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only" // Hide the actual radio input
          />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export const SectionHeader = ({ title, subtitle = "" }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 decoration-2 underline-offset-4 transition-colors">{title}</h2>
    {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">{subtitle}</p>}
  </div>
);



export const TextArea = ({
  label,
  value,
  onChange,
  className = "",
  placeholder = "",
  rows = 4,
  required = false,
  maxLength = null,
  showCharCount = false
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium text-sm text-gray-900 dark:text-gray-100 transition-colors">
          {label}
          {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
        </label>
        {showCharCount && maxLength && (
          <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        required={required}
        className={`w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 resize-none transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${className}`}
      />
    </div>
  );
};


export const ComplianceRow = ({ 
  description, 
  value, 
  comments, 
  onValueChange, 
  onCommentsChange, 
  name 
}) => {
  return (
    <div className="grid grid-cols-12 gap-px mb-px">
      <TableCell className="col-span-3 font-medium text-gray-800 dark:text-gray-200 text-sm">
        {description}
      </TableCell>
      <TableCell className="col-span-3">
        <RadioGroup 
          name={name}
          value={value || ''}
          onChange={onValueChange}
          includeNA={true}
          options={[
            { label: 'N/A', value: 'N/A' },
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' }
          ]}
        />
      </TableCell>
      <TableCell className="col-span-6">
        <TableInput 
          value={comments || ''}
          onChange={onCommentsChange}
          placeholder="Enter comments..."
        />
      </TableCell>
    </div>
  );
};