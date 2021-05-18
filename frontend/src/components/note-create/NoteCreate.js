import './note-create.css';

import NoteForm from '../note-form/NoteForm';


export default () => {
  return (
    <NoteForm 
      title={'Create note'}
      formMode="create"
    />
  )
}