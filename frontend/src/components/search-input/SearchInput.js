import "./search-input.css";

import { useEffect, useState, useCallback, useMemo } from "react";

import AutocompleteItem from "../autocomplete-item/AutocompleteItem";

const SearchInput = ({ autocomplete_list, selectCallback }) => {
  const [focusedElement, setFocusedElement] = useState(-1);
  const [value, setValue] = useState("");

  const inputHandler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const suggests = useMemo(() => {
    let newSuggests = [];

    if (!value) return newSuggests;

    autocomplete_list.forEach((item) => {
      const start_pos = item.name.toLowerCase().indexOf(value.toLowerCase());
      if (start_pos > -1) {
        newSuggests.push({
          id: item.id,
          string: item.name,
          start: start_pos,
          end: start_pos + value.length,
        });
      }
    });
    if (newSuggests.length === 1) {
      setFocusedElement(0);
    }
    return newSuggests;
  }, [value]);

  const addSelectedElement = () => {
    selectCallback({
      id: suggests[focusedElement].id,
      label: suggests[focusedElement].string
    });
    setFocusedElement(-1);
    setValue('');
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
        addSelectedElement();
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
      <input onChange={inputHandler} type="text" value={value} />
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