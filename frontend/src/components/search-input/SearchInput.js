import './search-input.css';

import { useEffect, useState, useRef } from 'react';

import AutocompleteItem from '../autocomplete-item/AutocompleteItem';

const SearchInput = ({autocomplete_list}) => {

  const [suggests, setSuggests] = useState([]);
  const [focusedElement, setFocusedElement] = useState(-1);

  const suggestsLength = useRef(0)

  const inputHandler = (e) => {
    setFocusedElement(-1);

    const input_value = e.target.value;

    if (input_value == ''){
      document.removeEventListener('keydown', keyHandler)
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
      document.addEventListener('keydown', keyHandler)
    }
    suggestsLength.current = new_suggests.length;
    setSuggests(new_suggests);
  }

  const getLength = () => suggests.length

  const keyHandler = (e) => {
    console.log('length: ', suggestsLength.current)
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