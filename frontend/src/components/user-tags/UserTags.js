import './user-tags.css';

import { useEffect, useState } from 'react';
import { getUser } from '../../utils/request';
import { useSelector } from 'react-redux';
import LinkItem from '../../components/link-item/LinkItem';

const UserTags = ({ match }) => {
  const uid = match.params.uid;
  const [tags, setTags] = useState(null);
  const [username, setUsername] = useState('');
  const myId = useSelector(state => state.auth.userData.userId);

  useEffect( async () => {
    const responce = await getUser(uid);
    setTags(responce.tags);
    setUsername(responce.username);
  }, [])

  if (!tags) return '';

  let title = '';
  if (myId === uid) {
    title = "My tags"
  }
  else {
    title = `${username}'s tags`
  }
  return (
    <div className="user_tags_wrapper">
      <h2>{title}</h2>
      {tags.map( tag => <LinkItem 
        link={`/notes/user/${uid}/tag/${tag._id}`}
        name={tag.name}
      />
      )}
    </div>
  )
}

export default UserTags;