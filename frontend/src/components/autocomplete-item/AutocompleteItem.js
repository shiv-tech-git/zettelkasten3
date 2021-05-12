import './autocomplete-item.css';

const AutocompleteItem = ({id, string, start, end, isActive}) => {
  return (
    <div className={`ac_item ${isActive ? 'active' : ''}`}>
      <p>
        {start !== 0 ? string.slice(0, start) : ''}
        <strong>{string.slice(start, end)}</strong>
        {end < string.length ? string.slice(end, string.length) : ''}
      </p>
    </div>
  );
}

export default AutocompleteItem;