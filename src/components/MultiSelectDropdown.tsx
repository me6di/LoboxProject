import { useState } from 'react';
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="multi-select-dropdown">
      <button className="dropdown-toggle" onClick={handleToggle}>
        {placeholder}
      </button>
    </div>
  );
};

export default MultiSelectDropdown;

