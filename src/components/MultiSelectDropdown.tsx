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
  const [inputValue, setInputValue] = useState('');
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

  const handleItemClick = (itemId: string) => {
    const isSelected = selectedIds.includes(itemId);
    if (isSelected) {
      onSelectionChange(selectedIds.filter(id => id !== itemId));
    } else {
      onSelectionChange([...selectedIds, itemId]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() && onAddItem) {
      const newItem: DropdownItem = {
        id: Date.now().toString(),
        label: inputValue.trim(),
        category: categoryTitle
      };
      onAddItem(newItem);
      setInputValue('');
      onSelectionChange([...selectedIds, newItem.id]);
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, DropdownItem[]>);

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={handleToggle}>
        {placeholder}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-content">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="category-group">
                <div className="category-title">{category} 🎓</div>
                <div className="items-list">
                  {categoryItems.map(item => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleItemClick(item.id)}
                      >
                        <span className="item-label">
                          {item.label} {item.emoji}
                        </span>
                        {isSelected && <span className="checkmark">✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {onAddItem && (
            <div className="add-item-section">
              <input
                type="text"
                className="add-item-input"
                placeholder="Type and press Enter to add..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

