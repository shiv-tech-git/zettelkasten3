import './search.css'

const Search = () => {
  return (
    <div className="search-wrapper">
      <form className="search-form">
        <input type="text" name="search-input" id="search-input"/>
        <button type='submit' id='search-button'>Search</button>
      </form>
    </div>
  )
}

export default Search;