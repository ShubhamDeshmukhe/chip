import React, { useState } from 'react';
import './ChipComponent.css';

const ChipCom = () => {
  const initialItems = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];

  const [items, setItems] = useState(initialItems);
  const [selectedChips, setSelectedChips] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    
    const inputValue = e.target.value;
    setInputValue(inputValue);

    // Filter items based on user input, excluding selected chips
    const filteredItems = initialItems.filter(
      (item) =>
        !selectedChips.some((chip) => chip.text.toLowerCase() === item.toLowerCase()) &&
        item.toLowerCase().includes(inputValue.toLowerCase())
    );

    setItems(filteredItems);
  };

  const handleItemClick = (item) => {
    if (!selectedChips.find((chip) => chip.text === item)) {
      const updatedItems = items.filter((i) => i !== item);
      setItems(updatedItems);

      const chipWithRemoveFunction = {
        text: item,
        id: Date.now(),
      };
      setSelectedChips([...selectedChips, chipWithRemoveFunction]);

      setInputValue('');
    }
  };

  const handleChipRemove = (chipId) => {
    const updatedChips = selectedChips.filter((chip) => chip.id !== chipId);
    setSelectedChips(updatedChips);

    const removedChip = selectedChips.find((chip) => chip.id === chipId);
    if (removedChip) {
      setItems([...items, removedChip.text]);
    }
  };

  return (
    <div className="chip-container">
      <div className="input-container">
        <div className="selected-chips">

          {selectedChips.map((chip) => (
            <div key={chip.id} className="chip">
              <span>{chip.text}</span>
              <span className="remove-chip" onClick={() => handleChipRemove(chip.id)}>
                X
              </span>
            </div>
          ))}

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type to filter items"
          />
        </div>
      </div>
      <div className="item-list-container">
        <ul className="item-list">
          {items.map((item) => (
            <li key={item} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChipCom;
