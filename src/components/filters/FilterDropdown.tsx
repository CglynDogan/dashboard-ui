import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export default function FilterDropdown({ label, options, selectedValues, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <span>{label}</span>
        {selectedValues.length > 0 && (
          <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-0.5">
            {selectedValues.length}
          </span>
        )}
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</span>
              {selectedValues.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >
                  Temizle
                </button>
              )}
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleOptionToggle(option.value)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}