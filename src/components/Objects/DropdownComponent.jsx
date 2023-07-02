import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropdownComponent = ({ options, selectedOption, handleOptionChange, label }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
      <DropdownToggle caret>{label}</DropdownToggle>
      <DropdownMenu>
        {options.map((option) => (
          <DropdownItem
            key={option}
            onClick={() => handleOptionChange(option)}
            active={selectedOption === option}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;
