import { useState } from 'react'
import './App.scss'
import MultiSelectDropdown from './components/MultiSelectDropdown'

function App() {
  const [items, setItems] = useState([
    { id: '1', label: 'Education', emoji: '🎓', category: 'Education' },
    { id: '2', label: 'Yeeeah, science!', emoji: '🧪', category: 'Education' },
    { id: '3', label: 'Art', emoji: '🎨', category: 'Education' },
    { id: '4', label: 'Sport', emoji: '⚽', category: 'Education' },
    { id: '5', label: 'Games', emoji: '🎮', category: 'Education' },
    { id: '6', label: 'Health', emoji: '🏥', category: 'Education' }
  ])

  const [selectedIds, setSelectedIds] = useState<string[]>(['2'])

  const handleAddItem = (newItem: any) => {
    setItems([...items, newItem])
  }

  return (
    <div className="app">
      <h1>Lobox Multi-Select Dropdown</h1>
      <MultiSelectDropdown
        items={items}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onAddItem={handleAddItem}
        placeholder="Science"
      />
    </div>
  )
}

export default App
