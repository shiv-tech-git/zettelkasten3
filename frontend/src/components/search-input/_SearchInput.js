import './search-input.css';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

import AutocompleteItem from '../autocomplete-item/AutocompleteItem';

const SearchInput = ({autocomplete_list}) => {

  const [suggests, setSuggests] = useState([]);
  const [focusedElement, setFocusedElement] = useState(-1);

  const inputHandler = (e) => {
    setFocusedElement(-1);

    const input_value = e.target.value;

    if (input_value == ''){
      console.log('unset')
      document.removeEventListener('keydown', keyHandlerRef.current, true)
      return setSuggests([]);
    }

    let new_suggests = [];
    autocomplete_list.forEach((item) => {
      const start_pos = item.name.toLowerCase().indexOf(input_value.toLowerCase());
      if (start_pos > -1) {
        new_suggests.push({
          id: item.id,
          string: item.name,
          start: start_pos,
          end: start_pos + input_value.length
        })
      }
    })
    if (new_suggests.length > 0 && suggests.length === 0) {
      console.log('set')
      document.addEventListener('keydown', keyHandlerRef.current, true)
    }
    setSuggests(new_suggests);
  }

  const keyHandler = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setFocusedElement(focusedElement => focusedElement - 1)
        break;
      case 'ArrowDown':
        e.preventDefault()
        setFocusedElement(focusedElement => focusedElement + 1)
        break;
      default:
        break;
    }
  }
  const keyHandlerRef = useRef(keyHandler);

  return (
    <div className="search-input">
      <input onChange={inputHandler} type="text" />
      {suggests.length > 0 ? 
        <div className="autocomplete_wrapper">
        {suggests.map((item, index) => {
          return <AutocompleteItem
            isActive={focusedElement === index ? true : false}
            key={item.id}
            id={item.id}
            string={item.string}
            start={item.start}
            end={item.end}
          />
        })}
      </div> : ''}
    </div>
  );
}

export default SearchInput;