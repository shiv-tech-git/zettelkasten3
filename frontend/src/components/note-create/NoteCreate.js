import './note-create.css';

import NoteForm from '../note-form/NoteForm';

import { postNote } from '../../utils/request';

const NoteCreate = ({ location, history }) => {
  

  const submitCallback = async (note) => {
    const request_body = { ...note }
    const { _id } = await postNote(request_body);
    history.push(`/note/view/${_id}`);
  }

  const note = {};
  const initLink = location?.initLink;
  if (initLink) {
    note.links = [{...initLink}]
  }

  return (
    <NoteForm
      formMode="create"
      history={history}
      submitCallback={submitCallback}
      note={note}
    />
  )
}

export default NoteCreate;