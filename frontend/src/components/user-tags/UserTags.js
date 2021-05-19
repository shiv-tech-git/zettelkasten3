import './user-tags.css';

const UserTags = ({ match }) => {
  return (
    <h2>tag view {match.params.uid}</h2>
  )
}

export default UserTags;