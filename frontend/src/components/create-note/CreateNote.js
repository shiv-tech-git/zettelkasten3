import './create-note.css';

import NoteForm from '../note-form/NoteForm';


export default () => {
  return (
    <NoteForm 
      title={'Create note'}
      button_label={'Create'}
    />
  )
}