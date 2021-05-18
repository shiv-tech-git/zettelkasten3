import "./search-input.css";

import { useEffect, useState, useCallback, useMemo } from "react";

import AutocompleteItem from "../autocomplete-item/AutocompleteItem";

const SearchInput = ({ autocomplete_list, selectCallback, addNew = false }) => {
  const [focusedElement, setFocusedElement] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [newElement, setNewElement] = useState('');

  const inputHandler = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const suggests = useMemo(() => {
    let newSuggests = [];
    
    if (!inputValue) {
      setFocusedElement(-1);
      return newSuggests;
    } 

    autocomplete_list.forEach((item) => {
      const start_pos = item.name.toLowerCase().indexOf(inputValue.toLowerCase());
      if (start_pos > -1) {
        newSuggests.push({
          id: item.id,
          string: item.name,
          start: start_pos,
          end: start_pos + inputValue.length,
        });
      }
    });
    //Only one iteam is left, then focus on it
    if (newSuggests.length === 1) {
      setFocusedElement(0);
    }
    //If we can add a new autocomplete element - just do it
    if (addNew && newSuggests.length === 0) {
      setFocusedElement(0);
      newSuggests = [{
        id: 'new',
        string: inputValue,
      }]
    }
    return newSuggests;
  }, [inputValue]);

  const addSelectedElement = () => {
    selectCallback({
      id: suggests[focusedElement].id,
      label: suggests[focusedElement].string
    });
    setFocusedElement(-1);
    setInputValue('');
  }

  const keyHandler = (e) => {
    if (suggests.length === 0) return;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setFocusedElement((focusedElement) => focusedElement - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedElement((focusedElement) => focusedElement + 1);
        break;
      case "Enter":
        e.preventDefault();
        if (focusedElement >= 0) {
          addSelectedElement();
        }
        break;
      case "Tab":
        e.preventDefault();
        if (suggests.length === 1) {
          addSelectedElement();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (suggests.length > 0) {
      
      window.addEventListener("keydown", keyHandler);
  
      return () => {
        window.removeEventListener("keydown", keyHandler);
      };
    }
  }, [suggests, focusedElement]);

  return (
    <div className="search-input">
      <input onChange={inputHandler} type="text" value={inputValue} />
      {suggests.length > 0 && (
        <div className="autocomplete_wrapper">
          {suggests.map((item, index) => {
            return (
              <AutocompleteItem
                isActive={focusedElement === index}
                key={item.id}
                {...item}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;