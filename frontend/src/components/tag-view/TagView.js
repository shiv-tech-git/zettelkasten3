import './tag-view.css';

const TagView = ({ match }) => {
  return (
    <h2>tag view {match.params.id}</h2>
  )
}

export default TagView;