import './create-note.css'

export default () => {
  return (
    <div className="create_note">
      <div className="title">
        New note
      </div>
      <form className="create_note_form">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
        
        <label htmlFor="tags">Tags</label>
        <input type="text" id="tags" name="tags" />
        
        <label htmlFor="body">Body</label>
        <textarea name="body" rows="10" cols="30"></textarea>

        <label htmlFor="links">Links</label>
        <input type="text" id="links" name="links" />

        <button type="submit" type="submit">Create</button>
      </form>
    </div>
  )
}