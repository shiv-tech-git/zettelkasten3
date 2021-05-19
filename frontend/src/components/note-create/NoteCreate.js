import './note-create.css';

import NoteForm from '../note-form/NoteForm';

import { postNote } from '../../utils/request';

const NoteCreate = ({ history }) => {

  const submitCallback = async (note) => {
    const request_body = { ...note }
    const { _id } = await postNote(request_body);
    history.push(`/note/view/${_id}`);
  }

  return (
    <NoteForm
      formMode="create"
      history={history}
      submitCallback={submitCallback}
    />
  )
}

export default NoteCreate;