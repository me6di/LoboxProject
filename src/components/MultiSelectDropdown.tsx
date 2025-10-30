import { useState, useRef, useEffect } from 'react';
import './MultiSelectDropdown.scss';

interface DropdownItem {
  id: string;
  label: string;
  emoji?: string;
  category?: string;
}

interface MultiSelectDropdownProps {
  items: DropdownItem[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onAddItem?: (item: DropdownItem) => void;
  placeholder?: string;
  categoryTitle?: string;
}

const MultiSelectDropdown = ({
  items,
  selectedIds,
  onSelectionChange,
  onAddItem,
  placeholder = 'Select items',
  categoryTitle = 'Category'
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={handleToggle}>
        {placeholder}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-content">
            Dropdown content here
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

