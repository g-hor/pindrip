import { Link } from 'react-router-dom';

import { getInitial, getUserById } from '@store/user';
import { getCurrentUser } from '@store/session';
import { useAppSelector } from '@store/hooks';

import Avatar from '../Avatar/Avatar';
import FollowButton from './FollowButton';

type Props = {
	userId: number;
	onClose: () => void;
};

const FollowIndexItem = ({ userId, onClose }: Props) => {
	const currentUser = useAppSelector(getCurrentUser);
	const showUser = useAppSelector(getUserById(userId));

	const avatar = showUser?.avatar;
	const isSelf = userId === currentUser?.id;

	return (
		<div className="follow-index-item">
			<div className="follow-index-item-user">
				<Link to={`/${showUser?.username}`} onClick={onClose}>
					{avatar ? (
						<Avatar avatarUrl={avatar} />
					) : (
						<div className="follow-index-initial-holder">
							<div className="follow-index-initial">{getInitial(showUser)}</div>
						</div>
					)}
				</Link>

				<Link to={`/${showUser?.username}`} onClick={onClose}>
					{showUser?.username}
				</Link>
			</div>

			{isSelf ? <div></div> : <FollowButton currentUser={currentUser} showUser={showUser} />}
		</div>
	);
};

export default FollowIndexItem;
