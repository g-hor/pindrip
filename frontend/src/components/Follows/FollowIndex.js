import { Modal } from "../../context/modal";
import FollowIndexItem from "./FollowIndexItem";


const FollowIndex = ({ displayUsernames, count, title, onClose }) => {

  return (
    <Modal onClose={onClose} >
      <div id="follows-container">
        <h3>{count} {` ${title}`}</h3>

        <div id="follows-index">
          {displayUsernames.map((username, idx) => (
            <FollowIndexItem username={username} onClose={onClose} key={idx} />
          ))}
        </div>
      </div>
    </Modal>
  )
};

export default FollowIndex;