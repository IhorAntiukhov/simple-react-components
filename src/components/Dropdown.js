import { GoChevronDown } from 'react-icons/go';
import { useState, useEffect, useRef } from "react";
import Panel from './Panel';

function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      console.log(divEl.current, event.target);

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((currentValue) => !currentValue);
  }

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  }

  const renderedOptions = options.map((option) => {
    return (
      <div className="hover:bg-sky-100 rounded cursor-pointer p-1" key={option.value} onClick={() => { handleOptionClick(option) }}>
        <div>{option.label}</div>
      </div>
    )
  });

  return (
    <div ref={divEl} className="w-48 relative">
      <Panel className="flex justify-between items-center cursor-pointer" onClick={handleClick}>
        {value?.label || 'Select ...'}
        <GoChevronDown className='text-lg' />
      </Panel>
      {isOpen && (
        <Panel className="absolute top-full">
          {renderedOptions}
        </Panel>)}
    </div>
  );
}

export default Dropdown;