import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { ReactComponent as Arrow } from '../../assets/icons/Arrow.svg';
import { ReactComponent as Clear } from '../../assets/icons/Clear.svg';

export function FilterSelect({ options, placeholder, name, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ target: { name, value: '' } });
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectContainer ref={selectRef}>
      <SelectInput onClick={toggleDropdown} isOpen={isOpen} hasValue={!!value}>
        <span>{value || placeholder}</span>
        {value ? (
          <ClearIcon onClick={handleClear} />
        ) : (
          <ArrowIcon isOpen={isOpen} />
        )}
      </SelectInput>
      {isOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <Option
              key={option}
              onClick={() => handleOptionClick(option)}
              isSelected={option === value}
            >
              {option}
            </Option>
          ))}
        </OptionsContainer>
      )}
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  position: relative;
  width: 180px;
  font-family: var(--font-inter);

  @media (max-width: 930px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;

const SelectInput = styled.div`
  border-radius: var(--radius200);
  padding: var(--padding300) var(--padding300) var(--padding300)
    var(--padding400);
  border: 1px solid var(--accent);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) =>
    props.hasValue ? 'var(--white)' : 'var(--text_default_tertiary)'};
  background-color: ${(props) =>
    props.isOpen ? `var(--light-main)` : `var(--main)`};
`;

const OptionsContainer = styled.div`
  border-radius: var(--radius200);
  background-color: var(--white);
  border: 1px solid var(--border-default);
  box-shadow: var(--drop-shadow);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 5px;
  max-height: calc(5 * 40px);
`;

const Option = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};

  &:hover {
    background-color: var(--second-accent);
  }
`;

const ClearIcon = styled(Clear)`
  cursor: pointer;
  color: var(--text_default_tertiary);
  transition: color 0.2s;

  path {
    stroke: currentColor;
  }

  &:hover {
    color: var(--accent);
  }
`;

const ArrowIcon = styled(Arrow)`
  cursor: pointer;
  transition: transform 0.2s;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;
